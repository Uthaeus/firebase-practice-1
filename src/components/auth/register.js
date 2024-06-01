import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

import { db } from "../../firebase";

import { storage } from "../../firebase";

import { auth } from "../../firebase";

import Button from "../ui/button";
import image from "../../assets/images/guest-icon-add.png";

export default function Register() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const navigate = useNavigate();

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        // create url object
        const url = URL.createObjectURL(event.target.files[0]);
        setSelectedImage(url);
    }

    const openImageSelector = () => {
        document.getElementById("image").click();
    }

    const resetImage = () => {
        setSelectedImage(null);
    }

    const onSubmit = async (data) => {
        console.log('registering new user', data);

        if (data.password !== data.confirmPassword) {
            setError("confirmPassword", {
                type: "validate",
                message: "Passwords do not match"
            });

            return;
        } else if (data.password.length < 6) {
            setError("confirmPassword", {
                type: "validate",
                message: "Password must be at least 6 characters"
            });
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = userCredential.user;

            let downloadUrl = null;

            if (selectedImage !== null) {
                const imageRef = ref(storage, `images/${user.uid}`);
                const imageSnapshot = await uploadBytes(imageRef, selectedImage);
                downloadUrl = await getDownloadURL(imageSnapshot.ref);
            }

            const docRef = doc(db, "users", user.uid);
            const userData = {
                username: data.username,
                email: data.email,
                role: "user",
                avatar: downloadUrl
            }

            setDoc(docRef, userData).then(() => {
                console.log('user created');
            })
            .catch((error) => {
                console.log("Error adding document: ", error);
            });


            

        } catch (error) {
            console.log('register error: ', error);
        } finally {
            navigate("/");
        }
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Register</h1>

            <div className="auth-avatar-container">
                <div className="auth-image-select-container" onClick={openImageSelector}>
                    <img src={selectedImage ? selectedImage : image} className="auth-image-select-image" alt="avatar" />

                    <p className="auth-image-select-text">Select Profile Image</p>
                    
                    <input 
                        type="file"
                        id="image"
                        name="image"
                        className="auth-image-select"
                        accept="image/png, image/jpeg"
                        onChange={handleImageChange}
                    />
                </div>

                <p className="auth-avatar-reset-link" onClick={resetImage}>Reset Image</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">

                <input
                    className="auth-input"
                    type="text"
                    placeholder="Username"
                    autoFocus={true}
                    {...register("username", { required: true })}
                />
                {errors.username && <span>This field is required</span>}

                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}

                <input
                    className="auth-input"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && <span>This field is required</span>}

                <Button text="Register" />

                <p className="auth-text">Already have an account? <Link to="/login" className="auth-link">Login</Link></p>
            </form>
        </div>
    );
}