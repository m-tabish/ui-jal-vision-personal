
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

function DWLR_graph() {
  const generateReport = () => {


    fetch("https://jal-vision-server.vercel.app/generate_alert_report", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch the report");
        }
        return response.blob(); // Convert response to Blob
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // Create object URL from Blob
        const link = document.createElement("a"); // Create a temporary anchor element
        link.href = url;
        link.download = "Alert_Report.pdf"; // Set file name for download
        link.click(); // Trigger download
        window.URL.revokeObjectURL(url); // Clean up the URL
      })
      .catch((error) => console.error("Error generating report:", error));
  };

  return (
    <div className="bg-white w-screen h-screen">
      <Navbar />
      <div className="h-screen w-screen bg-[#D1E9F5]">
        <div className="flex h-screen w-screen rounded">
          <div className="w-2/3 p-8">
            <h1 className="text-center text-2xl"></h1>
            <img src="image/image1.jpg" alt="graph 1" className="p-4" />
            <img src="image/image2.jpg" alt="graph 2" className="p-4" />
            <h1 className="text-center text-2xl"></h1>
          </div>

          <div className="w-1/5 p-8 flex flex-col h-1/2 justify-evenly">
            <Button
              className="bg-white border border-gray-100 rounded shadow hover:bg-gray-100 font-bold"
              onClick={() => {
                generateReport();
                setTimeout(() => {
                  alert("Report Generated");
                }, 4000);
              }}
            >
              Generate Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DWLR_graph;
