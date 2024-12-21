import { useNavigate } from "react-router-dom";
import Title from "../components/Topbar";

function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-white w-screen h-screen">
      <Title />
      <div className="h-screen w-screen bg-[#D1E9F5]"></div>
    </div>
  )
};

export default Landing;