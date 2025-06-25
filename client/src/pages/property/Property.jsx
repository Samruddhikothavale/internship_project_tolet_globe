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
        console.log("error")
        console.log("Fetch failed:", err);
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
          <option value="max-min">High-Low</option><div class="flex rounded-md border-2 border-blue-500 overflow-hidden max-w-md mx-auto">
            <input type="email" placeholder="Search Something..."
              class="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3" />
            <button type='button' class="flex items-center justify-center bg-[#007bff] px-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-white">
                <path
                  d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                </path>
              </svg>
            </button>
          </div>
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
