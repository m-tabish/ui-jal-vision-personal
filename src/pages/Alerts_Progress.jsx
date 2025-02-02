import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AlertTracker from "../components/AlertTracker";

function Alerts_Progress() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  return (
    <div className="bg-[#D1E9F5] w-screen h-screen">
      <Navbar />
      <div className="h-screen w-screen bg-[#D1E9F5]">
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Alert Status</h1>
      <AlertTracker currentStatus={2} />
    </div>
    <h2 className="text-2xl font-semibold mt-8 mb-4 px-6">Alert Raised:</h2>
      
      <div className="flex justify-center">
        <textarea
          className="w-80 max-w-2xl h-10 p-4 border border-gray-300 rounded shadow-sm bg-gray-200"
          placeholder="Add comment"
        ></textarea>
      </div>
        </div>
        </div>
  )
}

export default Alerts_Progress;