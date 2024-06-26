import { useNavigate } from "react-router";
import { useContext } from "react";

import { UserContext } from "../store/user-context";

import Button from "./ui/button";

export default function Header() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    return (
        <div className="home-header">
            <h1 className="home-title">Willie's Reviews</h1>
            <p className="home-description">Welcome! Check out what people have to say about stuff.</p>

            <div className="home-header-actions">
                <Button text="See what people have to say about stuff" onClick={() => navigate("/reviews")} style='button-edit' />
                {user && <Button text="Create New Review" onClick={() => navigate("/reviews/new")} />}
            </div>
        </div>
    );
}