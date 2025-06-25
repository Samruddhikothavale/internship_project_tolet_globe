import { Eye, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import "./propertycard.css";
import homeImg from "../../../assets/find-home-logo.jpg";

export const Propertycard = ({
  _id,
  images,
  price,
  propertyTitle,
  about,
  owner,
  viwes,
  area,
  bhk,
}) => {
  return (
    <div className="property-card rounded-xl bg-slate-900 shadow-lg transition hover:shadow-xl">
      <img
        src={images[0] || homeImg }
        alt={propertyTitle}
        className="h-48 w-full rounded-t-xl object-cover"
      />

      <div className="property-content p-4">
        <h3 className="property-title mb-1 text-sm font-semibold">{propertyTitle}</h3>
        <p className="property-description mb-2 text-sm text-slate-400">
          {about}
        </p>

        <div className="mb-2 flex flex-wrap gap-2 text-sm text-slate-300">
          <span>{bhk} BHK</span>
          <span>·</span>
          <span>{area} sq ft</span>
          <span>·</span>
          <span className="font-medium">₹{price.toLocaleString()}</span>
        </div>

        <Link to={`/property/${_id}`}>
          <button className="rounded-md bg-slate-800 px-4 py-2 text-sm transition hover:bg-slate-700">
            Read&nbsp;More →
          </button>
        </Link>

        <div className="property-footer mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block h-6 w-6 rounded-full bg-slate-600" />
            <span>{owner}</span>
          </div>

          <div className="property-stats flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye size={14} /> {viwes}
            </span>
            
          </div>
        </div>
      </div>
    </div>
  );
};
