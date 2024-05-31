import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import Button from "../ui/button";

export default function Register() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="auth-container">
            <h1 className="auth-title">Register</h1>

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