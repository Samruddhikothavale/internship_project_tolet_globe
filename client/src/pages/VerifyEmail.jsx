import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/verify/${token}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Verification failed");
        }

        alert(data.message); 
        navigate("/login"); 
        
      } catch (err) {
        console.error("Verify error:", err.message);
        alert(err.message); 
      }
    };

    verify();
  }, [token]);

  return <p>Verifying your account...</p>;
};
