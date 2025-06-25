import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import homeImg from "../../assets/find-home-logo.jpg";


export const ViweProperty = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchproperty = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/property/${id}`);
        const data = await res.json();
        setProperty(data.property);
        setLoading(false);
        await fetch(`${import.meta.env.VITE_BASE_API}/property/${id}/views`, {
          method: "PUT",
        });
      } catch (error) {
        console.log(error);
        setLoading(false);

      }
    };
    fetchproperty();
  }, [id]);
  const images = property?.images?.length > 0 ? property.images : [homeImg];

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!property) return <p className="text-center mt-10">Property not found.</p>;

  return (
    <div className="bg-gray-100 rounded-lg p-6 mx-auto my-8 max-w-5xl shadow-md font-sans text-gray-800">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{property.propertyTitle}</h2>

        <div className="my-6">
          <div id="propertyCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner rounded-md overflow-hidden">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={img}
                    className="d-block w-full h-[300px] object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="prev"
                >
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#propertyCarousel"
                  data-bs-slide="next"
                >
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-4">
        <div className="stat">
          <div className="text-sm text-gray-500">Price</div>
          <div className="text-lg font-semibold text-blue-800">₹{property.price}</div>
        </div>
        <div className="stat">
          <div className="text-sm text-gray-500">BHK</div>
          <div className="text-lg font-semibold">{property.bhk}</div>
        </div>
        <div className="stat">
          <div className="text-sm text-gray-500">Area</div>
          <div className="text-lg font-semibold">{property.area} sq.ft.</div>
        </div>
      </div>

      <div className="text-sm sm:text-base flex align-center gap-20">
        <p className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-4 w-40"><strong>Furnishing:</strong><br /> {property.furnishing}</p>
        <p className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-4 w-40"><strong>Type:</strong><br /> {property.type}</p>
        <p className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-4 w-40"><strong>Preferred for:</strong><br /> {property.preferance}</p>

      </div>
      <div className="my-5 mx-2 bg-white p-4 rounded-lg border border-gray-300 shadow-sm mb-4">
        <p><strong>Description:</strong> {property.description}</p>
        <p><strong>Location:</strong> {property.address}, {property.city}</p>
        <p><strong>Contact:</strong> {property.name} ({property.phone})</p></div>
    </div>
  )

}

const styles = {
  card: {

    background: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    color: "#333",
  },
  image: {

    width: "500px",
    height: "300px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
};

