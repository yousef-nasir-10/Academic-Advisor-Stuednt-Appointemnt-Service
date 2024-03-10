import { addDoc, collection } from "firebase/firestore"
import firestoreDatabase from "../firebaseConfig"



export const BookAppointment = async (payload) => {
    try {
        await addDoc(collection(firestoreDatabase, "appointments"), payload)
        return {
            success: true,
            message: "appointment booked successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}