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
  const [isEdit, setIsEdit] = useState(false);
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
    if (studentId) getStudent()
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
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-10">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Student Name
            </label>
            <input
              onChange={handleChange}
              value={input.name}
              id="name"
              placeholder="Enter student name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              onChange={handleChange}
              value={input.email}
              type="email"
              id="email"
              placeholder="Enter email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="grid" className="block mb-2 text-sm font-medium text-gray-900">
              GR NO.
            </label>
            <input
              onChange={handleChange}
              value={input.grid}
              type="number"
              id="grid"
              placeholder="Enter GR NO."
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              required
            />
          </div>

          <div>
            <label htmlFor="labId" className="block mb-2 text-sm font-medium text-gray-900">
              Select Lab
            </label>
            <select
              onChange={handleChange}
              value={input.labId}
              id="labId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              required
            >
              <option value="">Choose a Lab</option>
              {labs.map((lab) => (
                <option key={lab.id} value={lab.id}>
                  {lab.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="pcId" className="block mb-2 text-sm font-medium text-gray-900">
              Select PC
            </label>
            <select
              onChange={handleChange}
              value={input.pcId}
              id="pcId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
              required
            >
              <option value="">Choose a PC</option>
              {filteredPc.map((pc) => (
                <option key={pc.id} value={pc.id}>
                  {pc.name}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition"
          >
            {isEdit ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ManageStudent;