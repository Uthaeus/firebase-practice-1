import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "../ui/button";

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
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