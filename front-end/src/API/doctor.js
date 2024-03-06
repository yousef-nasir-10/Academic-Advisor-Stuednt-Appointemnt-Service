import { addDoc, collection, getDoc } from "firebase/firestore"
import firestoreDatabase from "../firebaseConfig"
export const AddDoctor = async (payload) => {
    try {
        await addDoc(collection(firestoreDatabase, "doctors"), payload)
        return {
            success: true,
            message: "Doctor added successfully, please wait for approval"
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const GetDoctorById = async (id) =>{
    try {
        const doctor = await getDoc(doc(firestoreDatabase, "doctors", id))
        if (!doctor.exists) {
            throw new Error ("Doctor not found")
        }
        return{
            success: true,
            data: doctor.data()
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}