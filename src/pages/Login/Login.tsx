import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveTokens } from "../../services/api";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all the fields.");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await login(email, password);

            saveTokens(response.tokens);

            navigate("/profile");
        } catch (error: any) {
            if (error.email) {
                setError(error.email[0]);
            } else if (error.password) {
                setError(error.password[0]);
            } else if (error.detail) {
                setError("Invalid credentials.");
            } else {
                setError("Error logging in. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Sign In"}
                </button>
            </form>
        </div>
    )
};

export default Login;