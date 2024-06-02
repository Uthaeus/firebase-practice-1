import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { updatePassword, updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { updateDoc, doc } from "firebase/firestore";

import { auth, storage, db } from "../../firebase";

import { UserContext } from "../../store/user-context";

import image from "../../assets/images/guest-icon-add.png";

import Button from "../ui/button";

export default function EditProfile() {

    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

    const { user, updateUserContext } = useContext(UserContext);

    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.avatar) {
            setSelectedImage({url: user.avatar});
        }
        reset(user);
    }, [user , reset]);

    const handleImageChange = (event) => {
        // create url object
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSelectedImage({ file, url });
    }

    const openImageSelector = () => {
        document.getElementById("image").click();
    }

    const resetImage = () => {
        setSelectedImage(null);
    }

    const onSubmit = async (data) => {

        try {
            if (data.password !== '') {
                if (data.password.length < 6) {
                    setError("password", {
                        type: "validate",
                        message: "Password must be at least 6 characters"
                    });
                    reset({password: ''});
                    return;
                } else {
                    await updatePassword(auth.currentUser, data.password);
                }
            }
            console.log('after password update');

            let downloadUrl = null;

            if (selectedImage !== null && selectedImage.url !== user.avatar) {
                const imageRef = ref(storage, `images/${user.id}`);
                const imageSnapshot = await uploadBytes(imageRef, selectedImage.file);
                downloadUrl = await getDownloadURL(imageSnapshot.ref);
            }

            const updatedUser = {
                username: data.username,
                email: data.email,
                avatar: downloadUrl || user.avatar
            }

            await updateDoc(doc(db, "users", user.id), updatedUser);

            await updateProfile(auth.currentUser, { displayName: data.username, email: data.email });

            console.log('after profile update');

            updateUserContext(updatedUser);

        } catch (error) {
            console.log('edit profile error: ', error);
        } finally {
            navigate("/");
        }
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Edit Profile</h1>

            <div className="auth-avatar-container">
                <div className="auth-image-select-container" onClick={openImageSelector}>

                    <img src={selectedImage ? selectedImage.url : image} className="auth-image-select-image" alt="avatar" />

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
                    placeholder="leave blank to keep the same"
                    {...register("password")}
                />
                {errors.password && <span>This field is required</span>}

                <Button text="Update Profile" />
            </form>
            
            <div className="auth-actions">
                <Button text="Back to Reviews" onClick={() => navigate('/reviews')} style='button-secondary' />
                <Button text="Back to Home" onClick={() => navigate('/')} />
            </div>
        </div>
    );
}