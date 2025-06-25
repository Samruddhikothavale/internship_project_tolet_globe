import { useState } from "react";
import { Pagination } from "../../components/Pagination";
import { Filters } from "./components/Filters";
import { Propertycard } from "./components/Propertycard";
import { useEffect } from "react";



export const Property = () => {
  const [allProperties, setAllProperties] = useState([]);    
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const cardPerPage = 6;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API}/property/fetchProperty`);
        const json = await res.json();
        setAllProperties(json.property || []);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    })();
  }, []);
  useEffect(() => {
    setFilteredProperties(allProperties);
    setCurrentPage(1);
  }, [allProperties]);
  const [sort, setSort] = useState("");
  const handleSortChange = (e) => {
    setSort(e.target.value);
  };
  const sortProperties = [...filteredProperties];
  if (sort === "min-max") {
    sortProperties.sort((a, b) => a.price - b.price);
  } else if (sort === "max-min") {
    sortProperties.sort((a, b) => b.price - a.price);
  }

  const totalPages = Math.ceil(filteredProperties.length / cardPerPage);
  const startIdx = (currentPage - 1) * cardPerPage;
  const visibleProps = sortProperties.slice(startIdx, startIdx + cardPerPage);

  const openFilterModal = () => setShowFilter(true);
  const closeFilterModal = () => setShowFilter(false);

  const handleFilterSubmit = (result) => {
    setFilteredProperties(result);
    setCurrentPage(1);
    closeFilterModal();
  };

  return (
    <div className="bg-black min-h-screen py-10 px-5 sm:px-10 lg:px-20 text-white">
      <div className="mb-8 flex flex-wrap gap-4">
        <button><select name="sort" onChange={handleSortChange} className="w-full p-2 rounded bg-slate-800">
          <option value="">Sort by Rate</option>
          <option value="min-max">Low-High</option>
          <option value="max-min">High-Low</option>
        </select></button>
        <button
          className="rounded-md bg-slate-800 py-2 px-4 text-sm"
          onClick={() => setShowFilter(true)}
        >
          Apply filter
        </button>
      </div>

      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-20">
          <Filters onFilterSubmit={handleFilterSubmit} onClose={() => setShowFilter(false)} />
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProps.map((prop) => (
          <Propertycard key={prop._id} {...prop} />
        ))}
      </div>


      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
};
