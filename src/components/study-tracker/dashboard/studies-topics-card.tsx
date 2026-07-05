import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";


import StudiedTopicItem from "./studied-topic-item";
import { RegisterStudiedTopic } from "./study/add-topic-dialog";
import { getTodayStudiesAction } from "@/src/actions/study.action";

type topicType = {
    subject: string, 
    title: string,
    difficulty: "Easy" | "Medium" | "Hard";
}

const topics : topicType[] = [
  {
    subject: "Operating System",
    title: "Deadlock",
    difficulty: "Hard",
  },
  {
    subject: "DSA",
    title: "Binary Search",
    difficulty: "Easy",
  },
  {
    subject: "DBMS",
    title: "Normalization",
    difficulty: "Medium",
  },
  {
    subject: "Computer Networks",
    title: "TCP Handshake",
    difficulty: "Medium",
  },
];


export  default function StudiedTopicsCard() {

// const [data, setData] = useState([]);

// useEffect(() => {
//   async function fetchStudies() {
//     const studies = await getTodayStudiesAction();
//     setData(studies);
//   }
//   fetchStudies();
// }, []);
  
  return (
    <Card className="ml-5 mr-2.5">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Studied Topics</CardTitle>

          <CardDescription>
            Topics you've completed manually.
          </CardDescription>
        </div>
        {/* add dialog box */}
       <RegisterStudiedTopic/>
      </CardHeader>

      <CardContent className="space-y-3">
        {topics.map((topic) => (
          <StudiedTopicItem
            key={topic.title}
            {...topic}
          />
        ))}
      </CardContent>
    </Card>
  );
}