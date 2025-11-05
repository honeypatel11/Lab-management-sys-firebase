import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/StudentContextProvider";
import { PcContext } from "../../context/PcContextProvider";

const Student = () => {
  const navigate = useNavigate();
  const { students, showPcName, deleteStudent } = useContext(StudentContext);
  const { showLabName } = useContext(PcContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-10 text-gray-900">
  
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 drop-shadow-sm">
          Student Management
        </h2>
        <button
          onClick={() => navigate("/add-student")}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          + Add New Student
        </button>
      </div>

    
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-200">
        <table className="w-full text-base text-left rounded-lg">
          <thead className="text-sm uppercase bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
            <tr>
              <th className="px-6 py-4">No</th>
              <th className="px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">GRID</th>
              <th className="px-6 py-4">Lab Name</th>
              <th className="px-6 py-4">PC Name</th>
              <th className="px-6 py-4">Assigned Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student, idx) => (
              <tr
                key={student.studentId}
                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-indigo-50 transition-all duration-200"
              >
                <td className="px-6 py-4 font-semibold text-gray-600">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-medium text-indigo-700">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-gray-800">{student.email}</td>
                <td className="px-6 py-4 text-gray-800">{student.grid}</td>
                <td className="px-6 py-4 text-gray-800">
                  {showLabName(student.labId) || "Unassigned"}
                </td>
                <td className="px-6 py-4 text-gray-800">
                  {showPcName(student.pcId) || "Unassigned"}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {student.createdAt?.toDate
                    ? student.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-5">
                  
                    <button
                      onClick={() =>
                        navigate(`/edit-student/${student.studentId}`)
                      }
                      className="hover:scale-110 transition-transform"
                      title="Edit"
                    >
                      <svg
                        className="w-6 h-6 text-indigo-600 hover:text-indigo-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487a2.1 2.1 0 0 1 2.97 2.97l-9.444 9.445-3.713.743.743-3.713 9.444-9.445Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 12.75V19.5A1.5 1.5 0 0 1 18 21H5.25A1.5 1.5 0 0 1 3.75 19.5V6.75A1.5 1.5 0 0 1 5.25 5.25H12"
                        />
                      </svg>
                    </button>

               
                    <button
                      onClick={() => deleteStudent(student.studentId)}
                      className="hover:scale-110 transition-transform"
                      title="Delete"
                    >
                      <svg
                        className="w-6 h-6 text-red-600 hover:text-red-800"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 7h12M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7m-6 0h6m-8 4v8m4-8v8m4-8v8M4 7h16v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7Z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {students.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="text-center py-8 text-gray-500 font-medium"
                >
                  No students found. Click “Add New Student” to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
