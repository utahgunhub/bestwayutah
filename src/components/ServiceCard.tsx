import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  image?: string;
}

export default function ServiceCard({ icon, title, description, href, image }: ServiceCardProps) {
  return (
    <Link to={href} className="group block">
      <div className="bg-bg rounded-2xl p-6 gentle-shadow hover:gentle-shadow-lg transition-all duration-300 h-full">
        {image && (
          <div className="mb-4 rounded-xl overflow-hidden">
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        
        <div className="mb-4 text-accent-primary">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-text-strong mb-3 group-hover:text-accent-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-text mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex items-center text-accent-primary font-medium">
          <span>Learn more</span>
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}