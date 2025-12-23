import { BlogPost, Profile } from "./types";

export const profileData: Profile = {
  name: "John Doe",
  description:
    "Full-stack developer passionate about creating beautiful web experiences. I write about web development, design, and technology.",
  profileImage: "/profile.svg",
};

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js 14",
    date: "2024-01-15",
    content:
      "Next.js 14 brings exciting new features including the App Router, Server Components, and improved performance. In this post, we'll explore how to get started with the latest version of Next.js and build modern web applications.",
    excerpt:
      "Next.js 14 introduces groundbreaking features that revolutionize how we build React applications. The new App Router provides a more intuitive file-based routing system, while Server Components enable us to render components on the server for better performance and SEO. ",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS",
    date: "2024-01-10",
    content:
      "Tailwind CSS is a utility-first CSS framework that allows you to rapidly build custom user interfaces. Learn how to leverage its powerful features to create responsive and beautiful designs without leaving your HTML.",
    excerpt:
      "Tailwind CSS has transformed the way developers approach styling in modern web development. This utility-first framework eliminates the need to write custom CSS by providing a comprehensive set of utility classes that can be combined to create any design. In this deep dive, we'll explore advanced Tailwind techniques including custom configuration, plugin development, and performance optimization. ",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    date: "2024-01-05",
    content:
      "TypeScript adds static type checking to JavaScript, making your code more maintainable and less error-prone. Discover best practices for using TypeScript in your projects, from type definitions to advanced patterns.",
    excerpt:
      "TypeScript has become an essential tool for building large-scale JavaScript applications. By adding static type checking, TypeScript helps catch errors at compile time, improves code readability, and enhances developer experience through better IDE support. This comprehensive guide covers everything from basic type annotations to advanced TypeScript patterns. We'll discuss type definitions, generics, utility types, and how to structure your TypeScript projects for maximum maintainability. ",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
  },
  {
    id: "4",
    title: "Building Responsive Web Applications",
    date: "2024-01-01",
    content:
      "Responsive design is crucial in today's multi-device world. Learn how to create web applications that work seamlessly across desktop, tablet, and mobile devices using modern CSS techniques and frameworks.",
    excerpt:
      "In today's digital landscape, responsive design is no longer optional—it's a fundamental requirement for any web application. With users accessing websites from a wide variety of devices, from large desktop monitors to small mobile phones, creating a seamless experience across all screen sizes is crucial. This guide explores modern responsive design techniques, including CSS Grid, Flexbox, and container queries. ",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
  },
  {
    id: "5",
    title: "Understanding React Hooks",
    date: "2023-12-28",
    content:
      "React Hooks revolutionized how we write React components. Learn about useState, useEffect, and custom hooks to build more efficient and maintainable React applications.",
    excerpt:
      "React Hooks have fundamentally changed the way we write React components, making functional components as powerful as class components. This comprehensive guide covers all the essential hooks including useState for managing component state, useEffect for handling side effects, and custom hooks for reusable logic. We'll explore best practices, common patterns, and how to avoid common pitfalls when working with hooks. ",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  },
  {
    id: "6",
    title: "Modern JavaScript Features",
    date: "2023-12-20",
    content:
      "Explore the latest JavaScript features including async/await, destructuring, arrow functions, and more. These modern features make JavaScript development more efficient and enjoyable.",
    excerpt:
      "JavaScript has evolved significantly over the years, introducing powerful features that make development more efficient and code more readable. This post dives into modern JavaScript features like async/await for handling asynchronous operations, destructuring for extracting values from arrays and objects, arrow functions for concise function syntax, and template literals for string interpolation. ",
    image:
      "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&h=400&fit=crop",
  },
];
