import React from 'react';
import { withBase } from "@/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  slug: string;
}

export function TeamCard({ name, role, image, slug }: TeamCardProps) {
  return (
    <a 
      href={withBase(`/teams/${slug}`)}
      className="group relative flex flex-col items-center p-6 rounded-2xl bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 overflow-hidden rounded-2xl">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="text-sm font-medium text-primary">View Profile</span>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{name}</h3>
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{role}</p>
      </div>
    </a>
  );
}
