import { useState } from "react";
import contactImg from '../assets/contact-us-4193637_640.jpg';
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdContactPhone } from "react-icons/md";


export const Contact = () => {

    const [contact, setContact] = useState({
        subject: "",
        username: "",
        email: "",
        phone: "",
        message: ""
    });
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        })
        // setContact((prev)=> ({
        //     ...prev,
        //     [name]:value,
        // }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_API}/form/contact`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(contact)
            })
            const data = await response.json();
            if (response.ok) {
                alert("Message sent sucssesfully !")
                setContact({
                    subject: "",
                    username: "",
                    email: "",
                    phone: "",
                    message: ""
                })
            } else {
                alert(data.msg || "Message not sent !");
            }
            console.log(response);
        } catch (error) {
            console.log("contact :", error)
            alert("Something went wrong. Please try again later.");

        }
    }
    return (
        <>
            <section className="section-contact bg-black py-10 px-5 sm:px-10 lg:px-20 text-white">
                <h1 className="main-heading">Contact us</h1>
                <div className="container contact-content ">

               
                        <div className="container grid grid-two-cols">
                            <div className="contact-img">
                                <img src={contactImg} alt="" srcset="" width={500} height={300} />
                                <div className="container grid grid-two-cols">
                                    <div className="card">
                                        <div className="icon">
                                            <IoChatbubbleEllipsesOutline />
                                        </div>
                                        <div className="text">
                                            <strong>Chat with us !!</strong><br />
                                            hello@toletglobe.in
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="icon">
                                            <MdContactPhone />
                                        </div>
                                        <div className="text">
                                            <strong>Call us...</strong><br />
                                            +91-58742368
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div>
                                <section className="section-form">
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="subject">subject</label>
                                        <input type="text" name="subject" id="subject" required autoComplete="off" value={contact.subject} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="username">username</label>
                                        <input type="text" name="username" id="username" required autoComplete="off" value={contact.username} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">email</label>
                                        <input type="email" name="email" id="email" required autoComplete="off" value={contact.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">phone</label>
                                        <input type="text" name="phone" placeholder="Enter your phone" id="phone" required value={contact.phone} onChange={handleInput} />
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