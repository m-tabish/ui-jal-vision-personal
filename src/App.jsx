import { useTranslation } from "react-i18next"
import Header_banner from "./components/Header_banner"
import Navbar from "./components/Navbar"
function App() {
  const { t } = useTranslation()
  return (
    <>
      <Header_banner />
      <Navbar></Navbar>
      <div className="bg-[#D1E9F5] w-screen h-screen flex flex-col justify-center items-center">
        {t("greeting")}
      </div> 
    </>
  )
}

export default App
