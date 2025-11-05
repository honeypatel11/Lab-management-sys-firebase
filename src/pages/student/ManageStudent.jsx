import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";
import { PcContext } from "../../context/PcContextProvider";
import { StudentContext } from "../../context/StudentContextProvider";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const ManageStudent = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    grid: "",
    labId: "",
    pcId: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [filteredPc, setFilteredPc] = useState([]);
  const { labs } = useContext(LabContext);
  const { pcs } = useContext(PcContext);
  const { addStudent, updateStudent } = useContext(StudentContext);
  const { studentId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (input.labId) {
      const filtered = pcs.filter(
        (pc) => pc.labId === input.labId && pc.status.toLowerCase() === "available"
      );
      setFilteredPc(filtered);
    }
  }, [input.labId, pcs]);

  useEffect(() => {
    if (studentId) getStudent();
  }, [studentId]);

  const getStudent = async () => {
    const studentData = await getDoc(doc(db, "students", studentId));
    if (studentData.exists()) {
      setIsEdit(true);
      setInput(studentData.data());
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateStudent(input, studentId);
    } else {
      await addStudent(input);
    }
    navigate("/students");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 p-8">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg p-10 transition-all hover:shadow-pink-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          {isEdit ? "Edit Student" : "Add New Student"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
      
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-800">
              Student Name
            </label>
            <input
              id="name"
              value={input.name}
              onChange={handleChange}
              placeholder="Enter student name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 block w-full p-3 shadow-sm"
              required
            />
          </div>

      
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 shadow-sm"
              required
            />
          </div>

       
          <div>
            <label htmlFor="grid" className="block mb-2 text-sm font-semibold text-gray-800">
              GR No.
            </label>
            <input
              id="grid"
              type="number"
              value={input.grid}
              onChange={handleChange}
              placeholder="Enter GR number"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 block w-full p-3 shadow-sm"
              required
            />
          </div>

         
          <div>
            <label htmlFor="labId" className="block mb-2 text-sm font-semibold text-gray-800">
              Select Lab
            </label>
            <select
              id="labId"
              value={input.labId}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 shadow-sm"
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
            <label htmlFor="pcId" className="block mb-2 text-sm font-semibold text-gray-800">
              Select PC
            </label>
            <select
              id="pcId"
              value={input.pcId}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 block w-full p-3 shadow-sm"
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
            className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 shadow-md transition-all"
          >
            {isEdit ? "Update Student" : "Add Student"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/students")}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            ← Back to Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageStudent;
