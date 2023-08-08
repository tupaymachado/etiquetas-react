import './App.css'
import { Logo, FileUpload, FunctionButton } from './Components.jsx'
import { fetchData } from './Functions.jsx'

fetchData();

const function3 = () => {
  console.log("Função 3 chamada");
}
const function2 = () => {
  console.log("Função 2 chamada");
}
const function1 = () => {
  console.log("Função 1 chamada");
}

function App() {
  return (
    <>
      <Logo />

      <FileUpload />

      {/* <FunctionButton onClick={updatePrices}>Atualizar preços</FunctionButton> */}
      <FunctionButton onClick={function1}>Trocas de preços</FunctionButton>
      <FunctionButton onClick={function2}>Encerramento de promoções</FunctionButton>
      <FunctionButton onClick={function3}>Promoções ativas</FunctionButton>
      <FunctionButton onClick={function3}>Atualizar preços</FunctionButton>
    </>
  )
}

export default App;
