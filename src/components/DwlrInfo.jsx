import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const dwlr_info = [
    {
        dwlr_id: 1234,
        location: 'Gomti Nagar',
        status: 'No data',
        lastReported: '24 hours ago',
        waterLevel: '12.5',
        batteryLevel: '75%',
        alertMessage: 'DWLR 1234 has not reported data for the last 24 hours.',
    },
    {
        dwlr_id: 5678,
        location: 'Area 2',
        status: 'Abnormal',
        lastReported: '12 hours ago',
        waterLevel: '15.2',
        batteryLevel: '90%',
        alertMessage: 'DWLR 5678 is reporting abnormal water level data.',
    },
    {
        dwlr_id: 9012,
        location: 'Area 3',
        status: 'Low ',
        lastReported: '6 hours ago',
        waterLevel: '8.7',
        batteryLevel: '25%',
        alertMessage: 'DWLR 9012 has a low battery level.',
    },
    {
        dwlr_id: 1357,
        location: 'Area 4',
        status: 'No data',
        lastReported: '48 hours ago',
        waterLevel: '10.1',
        batteryLevel: '60%',
        alertMessage: 'DWLR 1357 has not reported data for the last 48 hours.',
    },
    {
        dwlr_id: 2468,
        location: 'Area 5',
        status: 'Abnormal',
        lastReported: '1 hour ago',
        waterLevel: '18.2',
        batteryLevel: '80%',
        alertMessage: 'DWLR 2468 is reporting abnormal water level data.',
    },
    {
        dwlr_id: 3579,
        location: 'area 6',
        status: 'Low ',
        lastReported: '3 hours ago',
        waterLevel: '9.4',
        batteryLevel: '15%',
        alertMessage: 'DWLR 3579 has a low battery level.',
    },
];

const titles_css = 'font-bold text-lg mt-3';

function DwlrInfo() {
    const navigate = useNavigate();
    const { t } = useTranslation()
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 h-1/3 bg-[#D1E9F5]">
            {dwlr_info.map((box, index) => {
                const color = box.status === 'No data' ? 'bg-red-500' : box.status === 'Abnormal' ? 'bg-yellow-500' : 'bg-green-500';

                return (
                    <div key={index} className="p-6 rounded-lg shadow-lg bg-white" onDoubleClick={() => { navigate("/DWLR_graph") }}>
                        <h1 className='font-bold text-2xl'>{t(`DWLR ID: ${box.dwlr_id}`)}</h1>
                        <p>{t('location_info', { location: box.location })} </p>
                        <p className={`${titles_css}`}>{t("Status")}</p>

                        {/* Status Box */}
                        <div className={`flex items-center justify-center rounded-xl w-1/2 text-center text-white ${color}`}>
                            {box.status}
                        </div>

                        <h2 className={`${titles_css}`}>{t("Last Reported")}</h2>
                        <p className='text-md'>{box.lastReported}</p>

                        <h2 className={`${titles_css}`}> {t("Water Level")}  </h2>
                        <p>{box.waterLevel}</p>

                        <h2 className={`${titles_css}`}>{t("Battery Level")}</h2>
                        <p>{box.batteryLevel}</p>

                        <h2 className={`${titles_css}`}>{t("Alerts")}</h2>
                        <div className='p-6 rounded-lg shadow-lg'>
                            <h3 className='font-bold'>{box.status}</h3>
                            <p>{box.alertMessage}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default DwlrInfo;