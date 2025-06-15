import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

 export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        const data = await res.json();
        alert(data.msg);
        if (res.ok) navigate("/login");
    };

    return (
        <form onSubmit={handleSubmit} className="bg-black py-10 px-5 sm:px-10 lg:px-20 text-white">
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
        </form>
    );
};


