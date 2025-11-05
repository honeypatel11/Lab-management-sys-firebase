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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-pink-100 to-purple-100 p-8">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl w-full max-w-lg p-10 transition-all hover:shadow-pink-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">
          {isEdit ? "Edit PC" : "Add New PC"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              PC Name
            </label>
            <input
              onChange={handleChange}
              value={input.name}
              id="name"
              placeholder="Enter PC name"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 block w-full p-3 shadow-sm"
              required
            />
          </div>

      
          <div>
            <label
              htmlFor="labId"
              className="block mb-2 text-sm font-semibold text-gray-800"
            >
              Select Lab
            </label>
            <select
              onChange={handleChange}
              value={input.labId ? input.labId : ""}
              id="labId"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 block w-full p-3 shadow-sm"
              required
            >
              <option value="">Choose a Lab</option>
              {labs.map((lab) =>
                lab.spaceLeft <= 0 ? null : (
                  <option key={lab.id} value={lab.id}>
                    {lab.name}
                  </option>
                )
              )}
            </select>
          </div>

    
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 hover:opacity-90 shadow-md transition-all"
          >
            {isEdit ? "Update PC" : "Add PC"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/pcs")}
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            ← Back to PCs
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagePc;
