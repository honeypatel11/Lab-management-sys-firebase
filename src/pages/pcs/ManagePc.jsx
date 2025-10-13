import { useContext, useEffect, useState } from "react";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ManagePc = () => {
    const [input, setInput] = useState({
        name: "", labId: ""
    })
    const [isEdit, setIsEdit] = useState(false);
    const { addPc, updatedPc } = useContext(PcContext);
    const { labs } = useContext(LabContext);
    const navigate = useNavigate();
    const { pcId } = useParams();

    useEffect(() => {
        if (pcId) {
            getPc();
        }
    }, [pcId])

    const getPc = async () => {
        let Pcsnap = await getDoc(doc(db, "pcs", pcId))
        if (Pcsnap) {
            setIsEdit(true)
            console.log(Pcsnap)
            setInput(Pcsnap.data())
        }
    }
    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit) {
            if (input.name.trim() === "" || input.labId.trim() === "") {
                toast.error("Enter All PC Details !");
                return
            }
            await addPc(input);
            navigate("/pcs");
            toast.success("PC Added Successfully !");
        } else {
            if (input.name.trim() === "" || input.labId.trim() === "") {
                toast.error("Enter All PC Details !");
                return
            }
            await updatedPc(pcId, input);
            navigate("/pcs");
            toast.success("PC Updated Successfully !");
        }
    }


    return (
        <div>
            <div className="container mx-auto my-7">
                <h1 className="text-2xl text-center">{isEdit ? "Edit" : "Add"} PC</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PC Name</label>
                        <input onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Lab</label>
                        <select onChange={handleChange} value={input.labId ? input.labId : ""} id="labId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required>
                            <option value="">Choose a Lab</option>
                            {
                                labs.map((lab) => {
                                    return <option key={lab.id} value={lab.id}>{lab.name}</option>
                                })
                            }
                        </select>
                    </div>
                   

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ManagePc