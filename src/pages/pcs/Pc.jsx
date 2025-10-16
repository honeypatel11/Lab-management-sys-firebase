import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { PcContext } from "../../context/PcContextProvider";
import { LabContext } from "../../context/LabContextProvider";

const Pc = () => {
    const navigate = useNavigate();
    const { pcs, deletePc, showLabName, changeStateToRepair, changeStateToAvailable } = useContext(PcContext);
    const { labs } = useContext(LabContext);

    return (
        <div className="bg-gray-100 min-h-screen p-10 text-black">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">PC Details</h2>
                <button
                    onClick={() => navigate("/add-pc")}
                    className="px-6 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition"
                >
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
                            <th className="px-6 py-4">Actions</th>
                            <th className="px-6 py-4">Toggle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcs.map((pc, idx) => (
                            <tr
                                key={pc.id}
                                className="bg-white border-b border-gray-300 hover:bg-gray-50"
                            >
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4 font-medium">{pc.name}</td>
                                <td className="px-6 py-4">{showLabName(pc.labId)}</td>
                                <td className="px-6 py-4 capitalize">{pc.status}</td>
                                <td className="px-6 py-4">
                                    {pc.createdAt.toDate().toLocaleDateString()}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex  gap-4">

                                        <button
                                            onClick={() => navigate(`/edit-pc/${pc.id}`)}
                                            className="text-[#014e4e] font-semibold hover:underline"
                                        >
                                            <svg
                                                className="w-6 h-6 text-[#014e4e]"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            onClick={() => deletePc(pc.id)}
                                            className="text-red-600 hover:underline font-semibold"
                                        >
                                            <svg
                                                className="w-6 h-6 text-red-600"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>

                                <td>
                                    {pc.status !== "In-Repairing" ? (
                                        <button
                                            className="font-medium text-yellow-600 hover:underline"
                                            onClick={() => changeStateToRepair(pc.id)}
                                        >
                                            Go To Repair
                                        </button>
                                    ) : (
                                        <button
                                            className="font-medium text-yellow-600 hover:underline"
                                            onClick={() => changeStateToAvailable(pc.id)}
                                        >
                                            Make Available
                                        </button>
                                    )}
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