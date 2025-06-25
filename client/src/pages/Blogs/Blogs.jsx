import { useState } from "react";
import { BlogCard } from "./components/BlogCard";
import { Pagination } from "./../../components/Pagination";
import { useEffect } from "react";
const filterOptions = ["Latest", "Trending"];


export const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const [data, setdata] = useState([]);

  useEffect(()=>{
    const fetchBlogs  = async () => {
      const res = await fetch(`${import.meta.env.VITE_BASE_API}/auth/fetchAllBlogs`);
       const json = await res.json();          
      setdata(json.blogs || []);
    }
    fetchBlogs ();
  },[]);


  const [filter, setFilter] = useState("Latest");

  const filteredBlogs =
    filter === "Trending"
      ? data.filter(b => b.viwes > 2 || b.likes > 2)
      : data;

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIdx = (currentPage - 1) * blogsPerPage;
  const visibleBlogs = filteredBlogs.slice(startIdx, startIdx + blogsPerPage);
  
  return (
    <section className="bg-black py-10 px-5 sm:px-10 lg:px-20 text-white">
      <div className="flex gap-4 mb-6">
        {filterOptions.map(option => (
          <button
            key={option}
            onClick={() => {
              setFilter(option);
              setCurrentPage(1); // reset to page 1 on filter change
            }}
            className={`px-4 py-2 rounded ${
              filter === option ? "bg-teal-500 text-black" : "bg-gray-700"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleBlogs.map((blog, i) => (
          <BlogCard key={i} {...blog} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};
