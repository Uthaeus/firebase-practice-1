import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase";

import Button from "../ui/button";

export default function Login() {

    const { register, handleSubmit, formState: { errors }, setError } = useForm();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (data.password.length < 6) {
            setError("password", {
                type: "validate",
                message: "Password must be at least 6 characters"
            });

            return;
        }

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("email", {
                    type: "validate",
                    message: "User not found"
                });
            } else if (error.code === "auth/wrong-password") {
                setError("password", {
                    type: "validate",
                    message: "Wrong password"
                });
            }
        } finally {
            navigate("/");
        }
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <input 
                    className="auth-input"
                    type="email"
                    placeholder="email"
                    autoFocus={true}
                    {...register("email", { required: true })}
                />
                {errors.email && <span>This field is required</span>}

                <input
                    className="auth-input"
                    type="password"
                    placeholder="password"
                    {...register("password", { required: true })}
                />
                {errors.password && <span>This field is required</span>}

                <Button text="Login" />

                <p className="auth-text">Don't have an account? <Link to="/register" className="auth-link">Register</Link></p>
            </form>
        </div>
    )
}