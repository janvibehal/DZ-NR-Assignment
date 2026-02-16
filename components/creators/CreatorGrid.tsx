import CreatorCard from "./CreatorCard";

const DUMMY_CREATORS = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "sarahchen",
    avatar: "",
    niche: ["AI", "Machine Learning"],
    followers: "125K",
    bio: "AI researcher & educator. Building the future of intelligent systems. Sharing insights on ML, deep learning, and ethical AI.",
    verified: true,
  },
  {
    id: 2,
    name: "Marcus Rivera",
    username: "marcusdev",
    avatar: "",
    niche: ["Web Dev", "React"],
    followers: "89K",
    bio: "Full-stack developer passionate about React, Next.js, and modern web architecture. Creator of popular open-source tools.",
    verified: true,
  },
  {
    id: 3,
    name: "Emily Watson",
    username: "emilywatson",
    avatar: "",
    niche: ["Design", "UI/UX"],
    followers: "156K",
    bio: "Product designer crafting delightful user experiences. Leading design at a Fortune 500 company. Design systems enthusiast.",
    verified: true,
  },
  {
    id: 4,
    name: "David Kim",
    username: "davidkim",
    avatar: "",
    niche: ["Startups", "Business"],
    followers: "203K",
    bio: "Serial entrepreneur & investor. Built 3 successful startups. Sharing lessons on building, scaling, and fundraising.",
    verified: true,
  },
  {
    id: 5,
    name: "Priya Sharma",
    username: "priyasharma",
    avatar: "",
    niche: ["Content", "Marketing"],
    followers: "94K",
    bio: "Content strategist helping brands tell better stories. 10+ years in digital marketing. Speaker & workshop facilitator.",
    verified: false,
  },
  {
    id: 6,
    name: "Alex Thompson",
    username: "alexthompson",
    avatar: "",
    niche: ["Tech", "DevOps"],
    followers: "67K",
    bio: "DevOps engineer & cloud architect. Kubernetes expert. Helping teams ship faster with better infrastructure.",
    verified: false,
  },
  {
    id: 7,
    name: "Lisa Martinez",
    username: "lisamartinez",
    avatar: "",
    niche: ["AI", "Data Science"],
    followers: "112K",
    bio: "Data scientist turning numbers into insights. Specializing in predictive analytics and data visualization.",
    verified: true,
  },
  {
    id: 8,
    name: "James Cooper",
    username: "jamescooper",
    avatar: "",
    niche: ["Web Dev", "TypeScript"],
    followers: "78K",
    bio: "TypeScript advocate and open-source contributor. Building type-safe applications at scale. Conference speaker.",
    verified: false,
  },
  {
    id: 9,
    name: "Nina Patel",
    username: "ninapatel",
    avatar: "",
    niche: ["Design", "Branding"],
    followers: "145K",
    bio: "Brand designer creating memorable visual identities. Working with startups and Fortune 500s. Creative director & mentor.",
    verified: true,
  },
];

export default function CreatorGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DUMMY_CREATORS.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </div>
  );
}