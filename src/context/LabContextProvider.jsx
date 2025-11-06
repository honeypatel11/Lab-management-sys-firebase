import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
import { createContext, useEffect, useState } from "react"
import { db } from "../config/firebase"
import { toast } from "react-toastify";


export const LabContext = createContext();
const LabContextProvider = ({ children }) => {

  const [labs, setLabs] = useState([]);
  const collectionRefe = collection(db, "labs");

  useEffect(() => {
    fetchLab();
  }, [])

  const addLab = async (lab) => {
    try {
      const { capacity, ...data } = lab
      const dateobj = { ...data,
        capacity: Number(capacity), 
        createdAt: new Date(),
        spaceLeft: Number(capacity) 
      }
      await addDoc(collectionRefe, dateobj)
      fetchLab();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const fetchLab = async () => {
    try {
      const { docs } = await getDocs(collectionRefe)
      const allLabs = docs.map((lab) => {
        return {
          id: lab.id,
          ...lab.data()
        }
      })
      setLabs(allLabs)
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const deleteLab = async (labId) => {
    try {
      const qury = query(collection(db, "pcs"), where("labId", "==", labId));
      const toUpdateSnapShot = await getDocs(qury);

      const batch = writeBatch(db);
      toUpdateSnapShot.forEach((pcDoc) => {
        batch.update(pcDoc.ref, { labId: null })
      })
      await batch.commit();

      await deleteDoc(doc(db, "labs", labId))
      fetchLab()
      toast.error("delete successfully !")
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const updatedLab = async (labId, updateValue) => {
    try {
      await updateDoc(doc(db, "labs", labId), updateValue)
      fetchLab()
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const value = {
    addLab, labs, deleteLab, updatedLab, fetchLab
  }

  return (
    <LabContext.Provider value={value}>
      {children}
    </LabContext.Provider>
  )
}

export default LabContextProvider;