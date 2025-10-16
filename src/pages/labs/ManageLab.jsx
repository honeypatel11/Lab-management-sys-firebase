
import { toast } from "react-toastify";
import { LabContext } from "../../context/LabContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useContext, useEffect, useState } from "react";

const ManageLab = () => {
    const [input, setInput] = useState({
        name: "",
        capacity: "",
        location: "",
    });
    const { addLab, updatedLab } = useContext(LabContext);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const { labId } = useParams();

    useEffect(() => {
        if (labId) {
            getLab();
        }
    }, [labId]);

    const getLab = async () => {
        let labsnap = await getDoc(doc(db, "labs", labId));
        if (labsnap.exists()) {
            setIsEdit(true);
            setInput(labsnap.data());
        }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.name.trim() || !input.capacity.trim() || !input.location.trim()) {
            toast.error("Enter All Lab Details !");
            return;
        }

        if (isEdit) {
            await updatedLab(labId, input);
            toast.success("Lab Updated Successfully !");
        } else {
            await addLab(input);
            toast.success("Lab Added Successfully !");
        }

        navigate("/labs");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-black">
                    {isEdit ? "Edit Lab" : "Add New Lab"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Lab Name
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.name}
                            id="name"
                            placeholder="Enter lab name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="capacity"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Capacity
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.capacity}
                            id="capacity"
                            placeholder="Enter capacity"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="location"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Location
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.location}
                            id="location"
                            placeholder="Enter location"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                        {isEdit ? "Update Lab" : "Add Lab"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManageLab;