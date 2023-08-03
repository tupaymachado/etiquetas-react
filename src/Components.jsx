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
    return (
        <div className='description'>
            <p>Inserir relatório 10449 - Preços Alterados nas últimas 24 horas II em formato .XLS</p>
            <input type="file" id="file" name="file" />
        </div>
    )
}

export const FunctionsButtons = () => { //fazer returnar apenas 1 botão, que vai ser editado conforme cada caso no App.jsx
    return (
        <div className='functions'>
            <button className='btn' onClick=''>Gerar etiquetas</button>
            <button className='btn'>Limpar</button>
        </div>
    )
}