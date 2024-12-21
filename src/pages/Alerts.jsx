import { useNavigate } from "react-router-dom";

const AlertTable = () => {
    const navigate = useNavigate();
    // Alert data
    const alertData = [
        {
            telemetryUID: "CGWKOL0166",
            status_dwlr: 2,
            status_batteryLevel: 1,
        },
    ];

    // Telemetry data
    const telemetryData = [
        {
            stationId: "CGWKOL0166",
            state: "Madhya Pradesh",
            district: "Agarmalwa",
            tahsil: "Susner",
            block: "Susner",
            village: "Soyat(Deep)",
            waterLevel: -7.4,
            wellDepth: -26.9,
            batteryVoltage: 3.42,
        },
    ];

    // Generate alert messages
    const generateAlerts = () => {
        return alertData.flatMap((alert, index) => {
            const telemetry = telemetryData.find(data => data.stationId === alert.telemetryUID);
            const alerts = [];
            if (alert.status_dwlr === 2 && telemetry.waterLevel > telemetry.wellDepth) {
                alerts.push({
                    type: "Well Depth Alert",
                    message: `The water level of well "${telemetry.stationId}" is ${telemetry.waterLevel} meters, which exceeds the well depth of ${telemetry.wellDepth} meters.`,
                    details: `[State: ${telemetry.state}, District: ${telemetry.district}, Tahsil: ${telemetry.tahsil}, Block: ${telemetry.block}, Village: ${telemetry.village}]`,
                });
            }
            if (alert.status_batteryLevel === 1 && telemetry.batteryVoltage < 3.5) {
                alerts.push({
                    type: "Low Battery Alert",
                    message: `Low Battery Level for well "${telemetry.stationId}". Battery Voltage is at ${telemetry.batteryVoltage}V.`,
                    details: `[State: ${telemetry.state}, District: ${telemetry.district}, Tahsil: ${telemetry.tahsil}, Block: ${telemetry.block}, Village: ${telemetry.village}]`,
                });
            }
            return alerts.map((alertItem, i) => ({ ...alertItem, key: `${index}-${i}` }));
        });
    };

    const alerts = generateAlerts();

    return (
        <div>
            <h2>Alert Table</h2>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Message</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {alerts.length > 0 ? (
                        alerts.map(alert => (
                            <tr key={alert.key}>
                                <td>{alert.type}</td>
                                <td>{alert.message}</td>
                                <td>{alert.details}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No alerts available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <style>{`
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f4f4f4;
                }
                tr:nth-child(even) {
                    background-color: #f9f9f9;
                }
                tr:hover {
                    background-color: #f1f1f1;
                }
            `}</style>
            <button onClick={() => navigate()}></button>
        </div>
    );
};

export default AlertTable;
