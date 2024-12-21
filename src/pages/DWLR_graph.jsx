
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
function DWLR_graph() {

  const generateReport = () => {
    fetch('http://localhost:3000/generate_report')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
  };
  useEffect(() => {
    generateReport();

  }, []);
  return (
    <div className="bg-white w-screen h-screen">
      <Navbar />
      <div className="h-screen w-screen bg-[#D1E9F5]">
      <div className="flex h-screen w-screen rounded">

        <div className="w-2/3 p-8 ">
        <h1 className="text-center text-2xl"></h1>
        <img src="image/image1.jpg" alt="graph 1" className="p-4" />
        <img src="image/image2.jpg" alt="graph 1" className="p-4" />
        <h1 className="text-center text-2xl"></h1>
        </div>

        <div className="w-1/5  p-8 flex flex-col h-1/2 justify-evenly">
        {/*<select name="filter" id="filter" defaultValue="Filter" className="border border-gray-100 rounded shadow">
          <option value="Yearly">Yearly</option>
          <option value="Monthly">Monthly</option>
          <option value="Weekly">Weekly</option>
        </select> */}



        <Button className="  bg-white border border-gray-100 rounded shadow hover:bg-gray-100 font-bold" onClick={() => { generateReport(); setTimeout(() => { alert("Report Generated"); }, 4000) }}>
          Generate Report
        </Button>
        </div>

      </div>
      </div>
    </div>
    );
}

export default DWLR_graph;