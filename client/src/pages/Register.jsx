import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerImg from '../assets/images (1).png';

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    userType: "", // Only applicable if role === "user"
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extra validation for userType if role is "user"
    if (user.role === "user" && !user.userType) {
      alert("Please select a user type (Buyer, Tenant, or Owner)");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_API}/auth/register`, {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify(user)
      });

      const data = await response.json();

      if (response.status === 400 && data.msg === "Email already exists") {
        alert("This email is already registered. Please use another.");
      } else if (response.ok) {
        alert("Registered successfully...Please verify your email to login!");
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
          role: "",
          userType: "",
        });
        setLoading(false);
        navigate("/login");
      } else {
        alert(data.msg || "Registration failed.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Register:", error);
      alert("Something went wrong. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="section-register">
        <div className="container grid grid-two-cols">
          <div className="register-img">
            <img src={registerImg} width="500" height="500" />
          </div>

          <div className="register-form">
            <h1>Register Form</h1><br />
            {loading && (
              <p style={{ color: "white", fontWeight: "bold" }}>
                Registering...Please verify your email.
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" required placeholder="Enter your name.." value={user.username} onChange={handleInput} />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required placeholder="Enter your email.." value={user.email} onChange={handleInput} />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" required placeholder="Enter your phone" value={user.phone} onChange={handleInput} />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required placeholder="Enter password" value={user.password} onChange={handleInput} />
              </div>

              {/* Role Selector */}
              <div>
                <label htmlFor="role">Role</label>
                <select name="role" required value={user.role} onChange={handleInput}>
                  <option value="" disabled>Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="content creator">Content Creator</option>
                  <option value="user">User (Buyer, Tenant, Owner)</option>
                </select>
              </div>

              {/* User Type Selector */}
              {user.role === "user" && (
                <div>
                  <label htmlFor="userType">User Type</label>
                  <select name="userType" required value={user.userType} onChange={handleInput}>
                    <option value="" disabled>Select User Type</option>
                    <option value="buyer">Buyer</option>
                    <option value="tenant">Tenant</option>
                    <option value="owner">Owner</option>
                  </select>
                </div>
              )}

              <br />
              <button type="submit" className="btn btn-submit">Register Now</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
