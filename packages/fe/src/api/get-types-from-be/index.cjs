const Axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();

const API_URL=process.env.VITE_API_TYPES_URL;

 const axios = Axios.create({
  baseURL: API_URL,
});
axios
  .get('')
  .then((response) => {
    fs.writeFileSync('types.ts', response.data);
    console.log('Types fetched and saved successfully.');
  })
  .catch((error) => {
    console.error('Error fetching types:', error);
  });
