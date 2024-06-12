import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import axios from "axios";
import { toast } from "react-toastify";

function App() {
  const [csvLines, setCsvLines] = useState([]);
  const [rawCsvContent, setRawCsvContent] = useState([]);
  const [delimiterValue, setDelimiterValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [jsonContent, setJsonContent] = useState(null);
  const notifyEmptyFile = () =>
    toast.warning("No se ha seleccionado un archivo CSV");
  const notifyEmptyDelimeter = () =>
    toast.warning(
      "El delimitador solamente puede ser una coma o un punto y coma"
    );
  const notifyEmptyPassword = () =>
    toast.warning("La clave no puede estar vacía");
  const notifyEmptyUpload1 = () =>
    toast.warning(
      "No se ha convertido ningun archivo, no se puede copiar nada"
    );
  const notifyEmptyUpload2 = () =>
    toast.warning(
      "No se ha convertido ningun archivo, no se puede descargar nada"
    );

  const onSeparatorChange = ({ target }) => {
    setDelimiterValue(target.value);
    console.log(delimiterValue);
  };

  const onPasswordChange = ({ target }) => {
    setPasswordValue(target.value);
    console.log(passwordValue);
  };

  const onInputClick = (event) => {
    event.target.value = "";
    setCsvLines([]);
    setRawCsvContent("");
    setJsonContent(null);
  };

  const handleCsvView = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text
          .split("\n")
          .map((line) => line.split(","))
          .filter((line) => line.some((cell) => cell.trim() !== "")); // Filtra las líneas vacías
        let rawCsv = lines.map((row) => row.join(",")).join("\n");
        let rows = lines.slice(1);
        let linesArray = rows.map((row) => row.join(","));
        setRawCsvContent(rawCsv);
        setCsvLines(linesArray);
        console.log(linesArray);
      };
      reader.readAsText(file);
    }
  };

  const handleCopy = () => {
    if (jsonContent == null) {
      notifyEmptyUpload1();
      return;
    }
    navigator.clipboard
      .writeText(JSON.stringify(jsonContent, null, 2))
      .then(() => {
        toast.success("JSON copiado al portapapeles");
      })
      .catch((error) => {
        console.error("Error copying JSON to clipboard:", error);
        toast.error("Error al copiar JSON al portapapeles");
      });
  };

  const handleDownload = () => {
    if (jsonContent == null) {
      notifyEmptyUpload2();
      return;
    }
    const blob = new Blob([JSON.stringify(jsonContent, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async () => {
    if (csvLines.length === 0) {
      notifyEmptyFile();
      return;
    }
    if (delimiterValue == !";" || delimiterValue == !",") {
      notifyEmptyDelimeter();
      return;
    }
    if (passwordValue === "") {
      notifyEmptyPassword();
      return;
    }
    try {
      console.log(import.meta.VITE_API_URL);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/parse`,
        {
          data: csvLines,
          delimiter: delimiterValue,
          cipherKey: passwordValue,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(csvLines, delimiterValue, passwordValue);
      console.log("Response:", response.data);
      setJsonContent(response.data);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-12">
      <h1 className="font-bold text-5xl text-left">
        Convertidor de CSV a JSON
      </h1>
      <h3 className="text-white font-bold text-xl text-center bg-celestialBlue p-1 rounded-md">
        Convierte tus archivos CSV a JSON y 3ncr1pt4 los datos sensibles
      </h3>
      <div className="flex flex-col bg-whiteSmoke rounded-2xl p-6 max-w-5xl border shadow-lg">
        <div className="flex flex-row justify-between  gap-5 mb-6">
          {/* Text input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">
                Escoja su archivo CSV
              </span>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              accept=".csv"
              onChange={handleCsvView}
              onClick={onInputClick}
            />
          </label>
          {/* Text input */}
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text font-bold">
                Ingrese el delimitador del CSV
              </span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
              value={delimiterValue}
              onChange={onSeparatorChange}
            />
            <div className="label"></div>
          </label>
        </div>
        {/* Text input */}
        <label className="form-control w-full space-y-2">
          <div className="label">
            <span className="label-text font-bold">
              Ingrese la clave de encriptacion
            </span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full"
            value={passwordValue}
            onChange={onPasswordChange}
          />
          <div className="label"></div>
        </label>
        <div className="flex flex-col gap-4 w-full">
          <h2 className="font-bold text-xl mb-2">
            Contenido del archivo subido CSV
          </h2>
          <SyntaxHighlighter language="csv" style={dracula}>
            {rawCsvContent}
          </SyntaxHighlighter>
        </div>
        <button
          onClick={handleSubmit}
          className="btn bg-resedaGreen text-white w-3/12"
        >
          Convertir a JSON
        </button>
        <div className="flex flex-col mt-5 gap-4 w-full">
          <h2 className="font-bold text-xl mb-2">
            Contenido del archivo generado JSON
          </h2>
          <SyntaxHighlighter language="json" style={dracula}>
            {jsonContent === null ? "" : JSON.stringify(jsonContent, null, 2)}
          </SyntaxHighlighter>
        </div>
        <div className="flex justify-end gap-5">
          {/* TODO: Here goes handleDownload */}
          <button onClick={handleCopy} className="btn bg-yateBlue text-white">
            Copiar JSON
          </button>
          <button
            onClick={handleDownload}
            className="btn bg-yateBlue text-white"
          >
            Descargar JSON
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
