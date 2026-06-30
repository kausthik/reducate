export type servicesType = {
    img_url : string,
    title: string,
    desc: string,
    link: string
}

export const servicesData : servicesType[] = [
    {
        img_url : "/services/leetcode_ranking.png",
        title:"Coders Compete Zone",
        desc:"Compete with friends, climb the leaderboard, and grow together.",
        link: "/leaderboard"
    },
     {
        img_url : "/services/calorie-tracker.png",
        title:"Count Calories",
        desc:"Count calories, stay healthy, and achieve your fitness goals.",
        link: "/calorie-tracker",
    },
    {
        img_url : "/services/study-tracker.png",
        title:"Track your study",
        desc:"Track your subjects, monitor revisions, and see where you spend the most study time.",
        link: "/study-tracker",
    }
];