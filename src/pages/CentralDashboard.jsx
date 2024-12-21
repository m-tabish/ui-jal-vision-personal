/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import Box from "../components/Box";
import Navbar from "../components/Navbar";
import { useTranslation } from "react-i18next";
import MapComponent from "./Map";

function CentralDashboard() {
  const { t } = useTranslation()
  const navigate = useNavigate();
  return (
    <div className="bg-white w-screen h-screen">
      <Navbar />
      <div className=" bg-[#D1E9F5] w-screen h-screen flex flex-col  justify-evenly items-center">
        <MapComponent />
        {/* <div className="mt-40 flex w-2/3 justify-center gap-16 text-2xl">
          <Box headline="Total DWLR Installed" data="14000" />
          <Box headline="Running DWLR" data="13995" />
          <Box headline="Problematic" data="5" />
        </div> */}
        {/* <div className="text-3xl font-bold" >{t("Check Status of DWLRs")}</div>
        <div className="flex w-2/3 justify-evenly gap-16">
          <select
            name="state"
            id="state"
            defaultValue={""}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="" disabled>
              {t("Select State")}
            </option>
            <option value="Andhra Pradesh">{t("Andhra Pradesh")}</option>
            <option value="Arunachal Pradesh">{t("Arunachal Pradesh")}</option>
            <option value="Assam">{t("Assam")}</option>
            <option value="Bihar">{t("Bihar")}</option>
            <option value="Chhattisgarh">{t("Chhattisgarh")}</option>
            <option value="Goa">{t("Goa")}</option>
            <option value="Gujarat">{t("Gujarat")}</option>
            <option value="Haryana">{t("Haryana")}</option>
            <option value="Himachal Pradesh">{t("Himachal Pradesh")}</option>
            <option value="Jharkhand">{t("Jharkhand")}</option>
            <option value="Karnataka">{t("Karnataka")}</option>
            <option value="Kerala">{t("Kerala")}</option>
            <option value="Madhya Pradesh">{t("Madhya Pradesh")}</option>
            <option value="Maharashtra">{t("Maharashtra")}</option>
            <option value="Manipur">{t("Manipur")}</option>
            <option value="Meghalaya">{t("Meghalaya")}</option>
            <option value="Mizoram">{t("Mizoram")}</option>
            <option value="Nagaland">{t("Nagaland")}</option>
            <option value="Odisha">{t("Odisha")}</option>
            <option value="Punjab">{t("Punjab")}</option>
            <option value="Rajasthan">{t("Rajasthan")}</option>
            <option value="Sikkim">{t("Sikkim")}</option>
            <option value="Tamil Nadu">{t("Tamil Nadu")}</option>
            <option value="Telangana">{t("Telangana")}</option>
            <option value="Tripura">{t("Tripura")}</option>
            <option value="Uttar Pradesh">{t("Uttar Pradesh")}</option>
            <option value="Uttarakhand">{t("Uttarakhand")}</option>
            <option value="West Bengal">{t("West Bengal")}</option>
            <option value="Andaman and Nicobar Islands">{t("Andaman and Nicobar Islands")}</option>
            <option value="Chandigarh">{t("Chandigarh")}</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">{t("Dadra and Nagar Haveli and Daman and Diu")}</option>
            <option value="Delhi">{t("Delhi")}</option>
            <option value="Jammu and Kashmir">{t("Jammu and Kashmir")}</option>
            <option value="Ladakh">{t("Ladakh")}</option>
            <option value="Lakshadweep">{t("Lakshadweep")}</option>
            <option value="Puducherry">{t("Puducherry")}</option>
          </select>

          <input
            type="text"
            placeholder={t("Enter City Name")}
            className="w-full border border-gray-300 rounded-md p-2"
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder={t("Enter DWLR Code")}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition w-28"
          onClick={() => { navigate("/dwlrinfo") }}
        >
          {t("Check Status")}
        </button> */}
      </div>
    </div>
  )
}

export default CentralDashboard
