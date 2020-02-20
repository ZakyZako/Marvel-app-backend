const axios = require("axios");
var md5 = require("md5");

const publicKey = "53816b89bd83676b6f1d77ac0e952902";
const privateKey = "150cb18480c5c779950f8e9f55e06ead14d6aa22";
//METHODE
const marvel = {
  getCharacters: async (offset, limit, search) => {
    const now = new Date().getTime();
    const hash = md5(now + privateKey + publicKey);

    let url = `http://gateway.marvel.com/v1/public/characters?ts=${now}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`;
    if (search) {
      url += `&nameStartsWith=${search}`;
    }
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      return [];
    }
  },
  getCharacter: async id => {
    const now = new Date().getTime();
    const hash = md5(now + privateKey + publicKey);
    const url = `http://gateway.marvel.com/v1/public/characters/${id}?ts=${now}&apikey=${publicKey}&hash=${hash}`;
    console.log(url);

    try {
      const response = await axios.get(url);
      return response.data.data.results[0];
    } catch (error) {
      return [];
    }
  },

  getCharacterComics: async id => {
    const now = new Date().getTime();
    const hash = md5(now + privateKey + publicKey);
    const url = `http://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${now}&apikey=${publicKey}&hash=${hash}`;

    try {
      const response = await axios.get(url);
      return response.data.data.results;
    } catch (error) {
      return []; // todo
    }
  },
  getComics: async (offset, limit, search) => {
    const now = new Date().getTime();
    const hash = md5(now + privateKey + publicKey);
    let url = `http://gateway.marvel.com/v1/public/comics?ts=${now}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}&orderBy=title`;
    if (search) {
      url += `&titleStartsWith=${search}`;
    }
    try {
      const response = await axios.get(url);
      return response.data.data.results;
    } catch (error) {
      return [];
    }
  }
};

module.exports = marvel;
