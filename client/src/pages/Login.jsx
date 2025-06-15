import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import loginImg from '../assets/images.png';



export const Login = () => {
    const [user, setUser] = useState({

        email: "",
        password: ""
    });
    const location = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        if (params.get("verified") === "true") {
            alert("Email verified! Please log in.");
        }
    }, []);

    const navigate = useNavigate();

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if (response.ok) {
                setUser({
                    email: "",
                    password: "",
                })
                alert("Login Successful")
                localStorage.setItem("user", JSON.stringify(data));
                
                navigate("/dashboard");
            }   
            else {
                alert(data.msg || "Invalid credintials !");
            }
            console.log(response);
        } catch (error) {
            console.log("Login :", error)
        }
    }

    return <>
        <section>
            <div className="section-register">
                <div className="container grid grid-two-cols">
                    <div className="register-img">
                        <img src={loginImg} alt="" width={500} height={500} />

                    </div>
                    <div className="register-form">
                        <h1 >Login Form</h1><br />
                        <form onSubmit={handleSubmit}>

                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="Enter your email.." id="email" required value={user.email} onChange={handleInput} />
                            </div>

                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="Enter password" id="password" required value={user.password} onChange={handleInput} />
                            </div><br />
                            <button type="submit" className="btn btn-submit">Register Now</button>
                            <p>
                                Forgot password?{" "}
                                <Link to="/forgot-password">Reset here</Link>
                            </p>


                        </form>

                    </div>
                </div>
            </div>
        </section>
    </>
}