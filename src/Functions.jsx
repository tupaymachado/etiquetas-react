import * as XLSX from 'xlsx';

export function HandleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
        // Parse data
        const bstr = evt.target.result;
        const workbook = XLSX.read(bstr, { type: 'binary' });
        // Get first worksheet
        const sheetName = workbook.SheetNames[0];
        // Converta a planilha em JSON
        let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
        // A linha 6 contém os cabeçalhos (índice 5 porque os arrays começam em 0)
        const headers = data[5];
        // Remova as linhas antes e incluindo a linha 6
        data = data.slice(6);
        const jsonData = data.map(row => {
            // Verifique se o primeiro valor da linha é um número
            if (isNaN(row[1])) {
                return null;
            }
            let obj = {};
            row.forEach((item, index) => {
                obj[headers[index]] = item;
            });
            return obj;
        }).filter(item => item);
        console.log(jsonData);
    };

    reader.readAsBinaryString(file);
}
