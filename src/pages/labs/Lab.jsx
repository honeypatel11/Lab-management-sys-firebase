import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";

const Lab = () => {
    const navigate = useNavigate();
    const { labs, deleteLab } = useContext(LabContext);

    return (
        <div className="bg-gray-100 min-h-screen p-10 text-black">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Lab Management</h2>
                <button
                    onClick={() => navigate("/add-lab")}
                    className="px-6 py-2 rounded bg-black text-white font-semibold hover:bg-gray-800 transition"
                >
                    + Add New Lab
                </button>
            </div>

            <div className="relative overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full text-base text-left bg-white rounded-lg">
                    <thead className="text-sm uppercase bg-black text-gray-50">
                        <tr>
                            <th className="px-6 py-4">NO</th>
                            <th className="px-6 py-4">Lab Name</th>
                            <th className="px-6 py-4">Capacity</th>
                            <th className="px-6 py-4">Remaining Space</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Assigned Date</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {labs.map((lab, idx) => (
                            <tr
                                key={lab.id}
                                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4">{idx + 1}</td>
                                <td className="px-6 py-4 font-medium">{lab.name}</td>
                                <td className="px-6 py-4">{lab.capacity}</td>
                                <td className="px-6 py-4">{lab.spaceLeft == 0? "full": lab.spaceLeft}</td>
                                <td className="px-6 py-4">{lab.location}</td>
                                <td className="px-6 py-4">
                                    {lab.createdAt?.toDate
                                        ? lab.createdAt.toDate().toLocaleDateString()
                                        : "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <Link
                                            to={`/edit-lab/${lab.id}`}
                                            className="text-[#014e4e] font-semibold hover:underline"
                                        >
                                            <svg className="w-6 h-6 text-[#014e4e]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                                            </svg>
                                        </Link>

                                        <button onClick={() => deleteLab(lab.id)} className="text-red-600 hover:underline font-semibold">
                                            <svg  className="w-6 h-6 text-red-600"  aria-hidden="true"  xmlns="http://www.w3.org/2000/svg"  fill="none"  viewBox="0 0 24 24">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Lab;