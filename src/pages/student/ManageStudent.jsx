import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { StudentContext } from "../../context/StudentContextProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ManageStudent = () => {

  const [input, setInput] = useState({
    name: "", email: "", grid: "", labId: "", pcId: ""
  });
  const [isEdit, setIsEdit] = useState();
  const [filteredPc, setFilteredPc] = useState([])
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { addStudent, updateStudent } = useContext(StudentContext);
  const { studentId } = useParams()
  const navigate = useNavigate();


  useEffect(() => {
    if (input.labId) {
      const filteredPc = pcs.filter(
        (pc) => pc.labId === input.labId && pc.status.toLowerCase() === "available"
      );
      setFilteredPc(filteredPc);
    }
  }, [input.labId, pcs]);

  useEffect(() => {
    if (studentId) {
      getStudent()
    }
  }, [studentId])

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isEdit) {
      await addStudent(input)
      navigate("/students")
    } else {
      await updateStudent(input, studentId)
      navigate("/students")
    }
  }
  const getStudent = async () => {
    const studentData = await getDoc(doc(db, "students", studentId))
    if (studentData.exists()) {
      setIsEdit(true)
      setInput(studentData.data())
    }
  }

  return (
    <div>
      <div className="container mx-auto my-7">
        <h1 className="text-2xl text-center">{isEdit ? "Edit" : "Add"} Student</h1>
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
            <input onChange={handleChange} value={input.name} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input onChange={handleChange} value={input.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="grid" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">GR NO.</label>
            <input onChange={handleChange} value={input.grid} type="number" id="grid" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-5">
            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Lab</label>
            <select onChange={handleChange} value={input.labId} id="labId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required>
              <option value="">Choose a Lab</option>
              {
                labs.map((lab) => {
                  return <option key={lab.id} value={lab.id}>{lab.name}</option>
                })
              }
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="pcId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select PC</label>
            <select onChange={handleChange} value={input.pcId} id="pcId" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " required>
              <option value="">Choose a PC</option>
              {
                filteredPc.map((pc) => {
                  return <option key={pc.pcId} value={pc.pcId}>{pc.name}</option>
                })
              }
            </select>
          </div>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            {!isEdit ? "Add" : "Update"} Student </button>
        </form>
      </div>
    </div>
  )
}

export default ManageStudent