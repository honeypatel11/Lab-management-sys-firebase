import { addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc, where, writeBatch } from "firebase/firestore";
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
      const pcDateObj = { ...pc, createdAt: new Date(), status: "Available" }
      await addDoc(collectionRefe, pcDateObj)
      await updateDoc(doc(db, 'labs', pc.labId), {
        spaceLeft: increment(-1)
      })
      fetchPc();
      fetchLab();
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
      toast.error("delete successfully !")
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
      const lab = labs.find((lab) => lab.id == labId);
      if (lab) {
        return lab.name;
      }
    }
    return null;
  };


  const changeStateToRepair = async (id) => {
    try {

      const pcsRef = doc(db, "pcs", id);
      await updateDoc(pcsRef, {
        status: "In-Repairing",
        updatedAt: new Date(),
      });


      const studentQuery = query(
        collection(db, "students"),
        where("id", "==", id)
      );
      const studentSnap = await getDocs(studentQuery);


      const batch = writeBatch(db);
      studentSnap.forEach((studentDoc) => {
        batch.update(studentDoc.ref, {
          pcName: "Not Assigned",
          labName: "Not Assigned",
          pcid: null,
          updatedAt: new Date(),
        });
      });

      await batch.commit();

      toast.success("PC marked as In-Repairing & students unassigned");
      fetchPc();
    } catch (error) {
      console.error("Error changing state to repair:", error);
      toast.error("Something Went Wrong");
    }
  };


  const changeStateToAvailable = async (id) => {
    try {
      const pcsRef = doc(db, "pcs", id);
      await updateDoc(pcsRef, {
        status: "Available",
        updatedAt: new Date(),
      });

      toast.success("pcs marked as Available");
      fetchPc();
    } catch (error) {
      console.error("Error changing state to available:", error);
      toast.error("Something Went Wrong");
    }
  };


  const value = {
    addPc, pcs, deletePc, updatedPc, showLabName, fetchPc, changeStateToRepair, changeStateToAvailable
  }

  return (
    <PcContext.Provider value={value}>
      {children}
    </PcContext.Provider>
  )
}

export default PcContextProvider;