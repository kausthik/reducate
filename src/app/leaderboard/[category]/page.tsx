import { users } from "../data";

async function getUserData(username: string) {
  const res = await fetch(
    `http://localhost:3000/api/leetcode?username=${username}`,
    {
      next: { revalidate: 60 }, 
    },
  );

  return res.json();
}

export default async function CategoryPage({ params }: any) {
  const { category } = await params;
  const data = await Promise.all(
    users.map(async (username) => {
      const stats = await getUserData(username);

      let score = 0;

      if (category === "easy") {
        score = stats.easySolved || 0;
      } else if (category === "medium") {
        score = stats.mediumSolved || 0;
      } else if (category === "hard") {
        score = stats.hardSolved || 0;
      } else if (category === "contest") {
        score =stats.ranking && stats.ranking > 0
            ? 100000 - stats.ranking
            : Math.floor(Math.random() * 2000) + 1000; 
      } else if (category === "daily") {
        score = Math.floor(Math.random() * 50);
      } else {
        score = stats.score || 0;
      }

      return {
        username,
        score,
      };
    }),
    );
    
  const sorted = data.sort((a, b) => b.score - a.score);
   return (
     <div className="min-h-screen bg-gray-100 p-6">
       <h1 className="text-3xl font-bold text-center mb-8">
         {category.toUpperCase()} Leaderboard
       </h1>

       <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 mb-8">
         {sorted.slice(0, 3).map((user, index) => {
           const colors = ["bg-yellow-300", "bg-gray-300", "bg-orange-300"];

           return (
             <div
               key={user.username}
               className={`p-4 rounded-xl text-center shadow ${colors[index]}`}
             >
               <p className="text-xl font-bold">
                 {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
               </p>
               <p className="font-semibold">{user.username}</p>
               <p className="text-lg">{user.score}</p>
             </div>
           );
         })}
       </div>

       <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6">
         <table className="w-full">
           <thead>
             <tr className="text-left border-b">
               <th className="py-2">Rank</th>
               <th className="py-2">Username</th>
               <th className="py-2 text-right">
                 {category === "contest"
                   ? "Rating"
                   : category === "daily"
                     ? "Streak"
                     : "Score"}
               </th>
             </tr>
           </thead>

           <tbody>
             {sorted.map((user, index) => {
               let medal = "";
               if (index === 0) medal = "🥇";
               else if (index === 1) medal = "🥈";
               else if (index === 2) medal = "🥉";

               return (
                 <tr
                   key={user.username}
                   className="border-b hover:bg-gray-50 transition"
                 >
                   <td className="py-3 font-semibold">
                     {index + 1} {medal}
                   </td>

                   <td className="py-3">{user.username}</td>

                   <td className="py-3 text-right font-bold text-blue-600">
                     {user.score}
                   </td>
                 </tr>
               );
             })}
           </tbody>
         </table>
       </div>
     </div>
   );
}
