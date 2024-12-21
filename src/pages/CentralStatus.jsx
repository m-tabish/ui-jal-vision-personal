
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Title from "../components/Topbar";

function CentralStatus() {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col items-center'>
            <Title />
            <Navbar />
            <section className='flex justify-between text-2xl font-bold w-[98%] h-[4rem] border border-black border-3 p-5'
            >
                <div className="flex-col " onClick={() => { navigate("/ ") }}>Pincode</div>
                <div className="flex-col " onClick={() => { navigate("#") }}>City/Town/Village</div>
                <div className="flex-col " onClick={() => { navigate("#") }}>State</div>
            </section>
        </div>
    )
}

export default CentralStatus
