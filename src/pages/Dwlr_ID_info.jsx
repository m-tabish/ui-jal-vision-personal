import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Title from "../components/Topbar";

function Dwlr_ID_info() {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-screen h-screen">
      <Title />
      <Navbar />
      <div className="h-screen w-screen bg-[#D1E9F5]">
        <div className="flex h-screen w-screen rounded">

          <div className="w-2/3 p-8">
            <h1 className="text-center text-2xl">Pre-Monsoon</h1>
            <img src="image/image.png" alt="graph 1" className="p-4" />
            <h1 className="text-center text-2xl">Post-Monsoon</h1>
            <img src="image/image.png" alt="graph 2" className="w-full p-4" />
          </div>

          <div className="w-1/3 p-8">
            <select name="filter" id="filter" defaultValue="Filter" className="border border-gray-100 rounded shadow">
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
            </select>

            <div className="rounded shadow bg-white">
              box
            </div>

            <button className=" bg-white border border-gray-100 rounded shadow hover:bg-gray-100" onClick={"#"}>
              Generate Report
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dwlr_ID_info;