import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, Heart } from 'lucide-react';
export const ViweBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/blogs/${id}`);
                const data = await res.json();
                setBlog(data.blog);
                setLikes(data.blog.likes?.length || 0);
                setLoading(false);
                await fetch(`${import.meta.env.VITE_BASE_API}/auth/blogs/${id}/views`, {
                    method: "PUT",
                });
            } catch (err) {
                console.error("Failed to fetch blog:", err);
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);
    const handleLikeToggle = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_API}/auth/blogs/${id}/like`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ liked: !liked }), 
                }
            );
            const data = await res.json();
            setLikes(data.likes);
            setLiked(!liked);
        } catch (err) {
            console.error("Failed to toggle like:", err);
        }
    };

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    if (!blog) return <p className="text-center mt-10">Blog not found.</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
            <div className="flex items-center mb-4">
                <img
                    className="w-full h-500 mr-4 object-cover"
                    src={blog.image}
                    alt={blog.title}
                />
            </div>
            <div className="info flex flex-cols flow-root ">
                <div className="float-left">
                    <p className="text-sm text-gray-600">Author: {blog.author}</p>
                    <p className="text-sm text-gray-600">Role: {blog.role}</p>
                </div>
                <div className="float-right flex flex-row ">
                    <p className="text-sm text-gray-600 mx-4 px-3"><button onClick={handleLikeToggle} className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
                        <Heart size={20} />{blog.likes}
                    </button></p>
                    <p className="text-sm text-gray-600"><Eye size={20} />{blog.viwes}</p>
                </div>
            </div>

            <p className="text-gray-800 leading-relaxed">{blog.description}</p>
        </div>
    );
};
