# Frontend

## Descripción

Frontend del proyecto de Análisis de Riesgos Informáticos

---

### Características importantes

* **Selección de archivo CSV**: Se pueden seleccionar solamente archivos CSV para su posterior subida al encriptador.
* **Delimitador / Separador**: Delimitador con el que están separados los datos en el archivo CSV.
* **Clave**: Clave para encriptar y desencriptar datos sensibles en el archivo CSV (como el número de CC de los clientes).
* **Muestra de archivo JSON**: El archivo JSON generado se puede mostrar en la web.
* **Descarga de archivo JSON**: El archivo JSON se puede descargar y guardar si el usuario lo desea.

---

### Tecnologías utilizadas

* **Backend**: Node.js ***v10.12.2***
* **Frontend**: ReactJS ***v18.2.0*** + Vite ***v5.2.0***
* **Otros**: react-syntax-highlighter (para mostrar el archivo JSON), papaparse (para parsear el archivo CSV)

---

## Instalación

```bash
$ npm install
```

## Iniciar la aplicación

```bash
# Modo developer
$ npm run dev

# Modo produccion
$ npm run build
```
