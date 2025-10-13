
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";
import { ToggleLeft, ToggleRight } from "lucide-react";

const Pc = () => {
    const navigate = useNavigate();
    const { pcs, deletePc, showLabName, togglePcStatus } = useContext(PcContext);
    const { labs } = useContext(LabContext);

    return (
        <div className="bg-gray-100 min-h-screen p-10 text-black">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">PC Details</h2>
                <button
                    onClick={() => navigate("/add-pc")}
                    className="px-6 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition">
                    + Add PC
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-base text-left bg-white rounded-lg">
                    <thead className="text-sm uppercase bg-black text-gray-50">
                        <tr>
                            <th className="px-6 py-4">No</th>
                            <th className="px-6 py-4">PC Name</th>
                            <th className="px-6 py-4">Lab Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Created At</th>
                            <th className="px-6 py-4">Toggle / Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcs.map((pc, idx) => (
                            <tr
                                key={pc.id}
                                className="bg-white border-b border-gray-300 hover:bg-gray-50">
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4 font-medium">{pc.name}</td>
                                <td className="px-6 py-4">{showLabName(pc.labId)}</td>
                                <td className="px-6 py-4 capitalize">{pc.status}</td>
                                <td className="px-6 py-4">
                                    {pc.createdAt.toDate().toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-4">
                                    {pc.status === "Available" || pc.status === "Occupied" ? (
                                        <ToggleRight
                                            size={22}
                                            className="cursor-pointer text-green-600 hover:text-green-800 text-3xl"
                                            onClick={() => togglePcStatus(pc.id, pc.status)}/>
                                    ) : (
                                        <ToggleLeft
                                            size={22}
                                            className="cursor-pointer text-yellow-600 hover:text-yellow-800 text-3xl"
                                            onClick={() => togglePcStatus(pc.id, pc.status)}/>
                                    )}

                                    <button
                                        onClick={() => navigate(`/edit-pc/${pc.id}`)}
                                        className="text-blue-600 font-medium hover:underline">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deletePc(pc.id)}
                                        className="text-red-600 font-medium hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Pc;
