import * as XLSX from 'xlsx';

export function HandleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
        // Parse data
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });

        // Get first worksheet
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];

        // Convert array of arrays
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

        // Use data (this is an array of objects)
        console.log(data);
    };

    reader.readAsBinaryString(file);
}
