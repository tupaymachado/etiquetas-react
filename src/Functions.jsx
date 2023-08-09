import * as XLSX from 'xlsx'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js"
import { getDatabase, ref, /* update, */ get } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";


const firebaseConfig = {
    apiKey: "AIzaSyAuMfOV837qsMnZ03p4lXIP_L-iwgJVAYk",
    authDomain: "showroom-a1c9c.firebaseapp.com",
    databaseURL: "https://showroom-a1c9c-default-rtdb.firebaseio.com",
    projectId: "showroom-a1c9c",
    storageBucket: "showroom-a1c9c.appspot.com",
    messagingSenderId: "624653028139",
    appId: "1:624653028139:web:e8cba7f3b8d6ade19dd36e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dbRef = ref(database, 'showroom');

export async function fetchData() {
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            window.showroom = data;
            console.log('Dados carregados com sucesso')
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

export function HandleFileUpload(event) {
    console.log('HandleFileUpload chamado')
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
        console.log(jsonData)
        intersec(jsonData)
    };
    reader.readAsBinaryString(file);
}

export function intersec(jsonData) {
    console.log('intersec chamado')
    let intersec = [];
    let showroom = window.showroom;
    for (let i = 0; i < jsonData.length; i++) {
        for (let j = 0; j < showroom.length; j++) {
            if (jsonData[i]['Cód. Produto'] === showroom[j].CODIGO) {
                let obj = { ...showroom[j] };
                obj['PRECO VAREJO'] = jsonData[i]['Preço Varejo'];
                if (jsonData[i].Status === 'PRORROGADO PROMO' || jsonData[i].Status === 'EM PROMO') {
                    obj['STATUS'] = true;
                } else {
                    obj['STATUS'] = false;
                }
                intersec.push(obj);
            }
        }
    }
    console.log(intersec)
    window.intersec = intersec;
}

export function trocaPrecos() {
    let trocaPrecos = [];
    for (let i = 0; i < window.intersec.length; i++) {
        if (Math.abs(window.intersec[i]['PRECO VAREJO'] - window.intersec[i]['ULTIMO PRECO']) < 0.1 || window.intersec[i]['PRECO VAREJO'] === 0) {
            continue;            
        } else {
            trocaPrecos.push(window.intersec[i]);
        }
    }
    montarTabela(trocaPrecos);
}

export function montarTabela(trocaPrecos) {
    let tabela = document.getElementById('tabela');
    tabela.innerHTML = '';
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.innerText = 'Código';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Descrição';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Preço Varejo';
    tr.appendChild(th);
    th = document.createElement('th');
    th.innerText = 'Último Preço';
    tr.appendChild(th);
    thead.appendChild(tr);
    tabela.appendChild(thead);
    let tbody = document.createElement('tbody');
    for (let i = 0; i < trocaPrecos.length; i++) {
        tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerText = trocaPrecos[i].CODIGO;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = trocaPrecos[i].DESCRICAO;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = trocaPrecos[i]['PRECO VAREJO'];
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerText = trocaPrecos[i]['ULTIMO PRECO'];
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    tabela.appendChild(tbody);
}