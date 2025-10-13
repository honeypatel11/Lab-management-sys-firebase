import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { LabContext } from "../../context/LabContextProvider"
import { useNavigate, useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../config/firebase"

const ManageLab = () => {

    const [input, setInput] = useState({
        name: "", capacity: "", location: ""
    })
    const { addLab, updatedLab } = useContext(LabContext);
    const navigate = useNavigate();
    const [isEdit, setIsEdit] = useState(false);
    const { labId } = useParams()
    

    useEffect(() => {
        getLab()
    }, [labId])

    const getLab = async () => {
        let labsnap = await getDoc(doc(db, "labs", labId))
        if (labsnap) {
            setIsEdit(true)
            console.log(labsnap)
            setInput(labsnap.data())
        }
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEdit) {
            if (input.name.trim() === "" || input.capacity.trim() === "" || input.location.trim() === "") {
                toast.error("Enter All Lab Details !")
                return
            }
            await addLab(input);
            navigate("/labs");
            toast.success("Lab Added Successfully !")

        } else {
            if (input.name.trim() === "" || input.capacity.trim() === "" || input.location.trim() === "") {
                toast.error("Enter All Lab Details !")
                return
            }
            await updatedLab(labId, input);
            navigate("/labs");
            toast.success("Lab Updated Successfully !")
        }
    }

    return (
        <div>
            <div className="container mx-auto my-7">
                <h1 className="text-2xl text-center">{isEdit ? "Edit" : "Add"} Lab</h1>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lab Name</label>
                        <input onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="capacity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Capacity</label>
                        <input onChange={handleChange} value={input.capacity} type="capacity" id="capacity" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <input onChange={handleChange} value={input.location} type="location" id="location" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default ManageLab