import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
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

export const GetDoctorAppointments = async (doctorId) => {
    try {

        const querySnapshot = await getDocs(
            query(collection(firestoreDatabase, "appointments"), where("doctorId", "==", doctorId))
        )
        const data = []
        querySnapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
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

export const GetUserAppointments = async (userId) => {
    try {

        const querySnapshot = await getDocs(
            query(collection(firestoreDatabase, "appointments"), where("userId", "==", userId))
        )
        const data = []
        querySnapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
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

export const UpdateAppointmentsStatus = async (id, status, cancellation, link) => {
    try {

        if (status === 'canceled') {
            await updateDoc(doc(firestoreDatabase, "appointments", id),{
                status: status,
                cancellation
            })
        }

        if (link) {
            await updateDoc(doc(firestoreDatabase, "appointments", id),{
                status: status,
                link
            })
        }
        
        
        await updateDoc(doc(firestoreDatabase, "appointments", id),{
            status: status
        })
        return {
            success: true,
            message: "Appointment status updated"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}

export const UpdateAppointmentsIsBefore = async (id) => {
    try {
        
        
        await updateDoc(doc(firestoreDatabase, "appointments", id),{
            isBefore: true
        })
        return {
            success: true,
            message: "M"
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        }
    }
}