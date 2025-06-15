import { Link } from "react-router-dom"


export const Categories =()=>{

    const cat = [
        {
            name: "Latest",
            to: "/cat/latest",
        },
        {
            name: "Trending",
            to: "/cat/trending",
        }
    ]
    return (
        <>
       
        <div className="flex items-center justify-start"></div>
        {cat.map((items,i) => (
            <Link className="me-4 px-4 py-2 text-2xl" key={i} to={items.to}>
                {items.name}
                
            </Link>
        ))}
        </>
    )
 }