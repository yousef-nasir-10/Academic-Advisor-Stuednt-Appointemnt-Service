import firestoreDatabase from "../firebaseConfig"
import {collection, addDoc, getDocs, query, where} from 'firebase/firestore'
import CryptoJS from 'crypto-js';

let encDecString= "fjjfsghhb"

export const CreateUser = async (payload) => {
    try {

        // check if user already exisit using email 
        const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email))
        const querySnapshot = await getDocs(qry)

        if(querySnapshot.size > 0 ){
            throw new Error("user already exists")
        }

        //hash password
        const hashedPassword = CryptoJS.AES.encrypt(
            payload.password,
            encDecString
        ).toString()

        payload.password = hashedPassword


        const docRef = collection(firestoreDatabase, "users")
        await addDoc(docRef, payload)
        return {
            success: true,
            message: "User has been created"
        }
    } catch (error) {
        return error
    }
}

export const LoginUser = async (payload) => {
    try {
        const qry = query(collection(firestoreDatabase, "users"), where("email", "==", payload.email))
        const querySnapshot = await getDocs(qry)

        if(querySnapshot.size == 0 ){
            throw new Error("user does not exist")
        }

        // decrypt password
        
        const user = querySnapshot.docs[0].data()
        user.id = querySnapshot.docs[0].id
        const bytes = CryptoJS.AES.decrypt(
            user.password,
            encDecString
        )
        const orginalPassword = bytes.toString(CryptoJS.enc.Utf8)

        if(orginalPassword != payload.password ){
            throw new Error("Incoorect password")
        }

        return {
            success: true, 
            message: "User logged in seccessfully",
            data: user
        }



    } catch (error) {
        return error
    }
}

export const GetAllUsers = async () => {
    try {
        const users = await getDocs(collection(firestoreDatabase, "users"))
        return {
            success: true,
            data: users.docs.map((doc) => {
                return {
                    ...doc.data(),
                    id: doc.id,
                }
            })
        }
    } catch (error) {
        return{
            success: false,
            message: error.message
        }
    }
}