
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";

function DWLR_graph() {
  const generateReport = () => {


    fetch("http://localhost:3000/generate_alert_report", {
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
    <>
      <Navbar />
      <div className="bg-[#D1E9F5] w-screen h-screen"> 
        <div className="h-screen w-screen ">
          <div className="flex h-screen w-screen rounded bg-[#D1E9F5]">
            <div className="w-2/3 p-8  flex flex-col ">
              <h1 className="text-center text-2xl "></h1>
              <img src="image/image1.jpg" alt="graph 1" className="p-4 w-full" />
              <img src="image/image2.jpg" alt="graph 2" className="p-4 w-[600px]" />
              <h1 className="text-center text-2xl "></h1>
            </div>

            <div className="w-1/5 p-8 flex flex-col h-1/2 justify-evenly">
              <Button
                className="bg-white border border-gray-100 rounded shadow hover:bg-gray-100 font-bold"
                onClick={() => {
                  generateReport();
                }}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </div>
      </div></>
  );
}

export default DWLR_graph;
