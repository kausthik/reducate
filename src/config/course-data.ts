export interface course {
  id: number,
  title: string,
  desc: string,
  image: string,
  link: string
}

export const courses: course[] = [
  {
    id: 1,
    title: "Web Development",
    desc: "Learn HTML, CSS, JavaScript and build websites.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    link: "https://www.geeksforgeeks.org/web-development/"
  },
  {
    id: 2,
    title: "Data Structures",
    desc: "Understand arrays, trees, graphs and algorithms.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    link: "https://www.geeksforgeeks.org/data-structures/"
  },
  {
    id: 3,
    title: "React Basics",
    desc: "Build modern UI using React and components.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    link: "https://www.geeksforgeeks.org/reactjs/"
  },
  {
    id: 4,
    title: "Node.js Backend",
    desc: "Create APIs and server-side applications.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    link: "https://www.geeksforgeeks.org/nodejs/"
  },
  {
    id: 5,
    title: "Database Management",
    desc: "Learn SQL, MongoDB and data handling.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    link: "https://www.geeksforgeeks.org/dbms/"
  },
  {
    id: 6,
    title: "Operating Systems",
    desc: "Processes, threads, scheduling and memory.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    link: "https://www.geeksforgeeks.org/operating-systems/"
  },
  {
    id: 7,
    title: "Computer Networks",
    desc: "Learn protocols, TCP/IP and networking basics.",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
    link: "https://www.geeksforgeeks.org/computer-network-tutorials/"
  },
  {
    id: 8,
    title: "Machine Learning",
    desc: "Intro to AI, models and data training.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    link: "https://www.geeksforgeeks.org/machine-learning/"
  },
  {
    id: 9,
    title: "Cyber Security",
    desc: "Protect systems and understand threats.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    link: "https://www.geeksforgeeks.org/computer-security-tutorial/"
  },
  {
    id: 10,
    title: "Cloud Computing",
    desc: "AWS, deployment and scalable systems.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    link: "https://www.geeksforgeeks.org/cloud-computing/"
  }
];
