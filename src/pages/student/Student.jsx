import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { StudentContext } from "../../context/StudentContextProvider";
import { PcContext } from "../../context/PcContextProvider";

const Student = () => {

  const navigate = useNavigate();
  const { students , showPcName , deleteStudent} = useContext(StudentContext);
  const { showLabName } = useContext(PcContext);

  return (
    <div className="bg-gray-800">
      <div className="container mx-auto h-screen">
        <div className="flex align-center justify-between px-10 py-10">
          <h1 className="text-white text-3xl fw-semibold">Add Student</h1>
          <button onClick={() => navigate("/add-student")} className="border text-white rounded px-3">Add Student +</button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  GRID
                </th>
                <th scope="col" className="px-6 py-3">
                  Lab Name
                </th>
                <th scope="col" className="px-6 py-3">
                  PC Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Assigned Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {
                students.map((student, idx) => {
                  return <tr key={student.studentId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">
                      {student.name}
                    </td>
                    <td className="px-6 py-4">
                      {student.email}
                    </td>
                    <td className="px-6 py-4">
                      {student.grid}
                    </td>
                    <td className="px-6 py-4">
                      {showLabName(student.labId) || "Unassigned"}
                    </td>
                    <td className="px-6 py-4">
                      {showPcName(student.pcId) || "Unassigned"}
                    </td>
                    <td className="px-6 py-4">
                      {student.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <button onClick={() => navigate(`/edit-student/${student.studentId}`)} className="font-medium text-green-600 dark:text-green-500 hover:underline">Edit</button>
                      <button onClick={() => deleteStudent(student.studentId)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Student