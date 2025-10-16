import { useContext, useEffect } from "react";
import { LabContext } from "../context/LabContextProvider";
import { PcContext } from "../context/PcContextProvider";
import { StudentContext } from "../context/StudentContextProvider";
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
        barThickness: 20,
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
    labels: ["Available", "Occupied", "In-Repairing", "Labs", "PCs", "Students"],
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
      {
        label: "Summary",
        data: [labs.length, pcs.length, students.length],
        backgroundColor: ["#f5f5f5", "#d1d5db", "#e5e7eb"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen p-8 text-black">
      <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

      <div className=" w-6/12 p-8 rounded-xl  mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Overview</h2>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-pink-100 text-pink-700 px-5 py-2 rounded-full shadow-sm">
            <span className="font-medium">Labs:</span>
            <span className="font-bold text-lg">{labs.length}</span>
          </div>

          <div className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-full shadow-sm">
            <span className="font-medium">PCs:</span>
            <span className="font-bold text-lg">{pcs.length}</span>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 text-gray-800 px-5 py-2 rounded-full shadow-sm border">
            <span className="font-medium">Students:</span>
            <span className="font-bold text-lg">{students.length}</span>
          </div>
        </div>
      </div>


      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Slim Bar Chart */}
        <div className="p-6 bg-white border rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">PCs per Lab</h3>
          <div className="w-[85%] h-[250px]">
            <Bar
              data={pcPerLabData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true, ticks: { stepSize: 1 } },
                  x: { ticks: { color: "#000" } },
                },
              }}
            />
          </div>
        </div>

        {/* Multi-level Doughnut Chart */}
        <div className="p-6 bg-white border rounded-xl shadow-md flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">PC Status Overview</h3>
          <div className="w-[60%] h-[240px]">
            <Doughnut
              data={pcStatusData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: "60%", // inner hole size
                plugins: {
                  legend: { position: "bottom" },
                  tooltip: { enabled: true },
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