import { useSelector } from "react-redux";
import { DateTime } from "luxon";
import axios from "axios";

export async function getBlobFromURL(imageURL) {
  return fetch(imageURL).then((res) => {
    return res.blob();
  });
}

export function validateMovieFormInput(
  language,
  title,
  cover,
  coverImageURL,
  overviewLinkUrls,
  description,
  releaseYear,
  runningTimeInMinutes,
  videoURL,
  backdropInputType,
  backdropURL,
  backdropImage
) {
  if (title.length === 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.title));
  else if (title.length > 64)
    throw new Error(
      language.words.validation.tooLongField.replace("*", language.words.addMovie.title).replace("**", 64)
    );
  else if (!cover.file && coverImageURL.length == 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.cover));
  else if (releaseYear.length === 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.releaseYear));
  else if (releaseYear < 1888 || releaseYear > DateTime.now().year)
    throw new Error(
      language.words.validation.outOfRange
        .replace("*", language.words.addMovie.releaseYear)
        .replace("**", 1888)
        .replace("***", DateTime.now().year)
    );
  else if (runningTimeInMinutes.length === 0)
    throw new Error(
      language.words.validation.emptyField.replace("*", language.words.addMovie.runningTimeInMinutes)
    );
  else if (runningTimeInMinutes < 0 || runningTimeInMinutes > 1000)
    throw new Error(
      language.words.validation.outOfRange
        .replace("*", language.words.addMovie.runningTimeInMinutes)
        .replace("**", 0)
        .replace("***", 1000)
    );
  else if (overviewLinkUrls.length === 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.overviewLinks));
  else if (description.length === 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.description));
  else if (description.length > 360)
    throw new Error(
      language.words.validation.tooLongField
        .replace("*", language.words.addMovie.description)
        .replace("**", 500)
    );
  else if (videoURL.length == 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.videoURL));
  else if (backdropInputType.value == 0 && backdropURL.length == 0)
    throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.backdropURL));
  else if (backdropInputType.value == 1 && !backdropImage.file)
    throw new Error(
      language.words.validation.emptyField.replace("*", language.words.addMovie.uploadBackdrop)
    );
}
