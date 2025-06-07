// pages/VerifyEmail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/verify-email/${token}`);
      const data = await res.json();
      alert(data.message);
      if (res.ok) navigate("/login");
    };
    verify();
  }, [token]);

  return <p>Verifying your account...</p>;
};


