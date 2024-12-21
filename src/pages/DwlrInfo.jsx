
import { useNavigate } from 'react-router-dom'
import AreaInfo from '../components/Areainfo'
import Databutton from '../components/Databutton'
import DwlrBox from '../components/DwlrInfo'
import Navbar from '../components/Navbar'


function DwlrInfo() {
const navigate = useNavigate()
  return (
    <div className='w-screen h-screen'>
      <Navbar></Navbar>
      <AreaInfo></AreaInfo>
      <div className='bg-[#D1E9F5]'>
        <Databutton></Databutton>
        <DwlrBox />
      </div>
      <button onClick={navigate("/alerts")}>Alerts</button>
    </div>
  )
}

export default DwlrInfo
