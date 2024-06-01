import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router";

import { UserContext } from "../../store/user-context";

import image from "../../assets/images/guest-icon-add.png";

import Button from "../ui/button";

export default function EditProfile() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const { user, updateUser } = useContext(UserContext);

    const [selectedImage, setSelectedImage] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.avatar) {
            setSelectedImage(user.avatar);
        }
        reset(user);
    }, [user]);

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
        console.log(data);

        try {
            const updatedUser = {
                ...user,
                ...data,
                avatar: selectedImage
            }

            updateUser(updatedUser);
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
                    <div className="auth-image-select-image" style={{ background: selectedImage ? `url(${selectedImage})` : `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", borderRadius: "50%"}} />

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
                    {...register("password")}
                />

                <Button text="Register" />
            </form>
            
            <div className="auth-actions">
                <Button text="Back to Reviews" onClick={() => navigate('/reviews')} style='button-secondary mx-2' />
                <Button text="Back to Home" onClick={() => navigate('/')} />
            </div>
        </div>
    );
}