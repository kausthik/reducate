interface category {
    name : string,
    slug : string,
    icon : string,
    desc : string,
    color:string
}

export const categories : category[]= [
  {
    name: "Easy",
    slug: "easy",
    icon: "🟢",
    desc: "Basic problems",
    color: "bg-blue-50 border border-blue-200 text-blue-700"
  },
  {
    name: "Medium",
    slug: "medium",
    icon: "🟡",
    desc: "Intermediate problems",
    color: "bg-blue-50 border border-blue-200 text-blue-700"
  },
  {
    name: "Hard",
    slug: "hard",
    icon: "🔴",
    desc: "Advanced problems",
    color: "bg-blue-50 border border-blue-200 text-blue-700"
  },
  {
    name: "Contest",
    slug: "contest",
    icon: "🏆",
    desc: "Competitive rating",
    color: "bg-blue-50 border border-blue-200 text-blue-700",
  },
  {
    name: "Today's Problem",
    slug: "daily",
    icon: "📅",
    desc: "Daily streak",
   color: "bg-blue-50 border border-blue-200 text-blue-700"
  },
  {
    name: "Overall",
    slug: "overall",
    icon: "🔥",
    desc: "Total performance",
   color: "bg-blue-50 border border-blue-200 text-blue-700"
  },
];
