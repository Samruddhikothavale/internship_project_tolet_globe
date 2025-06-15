import { Eye, Heart } from 'lucide-react';
import './BlogCard.css';
import { Link } from "react-router-dom";
export const BlogCard = ({_id, image, date, title, description, author, viwes, likes, role }) => {

  
  return (
    <div className="blog-card" >
      <img src={image} alt="Blog Cover" className="blog-image" />
      <div className="blog-content">
        <p className="blog-meta">
          {date.substr(0, 10)}
        </p>
        <h3 className="blog-title">{title}</h3>
        <p className="blog-description">{description}</p>
        <Link to={`/blogs/${_id}`} className="blog-readmore">
          Read More →
        </Link>
        <div className="blog-footer">
          <div className="blog-author">
            <img src={image} alt={title} className="author-img" />
            <div>
              <p className="author-name">{author}</p>
              <p className="author-role">{role}</p>
            </div>
          </div>
          <div className="blog-stats">
            <span><Eye size={16} /> {viwes}</span>
            <span><Heart size={16} /> {likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
