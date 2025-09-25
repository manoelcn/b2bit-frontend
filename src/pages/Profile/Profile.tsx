import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getTokens, removeTokens } from "../../services/api";
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


interface UserProfile {
    id: string;
    avatar: {
        id: number;
        high: string;
        medium: string;
        low: string;
    };
    name: string;
    last_name: string;
    email: string;
    role: {
        value: number;
        label: string;
    };
    last_login: string;
    staff_role: {
        value: number;
        label: string;
    };
};

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const tokens = getTokens();

                if (!tokens.access) {
                    navigate("/login");
                    return;
                }

                const profileData = await getProfile(tokens.access);
                setProfile(profileData);
            } catch (error: any) {
                setError("Error loading profile");
                console.error("Profile error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        removeTokens();
        navigate("/login");
    };

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Profile not found.</div>;
    }

    return (
        <div className="w-full max-w-sm">

            <header className="flex justify-end items-center w-full max-w-sm mb-6">
                <Button
                    variant="azul-b2bit"
                    size="lg"
                    onClick={handleLogout}
                    className="w-full sm:w-auto"
                >
                    Logout
                </Button>
            </header>
            <div>
                <Card className="w-full max-w-sm">
                    <CardHeader className="flex flex-col items-center justify-center">
                        <p className="text-center text-sm">Profile picture</p>
                        {profile.avatar && (
                            <img src={profile.avatar.medium} alt="Avatar" className="w-16 h-16 rounded-lg object-cover" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input id="name" type="text" value={profile.name} className="font-light" readOnly />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Your E-mail</Label>
                                <Input id="email" type="email" value={profile.email} className="font-light" readOnly />
                            </div>
                        </div>

                        {error && (<div className="mt-4 rounded-md bg-red-50 p-3 border border-red-200">
                            <div className="flex items-center gap-2">
                                <AlertCircleIcon className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium text-red-800">{error}</span>
                            </div>
                        </div>)}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;