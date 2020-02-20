const express = require("express");
const router = express.Router();
const marvelClient = require("../Client/marvel");

router.get("/comics", async (req, res) => {
  const comics = await marvelClient.getComics(0, 100, req.query.search);
  const formattedComics = comics.map(comic => {
    return {
      id: comic.id,
      title: comic.title,
      desc: comic.description,
      imgPath:
        comic.thumbnail.path + "/portrait_medium." + comic.thumbnail.extension
    };
  });

  res.json(formattedComics);
});
module.exports = router;
