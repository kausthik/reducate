import ServicesPage from "../components/servicesPage/servicesPage";
import { servicesData } from "../config/services-data";
import { blackOps } from "./layout";

export default function Home() {
  return (
    <div>
     <h1 className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance p-5 m-2 text-blue-900 ${blackOps.className}`}>
      All Serivces in one place...
    </h1>
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3">
      {
        servicesData.map((data, index)=>(
         <ServicesPage data={data} key={index}/>
        ))
      }
    </div>
    </div>
  );
}
