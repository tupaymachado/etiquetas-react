import * as XLSX from 'xlsx';
import logo from '/logo.png';

export const Logo = () => {
    return (
        <div className='logo'>
            <img src={logo} alt="Logo" />
            <h1>Utilitário de etiquetas</h1>
        </div>
    )
}

export const FileUpload = () => {
    function HandleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const workbook = XLSX.read(bstr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });
            const headers = data[5];
            data = data.slice(6);
            const jsonData = data.map(row => {
                if (isNaN(row[1])) {
                    return null;
                }
                let obj = {};
                row.forEach((item, index) => {
                    obj[headers[index]] = item;
                });
                return obj;
            }).filter(item => item);
            return (jsonData);
        };
        reader.readAsBinaryString(file);
    }
    
    return (
        <div className='description'>
            <p>Inserir relatório 10449 - Preços Alterados nas últimas 24 horas II em formato .XLS</p>
            <input type="file" onChange={HandleFileUpload} />

        </div>
    )
}

export const FunctionButton = ({ onClick, children }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}