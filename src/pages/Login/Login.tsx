import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, saveTokens } from "../../services/api";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { AlertCircleIcon } from "lucide-react"

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
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>

                <Card className="w-full max-w-sm">
                    <CardHeader className="flex justify-center">
                        <img src="/src/assets/b2bit.png" alt="b2bit" />
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        placeholder="@gmail.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">

                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} placeholder="***************" required />
                                </div>
                            </div>
                        </form>

                        {error && (<div className="mt-4 rounded-md bg-red-50 p-3 border border-red-200">
                            <div className="flex items-center gap-2">
                                <AlertCircleIcon className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium text-red-800">{error}</span>
                            </div>
                        </div>)}

                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button variant="azul-b2bit" size="lg" type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                    </CardFooter>
                </Card>


            </form>
        </div>
    )
};

export default Login;