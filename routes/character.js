const express = require("express");
const router = express.Router();
const marvelClient = require("../Client/marvel");

// CONTROLEUR

router.get("/characters", async (req, res) => {
  const data = await marvelClient.getCharacters(0, 100, req.query.search);
  const newData = data.results.map(character => {
    return {
      id: character.id,

      name: character.name,
      desc: character.description,
      imgPath:
        character.thumbnail.path +
        "/standard_xlarge." +
        character.thumbnail.extension
    };
  });

  res.json(newData);
});

router.get("/character/:id", async (req, res) => {
  const character = await marvelClient.getCharacter(req.params.id);
  const characterComics = await marvelClient.getCharacterComics(req.params.id);

  const formattedCharacterComics = characterComics.map(characterComic => {
    return {
      id: characterComic.id,
      title: characterComic.title,
      imgPath:
        characterComic.thumbnail.path +
        "/standard_xlarge." +
        characterComic.thumbnail.extension
    };
  });
  res.json({
    id: character.id,
    name: character.name,
    desc: character.description,
    imgPath:
      character.thumbnail.path + "/detail." + character.thumbnail.extension,
    comics: formattedCharacterComics
  });
});

module.exports = router;
