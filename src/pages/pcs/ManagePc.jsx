import { useContext, useEffect, useState } from "react";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ManagePc = () => {
    const [input, setInput] = useState({
        name: "",
        labId: "",
    });
    const [isEdit, setIsEdit] = useState(false);
    const { addPc, updatedPc } = useContext(PcContext);
    const { labs } = useContext(LabContext);
    const navigate = useNavigate();
    const { pcId } = useParams();

    useEffect(() => {
        if (pcId) {
            getPc();
        }
    }, [pcId]);

    const getPc = async () => {
        let Pcsnap = await getDoc(doc(db, "pcs", pcId));
        if (Pcsnap.exists()) {
            setIsEdit(true);
            setInput(Pcsnap.data());
        }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input.name.trim() || !input.labId.trim()) {
            toast.error("Enter All PC Details !");
            return;
        }

        if (isEdit) {
            await updatedPc(pcId, input);
            toast.success("PC Updated Successfully !");
        } else {
            await addPc(input);
            toast.success("PC Added Successfully !");
        }

        navigate("/pcs");
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
            <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-black">
                    {isEdit ? "Edit PC" : "Add New PC"}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            PC Name
                        </label>
                        <input
                            onChange={handleChange}
                            value={input.name}
                            id="name"
                            placeholder="Enter PC name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="labId"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Select Lab
                        </label>
                        <select
                            onChange={handleChange}
                            value={input.labId ? input.labId : ""}
                            id="labId"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
                            required
                        >
                            <option value="">Choose a Lab</option>
                            {labs.map((lab) => {
                                return lab.spaceLeft <= 0 ? ""
                                    : <option key={lab.id} value={lab.id}>
                                        {lab.name}
                                    </option>
                            }
                            )}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition"
                    >
                        {isEdit ? "Update PC" : "Add PC"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ManagePc;