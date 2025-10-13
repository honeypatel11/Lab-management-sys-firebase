import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"
import { db } from "../config/firebase";
import { PcContext } from "./PcContextProvider";
import { toast } from "react-toastify";

export const StudentContext = createContext();
const StudentContextProvider = ({ children }) => {

  const [students, setStudents] = useState([]);
  const collectionRefer = (collection(db, "students"))
  const { pcs, fetchPc } = useContext(PcContext)

  useEffect(() => {
    fetchStudent()
  }, [])

  const addStudent = async (student) => {
    try {
      const stuDateObj = { ...student, createdAt: new Date() }
      await addDoc(collectionRefer, stuDateObj);
      await updateDoc(doc(db, "pcs", student.pcId), {
        status: "occupied",
      });
      fetchStudent();
      fetchPc();
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const fetchStudent = async () => {
    try {
      const { docs } = await getDocs(collectionRefer);
      const allStudent = docs.map((student) => {
        return {
          studentId: student.id,
          ...student.data()
        }
      })
      setStudents(allStudent);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }


  const deleteStudent = async (studentId) => {
    try {
      await deleteDoc(doc(db, "students", studentId))
      toast.success("Delete Student Successfully !")
      fetchStudent()
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }

  const updateStudent = async (updatedVal, studentId) => {
    try {
      await updateDoc(doc(db, "students", studentId), updatedVal)
      fetchStudent()
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong !")
    }
  }
  const showPcName = (pcId) => {
    if (pcs.length !== 0) {
      const pcName = pcs.find((pc) => {
        return pcId == pc.pcId
      })
      return pcName?.name ? pcName?.name : "Not Assigned";
    } else {
      return "Not Assigned"
    }
  }

  const value = {
    students, addStudent, fetchStudent, showPcName, deleteStudent , updateStudent
  }
  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  )
}

export default StudentContextProvider