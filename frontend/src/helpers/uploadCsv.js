// src/helpers/uploadCsv.js
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

const uploadCsv = async (data, delimiter, cipherKey) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/upload/parse',
      withCredentials: false,
      data: {
        data: data,
        delimiter: delimiter,
        cipherKey: cipherKey
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default uploadCsv;
