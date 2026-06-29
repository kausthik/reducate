import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { servicesType } from "@/src/config/services-data"

type props = {
    data : servicesType,
}

export default async function ServicesPage({data} : props) {
   
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src={`${data.img_url}`}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover"
      />
      <CardHeader>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle className="font-bold">{data.title}</CardTitle>
        <CardDescription className="font-semibold text-blue-800">
          {data.desc}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Enter</Button>
      </CardFooter>
    </Card>
  )
}
