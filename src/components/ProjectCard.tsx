import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  location: string;
  image: string;
  href: string;
  category: string;
}

export default function ProjectCard({ title, location, image, href, category }: ProjectCardProps) {
  return (
    <Link to={href} className="group block relative overflow-hidden rounded-2xl gentle-shadow hover:gentle-shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-text-strong/80 via-transparent to-transparent flex items-end">
        <div className="p-6 text-bg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-sm font-medium text-accent-sand bg-accent-sand/20 px-3 py-1 rounded-full">
            {category}
          </span>
          <h3 className="text-xl font-semibold mt-2">{title}</h3>
          <p className="text-bg/80">{location}</p>
        </div>
      </div>
    </Link>
  );
}