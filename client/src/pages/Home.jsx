import { useState } from "react";

export const Home = () => {
  const [contact, setContact] = useState({
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
      <main className="bg-black py-10 px-5 sm:px-10 lg:px-20 text-white">
        <section className="section-analytics">
          <div className="container grid grid-two-cols">
            <div className="hero-content">
              <h1>Welcome to Dashboard</h1>
              <p>
                Lorem ipsum dolor sit amelabor jshf kajshf kajfhs ksjf kieuy ieeuy oeinzd,moeirjil lksafjh <br />lasfjk  lakflksjfjlkjsfje commodi. Rerum.
              </p>
              <div className="btn-group">
                <a href="/blogs">
                  <button className="btn">Blogs</button>
                </a>
              </div>
            </div>

            <div className="hero-image">
              <img src="" alt="hero" width="500" height="500" />
            </div>
          </div>
        </section>

      </main>
      <section className="section-analytics bg-black py-10 px-5 sm:px-10 lg:px-20 text-white">
        <div className="container grid grid-two-cols">
          <div className="hero-image">
            <img src="" alt="hero" width="500" height="500" />
          </div>
          <div className="hero-content">
            <h1>Get Started</h1>
            <p>
              Lorem ipsum dolor sit amelabor jshf kajshf kajfhs ksjf kieuy ieeuy oeinzd,moeirjil lksafjh <br />lasfjk  lakflksjfjlkjsfje commodi. Rerum.
            </p>
            <div className="btn-group">
              <a href="/register">
                <button className="btn">Register Now</button>
              </a>
            </div>
          </div>


        </div>
        <section className="map-contact-section">
  <div className="relative h-screen w-full">
<iframe
      className="absolute w-full h-full z-0"
      src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3559.792046106751!2d80.97721222543717!3d26.846565776686642!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sto%20let%20globe%20location!5e0!3m2!1sen!2sin!4v1748257905869!5m2!1sen!2sin"
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    <a
    href="https://maps.app.goo.gl/9Woexad4aTGYC8RX6"
    target="_blank"
    rel="noopener noreferrer"
    className="absolute inset-0 z-20"
    title="Open in Google Maps"
  ></a>
    

    <div className="relative z-10 container-contact">
      <section className="home-form">
        <form onSubmit={handleSubmit}>
                <h2>Get in touch !</h2>

          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required
              autoComplete="off"
              value={contact.username}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              autoComplete="off"
              value={contact.email}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter your phone"
              required
              value={contact.phone}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Message"
              autoComplete="off"
              value={contact.message}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-submit">
            Submit
          </button>
        </form>
      </section>
    </div>
  </div>
</section>

              
        

      </section>



    </>
  );
};
