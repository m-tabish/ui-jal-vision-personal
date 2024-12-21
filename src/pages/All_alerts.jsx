/* eslint-disable no-unused-vars */
import { AlertCircle, CheckCircle2, Circle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const LEVELS = ['Central', 'State', 'District'];

const fetchAlertInfo = async () => {
    try {
        const response = await fetch('your_api_endpoint');
        if (!response.ok) throw new Error('Failed to fetch alert info');
        return await response.json();
    } catch (error) {
        console.error('Error fetching alert info:', error);
        return null;
    }
};

function All_alerts() {
    const [currentLevel, setCurrentLevel] = useState('Central');
    const [districtResponse, setDistrictResponse] = useState('');
    const [alertInfo, setAlertInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchAlertInfo().then((info) => {
            setAlertInfo(info);
            setIsLoading(false);
        });
    }, []);

    const handleNextLevel = () => {
        const currentIndex = LEVELS.indexOf(currentLevel);
        if (currentIndex < LEVELS.length - 1) {
            setCurrentLevel(LEVELS[currentIndex + 1]);
        }
    };

    const handleSubmitResponse = (event) => {
        event.preventDefault();
        console.log("District response:", districtResponse);
    };

    return (
        <div className="bg-gray-100 w-screen h-screen">
            <Navbar />
            <div className="flex items-center justify-center h-screen bg-[#D1E9F5]">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl mx-auto p-6">
                    <h1 className="text-3xl font-bold mb-6 text-center">Alert Redressal Tracker</h1>
                    <div className="mb-4 p-4 border border-gray-300 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Alert Progress</h2>
                        <div className="relative mb-8">
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                <div
                                    style={{
                                        width: `${(LEVELS.indexOf(currentLevel) / (LEVELS.length - 1)) * 100}%`
                                    }}
                                    className="flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
                                ></div>
                            </div>
                            <div className="flex justify-between">
                                {LEVELS.map((level, index) => {
                                    const status =
                                        LEVELS.indexOf(currentLevel) > index
                                            ? 'completed'
                                            : LEVELS.indexOf(currentLevel) === index
                                                ? 'active'
                                                : 'pending';
                                    return (
                                        <div key={level} className="flex flex-col items-center">
                                            {status === 'completed' && <CheckCircle2 className="text-green-500" />}
                                            {status === 'active' && <AlertCircle className="text-blue-500" />}
                                            {status === 'pending' && <Circle className="text-gray-300" />}
                                            <span className="mt-2 text-sm font-medium">{level}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <h2 className="text-lg font-semibold mb-2">Alert Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p><strong>DWLR ID:</strong> CGWKOLO166</p>
                            <p><strong>State:</strong> Madhya Pradesh</p>
                            <p><strong>District:</strong> Agarmalwa</p>
                            <p><strong>Tahsil:</strong> Susner</p>
                            <p><strong>Block:</strong> Susner</p>
                            <p><strong>Village:</strong> Soyat(Deep)</p>
                            <p><strong>Date:</strong> 12/12/2024</p>
                            <p><strong>Category:</strong> Abnormal Data</p>
                        </div>
                        {currentLevel === 'Central' && (
                            <button onClick={handleNextLevel} className="mt-4 bg-blue-600 hover::bg-blue-700 text-white rounded shadow px-4 py-2 transition duration-200">
                                Notify State
                            </button>
                        )}
                        {currentLevel === 'State' && (
                            <button onClick={handleNextLevel} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded shadow px-4 py-2 transition duration-200">
                                Forward to District
                            </button>
                        )}
                        {currentLevel === 'District' && (
                            <form onSubmit={handleSubmitResponse} className="mt-4">
                                <textarea
                                    placeholder="Enter the cause of the alert and actions taken"
                                    value={districtResponse}
                                    onChange={(e) => setDistrictResponse(e.target.value)}
                                    className="w-full border rounded p-2 mb-2"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white rounded shadow px-4 py-2 transition duration-200" type="submit">
                                    Submit Response
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}

export default All_alerts;
