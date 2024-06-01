import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

import { UserContext } from "../../store/user-context";

import Button from "../ui/button";

import image from "../../assets/images/guest-icon-add.png";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const { updateUser } = useContext(UserContext);

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

        try {
            // get user id

            const tempId = Math.floor(Math.random() * 1000).toString();

            const newUser = {
                id: tempId,
                username: data.username,
                email: data.email,
                avatar: selectedImage
            }
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