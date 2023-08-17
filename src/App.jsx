import React, { useState, useEffect } from 'react';
import './App.css'
import { Logo, FileUpload, FunctionButton } from './Components.jsx'
import { TabelaPrecos, fetchData, trocaPrecos } from './Functions.jsx'


function App() {
  const [database, setDatabase] = useState([]); // Adicionamos um estado para armazenar os dados do database
  const [intersec, setIntersec] = useState([]); // Vai guardar os dados da intersecção, que vai ser criada quando ocorrer o upload do relatório

  useEffect(() => {
    fetchData().then((data) => { // Chamamos fetchData dentro de um useEffect
      setDatabase(data); // Atualizamos o estado com os dados retornados
    });
  }, []); // O array vazio como segundo argumento significa que isso será executado apenas na montagem do componente

  const handleTrocaPrecos = () => {
    const novosPrecos = trocaPrecos(database); // Chamamos trocaPrecos com os dados atuais
    setData(novosPrecos); // Atualizamos o estado com os novos preços
  }

  return (
    <>
      <Logo />

      <FileUpload />

      <FunctionButton onClick={handleTrocaPrecos}>Trocas de preços</FunctionButton>
      <FunctionButton onClick={() => console.log("Função 2 chamada")}>Encerramento de promoções</FunctionButton>
      <FunctionButton onClick={() => console.log("Função 3 chamada")}>Promoções ativas</FunctionButton>
      <FunctionButton onClick={() => console.log("Função 3 chamada")}>Atualizar preços</FunctionButton>

      {/* <TabelaPrecos trocaPrecos={data} /> {/* Passamos o estado para TabelaPrecos */}
    </>
  )
}

export default App;