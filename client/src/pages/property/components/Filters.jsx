import { useState } from "react";

export const Filters = ({ onFilterSubmit, onClose }) => {
    const [filters, setFilters] = useState({
        types: [],      
        bhk: [],          
        furnishing: "",   
        allowedFor: "",    
    });

    const propertyTypes = ["Apartment", "Villa", "Flat", "Row House", "Studio", "Penthouse"];
    const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
    const furnishingLevels = ["Furnished", "Semi-Furnished", "Unfurnished"];
    const allowedOptions = ["Family", "Bachelors", "Anyone"];

    const handleMultiSelect = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: prev[field].includes(value)
                ? prev[field].filter(v => v !== value)
                : [...prev[field], value],
        }));
    };

    const handleRadioChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

     const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API}/property/filter`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );
      const json = await res.json();
      onFilterSubmit(json.properties || []);
      onClose();
    } catch (err) {
      console.log("Filter request failed:", err);
    }
  };
    return (
        <>


            <form onSubmit={handleSubmit} className="bg-black  p-6 rounded shadow space-y-4">
                <div className="flex flex-cols flow-root">
                    <h2 className="text-xl font-semibold float-left">Filter Properties</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="float-right text-gray-500 top-3 right-3 text-2xl hover:text-white"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                {/* Property Types */}
                <div>
                    <label className="block font-medium mb-1">Property Type</label>
                    <div className="flex flex-wrap gap-2 text-black">
                        {propertyTypes.map(type => (
                            <button
                                type="button"
                                key={type}
                                onClick={() => handleMultiSelect("types", type)}
                                className={`px-3 py-1 rounded border ${filters.types.includes(type) ? "bg-blue-500 text-black" : "bg-gray-100"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* BHK */}
                <div>
                    <label className="block font-medium mb-1">BHK</label>
                    <div className="flex flex-wrap gap-2 text-black">
                        {bhkOptions.map(bhk => (
                            <button
                                type="button"
                                key={bhk}
                                onClick={() => handleMultiSelect("bhk", bhk)}
                                className={`px-3 py-1 rounded border ${filters.bhk.includes(bhk) ? "bg-green-500 text-white" : "bg-gray-100"
                                    }`}
                            >
                                {bhk}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Furnishing */}
                <div>
                    <label className="block font-medium mb-1">Furnishing Level</label>
                    <div className="flex gap-4">
                        {furnishingLevels.map(f => (
                            <label key={f} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="furnishing"
                                    value={f}
                                    checked={filters.furnishing === f}
                                    onChange={() => handleRadioChange("furnishing", f)}
                                />
                                {f}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Allowed For */}
                <div>
                    <label className="block font-medium mb-1">Allowed For</label>
                    <div className="flex gap-4">
                        {allowedOptions.map(opt => (
                            <label key={opt} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="allowedFor"
                                    value={opt}
                                    checked={filters.allowedFor === opt}
                                    onChange={() => handleRadioChange("allowedFor", opt)}
                                />
                                {opt}
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded">
                    Done
                </button>
            </form>
        </>
    );
};
