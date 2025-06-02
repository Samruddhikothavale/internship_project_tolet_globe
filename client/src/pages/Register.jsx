import { useState } from "react"
import { useNavigate } from "react-router-dom";
import registerImg from '../assets/images (1).png';

export const Register = () => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });
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
        console.log(user);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API}/auth/register`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if (response.ok) {
                alert("registeration sucssesful !")
                navigate("/login");
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                })
            } else if (response.status === 400 && data.msg === "Email already exists") {
                alert("This email is already registered. Please use another.");
            } else {
                alert(data.msg || "Registration failed.");
            }
            //console.log(response);
        } catch (error) {
            console.log("Register :", error)
            alert("Something went wrong. Please try again later.");
            
        }

    }



    return <>
        <section>
            <div className="section-register">
                <div className="container grid grid-two-cols">
                    <div className="register-img">
                        <img src={registerImg} width="500" height="500" />
                    </div>
                    <div className="register-form">
                        <h1>Register Form</h1><br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username" placeholder="Enter your name.." id="username" required value={user.username} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="Enter your email.." id="email" required value={user.email} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="text" name="phone" placeholder="Enter your phone" id="phone" required value={user.phone} onChange={handleInput} />
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="text" name="password" placeholder="Enter password" id="password" required value={user.password} onChange={handleInput} />
                            </div><br />
                            <button type="submit" className="btn btn-submit">Register Now</button>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    </>
}