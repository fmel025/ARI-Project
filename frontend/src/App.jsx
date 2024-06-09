import { useState } from 'react';
import Papa from 'papaparse';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import uploadCsv from './helpers/uploadCsv';

function App() {
  const [tableData, setTableData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [csvLines, setCsvLines] = useState([]);
  const [separatorValue, setSeparatorValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const onSeparatorChange = ({ target }) => {
    setSeparatorValue(target.value);
  };

  const onPasswordChange = ({ target }) => {
    setPasswordValue(target.value);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const data = result.data;
          setHeaders(data[0]); // Asume que la primera fila es el encabezado
          let rows = data.slice(1);
          setTableData(rows); // Resto de las filas como contenido

          // Array para los datos del CSV
          let linesArray = rows.map(row => row.join(separatorValue)); 
          setCsvLines(linesArray);
          console.log(linesArray);
        },
        header: false
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await uploadCsv(csvLines, separatorValue, passwordValue);
      console.log(csvLines, separatorValue, passwordValue)
      console.log('Response:', response);
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center mt-5">
      <div className="flex flex-col bg-honeydew rounded-2xl p-6 w-full max-w-4xl shadow-lg">
        <h1 className="font-bold text-3xl pb-5 text-center">Generador de JSON</h1>
        <div className="flex flex-col md:flex-row justify-evenly mb-6 w-full gap-4">
          <div className="flex flex-col justify-center w-full md:w-1/3 mb-4 md:mb-0">
            <label className="font-bold mb-2">Escoja su archivo CSV</label>
            <input type="file" accept=".csv" onChange={handleCSVUpload} className="w-full p-2 border rounded" />
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/3 mb-4 md:mb-0">
            <label className="font-bold mb-2">Inserte separador a utilizar</label>
            <input
              type="text"
              className="rounded w-full p-2 border"
              value={separatorValue}
              onChange={onSeparatorChange}
            />
          </div>
          <div className="flex flex-col justify-center w-full md:w-1/3">
            <label className="font-bold mb-2">Clave / Password</label>
            <input
              type="text"
              className="rounded w-full p-2 border"
              value={passwordValue}
              onChange={onPasswordChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-bold text-xl mb-2">Contenido del archivo subido CSV</h2>
          {tableData.length === 0 ? (
            <h2>Aún no hay datos por mostrar, por favor suba un archivo CSV</h2>
          ) : (
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} className="border px-4 py-2 bg-darkPurple text-white">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="border px-4 py-2 bg-naplesYellow">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="flex flex-col gap-5 mt-5">
          <h2 className="font-bold text-xl mb-2">Contenido del archivo generado JSON</h2>
          // TODO: Here goes the JSON after the API call
          // By now this is dummy data stracted from the CSV
          <SyntaxHighlighter language="json" style={dark}>
            {JSON.stringify({ data: csvLines, cipherKey: passwordValue, delimiter: separatorValue }, null, 2)}
          </SyntaxHighlighter>
        </div>
        <div className="flex justify-center gap-5">
          <button onClick={handleSubmit} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Enviar a la API
          </button>
            {/* TODO: Here goes handleDownload */}
          <button onClick={null} className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
            Descargar JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
