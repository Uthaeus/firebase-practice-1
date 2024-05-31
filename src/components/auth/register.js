import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";

import Button from "../ui/button";

import image from "../../assets/images/guest-icon-add.png";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (event) => {
        // create url object
        const url = URL.createObjectURL(event.target.files[0]);
        setSelectedImage(url);
    }

    const openImageSelector = () => {
        document.getElementById("image").click();
    }

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Register</h1>

            <div className="auth-image-select-container" style={{ background: selectedImage ? `url(${selectedImage})` : `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", width: "200px", height: "250px", borderRadius: "50%"}} onClick={openImageSelector}>
                <input 
                    type="file"
                    id="image"
                    name="image"
                    className="auth-image-select"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                />
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