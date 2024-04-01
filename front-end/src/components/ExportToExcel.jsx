import React from 'react'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';
import { TfiDownload } from "react-icons/tfi";


const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

function ExportToExcel({ csvData, fileName }) {
    var Heading = [
        ["Name", "Time", "Reason", "Status", ],
      ];
      let seeionsInfo = []

      csvData.forEach(element => {
        let m = {
            "Booking ID": element.id,
            Name: element.userName,
            Time: element.slot,
            Status: element.status,
            Advisor: element.doctorName,
            "is Before": element.isBefore , 
            "Booked on": element.bookedOn,
            Via: element.via,

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