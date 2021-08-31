const axios = require("axios");

let movieIds = [584, 10314];

let sql = "";

movieIds.forEach((x, i) => {
  axios
    .get(`https://api.themoviedb.org/3/movie/${x}?api_key=ef57f4b4474cd9d6bd10f63b55c2bac9`)
    .then(async (res) => {
      let movies = await axios.get(
        `https://api.themoviedb.org/3/movie/${x}/videos?api_key=ef57f4b4474cd9d6bd10f63b55c2bac9`
      );
      let movieUrl = "";

      if (movies.data.results) {
        movies.data.results.forEach((result) => {
          if (result.site === "YouTube") movieUrl = `https://youtube.com/watch?v=${result.key}`;

          if (movieUrl !== "") return;
        });
      }

      let backdrop = "";
      if (res.data.belongs_to_collection != null)
        backdrop = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2+${res.data.belongs_to_collection.poster_path}`;
      else backdrop = "null";

      sql +=
        `insert into movie (title, description, backdropImageURL, imageURL, overviewLinks, videoLinks, releaseYear,
      runningTimeInMinutes, ageRating, profitPercentageShare, has3D, hasLocalAudio, hasLocalSubtitles,
      createdAt, modifiedAt, modifiedBy) VALUES (
        '${res.data.original_title}',
        '${res.data.overview.substr(0, 500)}', 
        'https://image.tmdb.org/t/p/w300+${res.data.backdrop_path}',` +
        backdrop +
        "," +
        +movieUrl +
        ", " +
        res.data.release_date.split("-")[0] +
        ", " +
        res.data.runtime +
        ", " +
        0 +
        ", " +
        10 +
        ", " +
        (i == 3 && i == 6 ? "1" : "0") +
        ", " +
        "0," +
        "1," +
        "getdate()" +
        "getdate()" +
        "'SYSTEM');\n";
      console.log(sql);
    });
});
