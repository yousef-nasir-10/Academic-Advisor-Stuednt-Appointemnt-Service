import {useState, useEffect} from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';
import { TfiDownload } from "react-icons/tfi";
import { GetDoctorAppointments } from '../API/appointments';
import dayjs from 'dayjs';


const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

function ExportToExcel({ csvData, fileName }) {
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
       getDocAppointments()

    }, [])

    const getDocAppointments = async () => {
        // code here
        const user = JSON.parse(localStorage.getItem("user"))


        const response = await GetDoctorAppointments(user.id)

        if (response.success) {
            setAppointments(response.data)
        }

    }
    var Heading = [
        ["Name", "Time", "Reason", "Status", ],
      ];
      let seeionsInfo = []

      appointments.forEach(element => {
        let m = {
            "Booking ID": element.id,
            "Student Name": element.userName,
            Time: dayjs(`${element.date} ${element.slot}`).format("LLLL"),
            "Booked at": element.bookedOn,
            Status: element.status,
            Advisor: element.doctorName,
            "Session method": element.via,
            "Is canceled": element.cancellation.reason && element.cancellation.reason? true : false,
            "Canceled By": element.cancellation.reason && element.cancellation.canceld_by,
            "Cancel reason": element.cancellation.reason && element.cancellation.reason



        }
        seeionsInfo.push(m)
      });


    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(seeionsInfo);
        // XLSX.utils.sheet_add_aoa(ws, Heading)
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.default(data, fileName + fileExtension);
    }

    return (
        <button
            type="button"
            className="rounded bg-green-500 px-2 py-1 text-sm font-semibold text-white shadow-sm  hover:bg-green-800 flex items-center gap-2"
            onClick={(e) => exportToCSV(csvData,fileName)}
        >
            <TfiDownload className='text-md' /> Excel 
        </button>
    )
}

export default ExportToExcel