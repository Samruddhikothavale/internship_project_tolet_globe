import { useState } from "react"
import registerImg from '../assets/images (1).png';

export const Register =()=>{
    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });

    const handleInput=(e) =>{
        let name=e.target.name;
        let value=e.target.value;

        setUser({
            ... user,
            [name]:value
        })
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log(user);
        try {
        const response = await fetch(`${import.meta.env.VITE_BASE_API}/auth/register` ,{
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body:JSON.stringify(user)
        })
        if(response.ok){
            setUser({username:"",
        email:"",
        phone:"",
        password:""})
        }
        console.log(response);
        } catch (error) {
             console.log("Register :",error)
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
                                <input type="text"  name="username" placeholder="Enter your name.." id="username" required  value={user.username} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email"  name="email" placeholder="Enter your email.." id="email" required value={user.email} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="text"  name="phone" placeholder="Enter your phone" id="phone" required value={user.phone} onChange={handleInput}/>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="text"  name="password" placeholder="Enter password" id="password" required value={user.password} onChange={handleInput}/>
                            </div><br />
                            <button type="submit" className="btn btn-submit">Register Now</button>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    </>
 }