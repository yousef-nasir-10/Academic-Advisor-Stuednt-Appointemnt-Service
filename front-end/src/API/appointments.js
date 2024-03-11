import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
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

export const GetDoctorAppointmentsOnDate = async (doctorId, date) => {

    try {
        const querySnapshot = await getDocs(
            query(
                collection(firestoreDatabase, "appointments"),
                where("doctorId", "==", doctorId),
                where("date", "==", date)
            )
        )
        const data = []
        querySnapshot.forEach(doc => {
            data.push(doc.data())
        })
    
        return {
            success: true,
            data
        }
        
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }

}