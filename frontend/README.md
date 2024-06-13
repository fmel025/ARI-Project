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

Para instalar el frontend debes realizar los siguientes pasos:

1. Instalar una version de NodeJS (si aun no ha sido instalada).
2. Ejecutar el siguiente comando:
```bash
$ npm install
```
3. Copiar los datos del archivo **.dev.env** y luego crear un archivo **.env** dentro de la misma carpeta y colocar la data copiada dentro de ese archivo.


Y con esos pasos realizados ya podremos correr nuestra aplicación.

## Iniciar la aplicación

Para iniciar la aplicación podemos ejecutar los siguientes comandos: 

1. En modo de desarrollo.
```bash
# Modo developer
$ npm run dev
```

2. En modo de producción.
```bash
# Modo production
$ npm run build
```