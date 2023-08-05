/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg' */
import './App.css'
import { Logo, FileUpload, FunctionButton } from './Components.jsx';
import { HandleFileUpload } from './Functions.jsx';

const function1 = () => {
  console.log("Função 1 chamada");
}

const function2 = () => {
  console.log("Função 2 chamada");
}

const function3 = () => {
  console.log("Função 3 chamada");
}

function App() {
  return (
    <>
      <Logo />

      {/* <FileUpload /> */}

      <div>
        <input type="file" onChange={HandleFileUpload} />
      </div>

      <FunctionButton onClick={function1}>Trocas de preços</FunctionButton>
      <FunctionButton onClick={function2}>Encerramento de promoções</FunctionButton>
      <FunctionButton onClick={function3}>Promoções ativas</FunctionButton>
    </>
  )
}

export default App;
