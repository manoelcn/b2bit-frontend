import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, getTokens, removeTokens } from "../../services/api";

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
        <div>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>Perfil do Usuário</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>

            <div>
                <h2>Informações Pessoais</h2>

                {profile.avatar && (
                    <img src={profile.avatar.medium} alt="Avatar" style={{ width: 100, height: 100, borderRadius: "50%" }} />
                )}

                <p><strong>Nome:</strong> {profile.name} {profile.last_name}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
        </div>
    );
};

export default Profile;