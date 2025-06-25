import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import GoogleMapComp from "../components/GoogleMapComp";

export const AddProperty = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [images, setImages] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        propertyTitle: "",
        description: "",
        bhk: "",
        furnishing: "",
        price: "",
        area: "",
        preferance: "",
        gender: "",
        floor: "",
        washroom: "",
        type: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        landmark: "",
        nearby: "",
        latitude: "",
        longitude: "",
    });
    const stored = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {

        if (!stored || (stored.role !== "user" && stored.userType !== "owner")) {
            alert("Access denied — only owners can access this page");
            return navigate("/dashboard");
        }
        setFormData(prev => ({ ...prev, author: stored.username }));
    }, [navigate]);
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);
    const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData();

 
  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value);
  });

  images.forEach((file) => {
    form.append("images", file);
  });

  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_API}/property/addproperty`, {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      alert("Property submitted successfully!");
      navigate("/addproperty");
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyTitle: "",
        description: "",
        bhk: "",
        furnishing: "",
        price: "",
        area: "",
        preferance: "",
        gender: "",
        floor: "",
        washroom: "",
        type: "",
        address: "",
        city: "",
        pincode: "",
        state: "",
        landmark: "",
        nearby: "",
        latitude: "",
        longitude: "",
    });
    } else {
      throw new Error(`Server replied ${res.status}`);
    }
  } catch (err) {
    console.log(err);
    alert("Error: property not submitted.");
  }
};


    return (
        <div className="min-h-screen bg-black text-white px-6 py-10 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center">Add New Property</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {step === 1 && (
                    <>
                        <h3 className="text-lg font-medium">Contact Information</h3>
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />

                        <button type="button" onClick={handleNext} className="bg-green-700 px-4 py-2 rounded hover:bg-green-600">
                            Next →
                        </button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h3 className="text-lg font-medium">Property Details</h3>
                        <input type="text" name="propertyTitle" placeholder="Property Title" value={formData.propertyTitle} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" rows={3} required />

                        <select name="bhk" value={formData.bhk} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required>
                            <option value="">Select BHK</option>
                            <option value="1">1 BHK</option>
                            <option value="2">2 BHK</option>
                            <option value="3">3 BHK</option>
                            <option value="4">4 BHK</option>
                        </select>

                        <select name="furnishing" value={formData.furnishing} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
                            <option value="">Furnishing</option>
                            <option value="unfurnished">Unfurnished</option>
                            <option value="semi-furnished">Semi-furnished</option>
                            <option value="fully-furnished">Fully-furnished</option>
                        </select>

                        <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <input type="number" name="area" placeholder="Area (sq.ft.)" value={formData.area} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <select name="preferance" value={formData.preferance} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
                            <option value="">preferance Type</option>
                            <option value="family">family</option>
                            <option value="bachelor">bachelor</option>
                            <option value="both">both</option>
                        </select>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
                            <option value="">select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>

                        </select>
                        <input type="number" name="floor" placeholder="floor number" value={formData.floor} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <select name="washroom" value={formData.washroom} onChange={handleChange} className="w-full p-2 rounded bg-slate-800">
                            <option value="">select washroom type</option>
                            <option value="indian">Indian</option>
                            <option value="western">Western</option>
                            <option value="both">Both</option>
                        </select>

                        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 rounded bg-slate-800 " required>
                            <option value="">Property Type</option>
                            <option value="flat">Flat</option>
                            <option value="villa">Villa</option>
                            <option value="hostel">Hostel</option>
                            <option value="pg">PG</option>
                        </select>

                        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" required />
                        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />
                        <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />
                        <input type="text" name="landmark" placeholder="Nearby Landmark" value={formData.landmark} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />
                        <input type="text" name="nearby" placeholder="Nearby Facilities" value={formData.nearby} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />


                        <div className="my-4">
                            <GoogleMapComp />
                        </div>


                        <input type="text" name="latitude" placeholder="Latitude" value={formData.latitude} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />
                        <input type="text" name="longitude" placeholder="Longitude" value={formData.longitude} onChange={handleChange} className="w-full p-2 rounded bg-slate-800" />
                        <input
                            type="file"
                            name="images"
                            multiple
                            accept="image/*"
                            onChange={(e) => setImages([...e.target.files])}
                        />


                        <div className="flex justify-between mt-6">
                            <button type="button" onClick={handleBack} className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500">← Back</button>
                            <button type="submit" className="bg-green-700 px-4 py-2 rounded hover:bg-green-600">Submit</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};
