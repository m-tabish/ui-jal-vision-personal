import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    return (
        <nav className='flex justify-around items-center text-2xl text-white font-bold w-full h-[3rem]  bg-[#3798D5] '>
            <div className="" onClick={() => { navigate("/") }}>Home</div>
            <div className="" onClick={() => { navigate("/dwlrinfo") }}>Status</div>
            <div className="" onClick={() => { navigate("/alerts") }}>Alerts</div>
            <div className="" onClick={() => { navigate("/dwlr_graph") }}>Reports</div>
        </nav>
    )
}

export default Navbar
