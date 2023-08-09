import './App.css'
import { Logo, FileUpload, FunctionButton } from './Components.jsx'
import { fetchData, trocaPrecos, montarTabela } from './Functions.jsx'

fetchData();

const function3 = () => {
  console.log("Função 3 chamada");
}
const function2 = () => {
  console.log("Função 2 chamada");
}

function App() {
  return (
    <>
      <Logo />

      <FileUpload />

      {/* <FunctionButton onClick={updatePrices}>Atualizar preços</FunctionButton> */}
      <FunctionButton onClick={trocaPrecos}>Trocas de preços</FunctionButton>
      <FunctionButton onClick={function2}>Encerramento de promoções</FunctionButton>
      <FunctionButton onClick={function3}>Promoções ativas</FunctionButton>
      <FunctionButton onClick={function3}>Atualizar preços</FunctionButton>

      <table id='tabela'>
      </table>
    </>
  )
}

export default App;
