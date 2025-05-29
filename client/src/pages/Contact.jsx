import { useState } from "react";

export const Contact =()=>{

    const[contact , setContact] =useState({
        username:"",
        email:"",
        message:""
    });
    const handleInput =(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setContact({
            ...contact,
            [name]:value,
        })
        // setContact((prev)=> ({
        //     ...prev,
        //     [name]:value,
        // }))

    }

    const handleSubmit=(e)=>{
        e.preventDefault();


        console.log(contact);
    }
    return ( 
        <>
            <section className="section-contact">
                <h1 className="main-heading">Contact us</h1>
                <div className="container contact-content ">
                    
                    <div>
                        <div className="container grid grid-two-cols">
                            <div className="contact-img">
                                <img src="" alt="" srcset="" width={500} height={500} />
                            </div>
                            <section className="section-form">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username" id="username" required autoComplete="off" value={contact.username} onChange={handleInput}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email" id="email" required autoComplete="off" value={contact.email} onChange={handleInput}/>
                                    </div>
                                    <div>
                                        <label htmlFor="message">message</label>
                                        <textarea name="message" id="message" autoComplete="off" value={contact.message} onChange={handleInput}></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </form>
                            </section>
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
 }