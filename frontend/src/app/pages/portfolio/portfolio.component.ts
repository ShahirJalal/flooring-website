import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  activeFilter: string = 'all';

  projects: Project[] = [
    {
      id: 1,
      title: "Modern Hardwood Installation",
      description: "Elegant oak flooring for living room",
      category: "hardwood",
      image: "assets/images/portfolio/portfolio-1.jpg"
    },
    {
      id: 2,
      title: "Laminate Living Space",
      description: "Waterproof laminate for family area",
      category: "laminate",
      image: "assets/images/portfolio/portfolio-2.jpg"
    },
    {
      id: 3,
      title: "Vinyl Kitchen Floor",
      description: "Durable vinyl tiles for busy kitchen",
      category: "vinyl",
      image: "assets/images/portfolio/portfolio-3.jpg"
    },
    {
      id: 4,
      title: "Classic Hardwood Design",
      description: "Traditional hardwood for dining room",
      category: "hardwood",
      image: "assets/images/portfolio/portfolio-4.jpg"
    },
    {
      id: 5,
      title: "Modern Vinyl Installation",
      description: "Contemporary vinyl flooring for office space",
      category: "vinyl",
      image: "assets/images/portfolio/portfolio-5.jpg"
    },
    {
      id: 6,
      title: "Premium Laminate Setup",
      description: "High-end laminate for master bedroom",
      category: "laminate",
      image: "assets/images/portfolio/portfolio-6.jpg"
    },
    {
      id: 7,
      title: "Rustic Hardwood Style",
      description: "Farmhouse-style hardwood installation",
      category: "hardwood",
      image: "assets/images/portfolio/portfolio-7.jpg"
    },
    {
      id: 8,
      title: "Commercial Vinyl Project",
      description: "Large-scale vinyl installation for retail space",
      category: "vinyl",
      image: "assets/images/portfolio/portfolio-8.jpg"
    }
  ];

  get filteredProjects() {
    if (this.activeFilter === 'all') {
      return this.projects;
    }
    return this.projects.filter(project => project.category === this.activeFilter);
  }

  filterProjects(category: string) {
    this.activeFilter = category;
  }
}