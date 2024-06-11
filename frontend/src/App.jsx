import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import axios from 'axios';
import { toast } from 'react-toastify';

function App() {
  const [csvLines, setCsvLines] = useState([]);
  const [rawCsvContent, setRawCsvContent] = useState([]);
  const [delimiterValue, setDelimiterValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [jsonContent, setJsonContent] = useState(null);
  const notifyEmptyFile = () => toast.warning('No se ha seleccionado un archivo CSV');
  const notifyEmptyDelimeter = () => toast.warning('El delimitador solamente puede ser una coma o un punto y coma');
  const notifyEmptyPassword = () => toast.warning('La clave no puede estar vacía'); 
  const notifyEmptyUpload1 = () => toast.warning('No se ha subido ningun archivo, no se puede copiar nada');
  const notifyEmptyUpload2 = () => toast.warning('No se ha subido ningun archivo, no se puede descargar nada');


  const onSeparatorChange = ({ target }) => {
    setDelimiterValue(target.value);
    console.log(delimiterValue)
  };

  const onPasswordChange = ({ target }) => {
    setPasswordValue(target.value);
    console.log(passwordValue)
  };

  const onInputClick = (event) => {
    event.target.value = '';
    setCsvLines([]);
    setRawCsvContent('');
    setJsonContent(null);
  };

 

  const handleCsvView = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split('\n')
          .map(line => line.split(','))
          .filter(line => line.some(cell => cell.trim() !== "")); // Filtra las líneas vacías
        let rawCsv = lines.map(row => row.join(',')).join('\n');
        let rows = lines.slice(1);
        let linesArray = rows.map(row => row.join(','));
        setRawCsvContent(rawCsv);
        setCsvLines(linesArray);
        console.log(linesArray);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    if(jsonContent==null){
      notifyEmptyUpload1();
      return;
    }
    navigator.clipboard.writeText(JSON.stringify(jsonContent, null, 2))
    .then(() => {
      toast.success('JSON copiado al portapapeles');
    })
    .catch((error) => {
      console.error('Error copying JSON to clipboard:', error);
      toast.error('Error al copiar JSON al portapapeles');
    }); 
  }

  const handleDownload = () => {
    if(jsonContent==null){
      notifyEmptyUpload2();
      return;
    }
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (csvLines.length === 0) {
      notifyEmptyFile();
      return;
    }
    if (delimiterValue ==! ';' || delimiterValue ==! ',') {
      notifyEmptyDelimeter();
      return;
    }
    if (passwordValue === '') {
      notifyEmptyPassword();
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/upload/parse', {
        data: csvLines,
        delimiter: delimiterValue,
        cipherKey: passwordValue,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(csvLines, delimiterValue, passwordValue);
      console.log('Response:', response.data);
      setJsonContent(response.data);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };


  return (
    <div className="w-full flex items-center justify-evenly mt-5">
      <div className="flex flex-col bg-honeydew rounded-2xl p-6 w-full max-w-4xl shadow-lg">
        <h1 className="font-bold text-3xl pb-5 text-center">Generador de JSON</h1>
        <div className="flex flex-col md:flex-row justify-evenly mb-6 w-full gap-4">
          <div className="flex flex-col justify-center w-full md:w-1/3 mb-4 md:mb-0">
            <label className="font-bold mb-2">Escoja su archivo CSV</label>
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" accept=".csv" onChange={handleCsvView} onClick={onInputClick}/>
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/3 mb-4 md:mb-0">
            <label className="font-bold mb-2">Inserte delimitador a utilizar</label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={delimiterValue}
              onChange={onSeparatorChange}
            />
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/3">
            <label className="font-bold mb-2">Clave / Password</label>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={passwordValue}
              onChange={onPasswordChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-bold text-xl mb-2">Contenido del archivo subido CSV</h2>
          <SyntaxHighlighter language="csv" style={dark}>
            {rawCsvContent}
          </SyntaxHighlighter>
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <h2 className="font-bold text-xl mb-2">Contenido del archivo generado JSON</h2>
          <SyntaxHighlighter language="json" style={dark}>
            {jsonContent === null ? '' : JSON.stringify(jsonContent, null, 2)}
          </SyntaxHighlighter>
        </div>
        <div className="flex justify-center gap-5">
          <button onClick={handleSubmit} className="btn ">
            Enviar a la API
          </button>
          {/* TODO: Here goes handleDownload */}
          <button onClick={handleCopy} className='btn'>
            Copiar JSON
          </button>
          <button onClick={handleDownload} className="btn">
            Descargar JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
