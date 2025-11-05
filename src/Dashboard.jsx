import { useContext, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LabContext } from "./context/LabContextProvider";
import { PcContext } from "./context/PcContextProvider";
import { StudentContext } from "./context/StudentContextProvider";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { labs, fetchLab } = useContext(LabContext);
  const { pcs, fetchPc } = useContext(PcContext);
  const { students, fetchStudent } = useContext(StudentContext);

  useEffect(() => {
    fetchLab();
    fetchPc();
    fetchStudent();
  }, []);

  const pcCounts = labs.map((lab) =>
    pcs.filter((pc) => pc.labId === lab.id).length
  );

  const pcPerLabData = {
    labels: labs.map((lab) => lab.name),
    datasets: [
      {
        label: "PCs per Lab",
        data: pcCounts,
        backgroundColor: "#ec4899",
        borderRadius: 6,
        barThickness: 22,
      },
    ],
  };

  const statusCount = { Available: 0, Occupied: 0, "In-Repairing": 0 };
  pcs.forEach((pc) => {
    if (pc.status === "Available") statusCount.Available++;
    else if (pc.status.toLowerCase() === "occupied") statusCount.Occupied++;
    else if (pc.status === "In-Repairing") statusCount["In-Repairing"]++;
  });

  const pcStatusData = {
    labels: ["Available", "Occupied", "In-Repairing"],
    datasets: [
      {
        label: "PC Status",
        data: [
          statusCount.Available,
          statusCount.Occupied,
          statusCount["In-Repairing"],
        ],
        backgroundColor: ["#22c55e", "#ec4899", "#000"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">
        Dashboard Overview
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="bg-pink-50 border border-pink-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-pink-600">Total Labs</h3>
            <p className="text-3xl font-bold mt-2">{labs.length}</p>
          </div>
          <div className="bg-pink-100 p-3 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3649/3649468.png"
              alt="labs"
              className="w-10 h-10"
            />
          </div>
        </div>

        <div className="bg-black text-white border border-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-300">Total PCs</h3>
            <p className="text-3xl font-bold mt-2">{pcs.length}</p>
          </div>
          <div className="bg-gray-800 p-3 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2920/2920321.png"
              alt="pcs"
              className="w-10 h-10"
            />
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all p-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Total Students
            </h3>
            <p className="text-3xl font-bold mt-2">{students.length}</p>
          </div>
          <div className="bg-white p-3 rounded-full border">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="students"
              className="w-10 h-10"
            />
          </div>
        </div>
      </div>

 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
   
        <div className="bg-white p-8 border rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            PCs per Lab
          </h2>
          <div className="w-full h-[300px]">
            <Bar
              data={pcPerLabData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: { backgroundColor: "#000", titleColor: "#fff" },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1, color: "#4b5563" },
                    grid: { color: "#e5e7eb" },
                  },
                  x: {
                    ticks: { color: "#4b5563" },
                    grid: { display: false },
                  },
                },
              }}
            />
          </div>
        </div>

       
        <div className="bg-white p-8 border rounded-2xl shadow-md hover:shadow-lg transition-all">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            PC Status Overview
          </h2>
          <div className="w-[70%] mx-auto h-[260px]">
            <Doughnut
              data={pcStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "65%",
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: { color: "#374151", boxWidth: 15, padding: 15 },
                  },
                  tooltip: {
                    backgroundColor: "#111",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
