import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LabContext } from "../../context/LabContextProvider";

const Lab = () => {
  const navigate = useNavigate();
  const { labs, deleteLab } = useContext(LabContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-10 text-gray-900">
    
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-4xl pb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 drop-shadow-sm">
          Lab Management
        </h2>
        <button
          onClick={() => navigate("/add-lab")}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          + Add New Lab
        </button>
      </div>

    
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-200">
        <table className="w-full text-base text-left rounded-lg">
          <thead className="text-sm uppercase bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
            <tr>
              <th className="px-6 py-4">No</th>
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
                className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-indigo-50 transition-all duration-200"
              >
                <td className="px-6 py-4 font-semibold text-gray-600">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 font-medium text-indigo-700">
                  {lab.name}
                </td>
                <td className="px-6 py-4">{lab.capacity}</td>
                <td className="px-6 py-4">
                  {lab.spaceLeft === 0 ? (
                    <span className="text-red-600 font-semibold">Full</span>
                  ) : (
                    lab.spaceLeft
                  )}
                </td>
                <td className="px-6 py-4 text-gray-700">{lab.location}</td>
                <td className="px-6 py-4 text-gray-600">
                  {lab.createdAt?.toDate
                    ? lab.createdAt.toDate().toLocaleDateString()
                    : "N/A"}
                </td>

              
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-5">
               
                    <Link
                      to={`/edit-lab/${lab.id}`}
                      className="hover:scale-110 transition-transform"
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
                    </Link>

                 
                    <button
                      onClick={() => deleteLab(lab.id)}
                      className="hover:scale-110 transition-transform"
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

            {labs.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500 font-medium"
                >
                  No labs available. Click “Add New Lab” to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lab;
