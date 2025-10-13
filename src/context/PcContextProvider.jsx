import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import { LabContext } from "./LabContextProvider";


export const PcContext = createContext();
const PcContextProvider = ({ children }) => {

  const [pcs, setPcs] = useState([]);
  const [flag, setFlag] = useState(false)
  const collectionRefe = collection(db, "pcs")
  const { labs, fetchLab } = useContext(LabContext)
  console.log(labs);

  useEffect(() => {
    fetchPc();
  }, [])
  const addPc = async (pc) => {
    try {
      const pcDateObj = { ...pc, createdAt: new Date() }
      await addDoc(collectionRefe, pcDateObj)
      fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const fetchPc = async () => {
    try {
      const { docs } = await getDocs(collectionRefe)
      const allPcs = docs.map((pc) => {
        return {
          id: pc.id,
          ...pc.data()
        }
      })
      setPcs(allPcs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const deletePc = async (pcId) => {
    try {
      const qury = query(collection(db, "students"), where("pcId", "==", pcId));
      const toUpdateSnapShot = await getDocs(qury);

      const batch = writeBatch(db);
      toUpdateSnapShot.forEach((studentDoc) => {
        batch.update(studentDoc.ref, { pcId: null });
      })
      await batch.commit()

      await deleteDoc(doc(db, "pcs", pcId))
      fetchPc()
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const updatedPc = async (pcId, updatedValue) => {
    try {
      await updateDoc(doc(db, "pcs", pcId), updatedValue);
      fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }


  const showLabName = (labId) => {
    if (labs.length !== 0) {
      const labName = labs.find((lab) => {
        return lab.id == labId
      })
      return labName?.name ? labName?.name : "Not Assigned"
    } else {
      return "Not Assigned"
    }
  }

  const togglePcStatus = async (pcId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "Available" || currentStatus === "Occupied"
          ? "in-Repair"
          : "Available";

      await updateDoc(doc(db, "pcs", pcId), { status: newStatus });
      fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update PC status");
    }
  };

  const value = {
    addPc, pcs, deletePc, updatedPc, showLabName, fetchPc, togglePcStatus
  }

  return (
    <PcContext.Provider value={value}>
      {children}
    </PcContext.Provider>
  )
}

export default PcContextProvider