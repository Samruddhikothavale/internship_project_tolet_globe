import { useState } from "react";
import { SearchBlog } from "./SearchBlog"
import "./blogs.css";


export const Blogs =()=>{
    const [search , setSearch] = useState('');
    const [catergory , setcatergory] = useState('');

    const [query , setquery] = useState({search:"" ,catergory:""});


    const handleSearchchange = (e) =>{
        setSearch(e.target.value);
    }

    const handleSearch = () =>{

    }
    return (
        <>
        <div className="mt-16 container mx-auto">
            <SearchBlog/>
        </div>
        
        </>
    )
 }