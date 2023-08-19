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
            console.log('Dados carregados com sucesso');
            return data;
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error(error);
    }
}

export function trocaPrecos(data) {
    let novosPrecos = [];
    for (let i = 0; i < data.length; i++) {
        if (
            Math.abs(data[i]['PRECO VAREJO'] - data[i]['ULTIMO PRECO']) < 0.1 ||
            data[i]['PRECO VAREJO'] === 0
        ) {
            continue;
        } else {
            novosPrecos.push(data[i]);
        }
    }
    return novosPrecos;
}

export function TabelaPrecos({ trocaPrecos }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Descrição</th>
                    <th>Preço Varejo</th>
                    <th>Último Preço</th>
                </tr>
            </thead>
            <tbody>
                {trocaPrecos.map((item) => (
                    <tr key={item.CODIGO}>
                        <td>{item.CODIGO}</td>
                        <td>{item.DESCRICAO}</td>
                        <td>{item['PRECO VAREJO']}</td>
                        <td>{item['ULTIMO PRECO']}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}