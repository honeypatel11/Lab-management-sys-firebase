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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 p-8">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg p-10 transition-all hover:shadow-pink-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          {isEdit ? "Edit Lab" : "Add New Lab"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Lab Name
            </label>
            <input
              onChange={handleChange}
              value={input.name}
              id="name"
              placeholder="Enter lab name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 block w-full p-3 shadow-sm"
              required
            />
          </div>


          <div className={`${isEdit ? "hidden" : "block"}`}>
            <label
              htmlFor="capacity"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Capacity
            </label>
            <input
              onChange={handleChange}
              value={input.capacity}
              id="capacity"
              placeholder="Enter capacity"
              className={` bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 shadow-sm `}
              required
            />
          </div>


          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Location
            </label>
            <input
              onChange={handleChange}
              value={input.location}
              id="location"
              placeholder="Enter location"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-purple-400 block w-full p-3 shadow-sm"
              required
            />
          </div>


          <button
            type="submit"
            className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 shadow-md transition-all"
          >
            {isEdit ? "Update Lab" : "Add Lab"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/labs")}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            ← Back to Labs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageLab;
