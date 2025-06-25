import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddBlog = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    role: "",
    image: "",
  });

      const stored = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {

    if (!stored || stored.role !== "content creator") {
      alert("Access denied — only Content Creators can add blogs.");
      return navigate("/dashboard");
    }
    setFormData(prev => ({ ...prev, author: stored.username }));
  }, [navigate]);


  const handleChange = e => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      setFormData(prev => ({ ...prev, image: files[0] })); 
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };


  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("author", formData.author);
    data.append("role", formData.role);
    data.append("image", formData.image);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/auth/addblog`,
        {
          method: "POST",
          body: data,
        }
      );
  
      if (res.ok) {
        setFormData({
          title: "",
          description: "",
          author: stored.username,
          role: "",
          image: "",
        })
        alert("Blog submitted successfully!");
        navigate("/addblog");

      } else {
        throw new Error(`Server replied ${res.status}`);
      }
    } catch (err) {
      console.log(err);
      alert("Error: Blog not submitted.");
    }
  };


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <textarea
          name="description"
          placeholder="Blog Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="author"            
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          readOnly                         
          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}

          className="w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2"
        />

        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
};
