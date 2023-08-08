import logo from '/logo.png';
import { HandleFileUpload } from './Functions';

export const Logo = () => {
    return (
        <div className='logo'>
            <img src={logo} alt="Logo" />
            <h1>Utilitário de etiquetas</h1>
        </div>
    )
}

export const FileUpload = () => {
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