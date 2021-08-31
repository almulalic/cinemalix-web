import React, { useEffect, useState } from "react";
import "./AddMovie.css";

import { AuthPage, MainContent } from "../../../components";
import { Button, Checkbox, Input, RadioInput, TextArea } from "../../../elements";

import Dropdown, { IDropdownOption } from "../../../elements/Dropdown/Dropdown";
import { CapitalizeString, getAgeRatingsOptions, LOCAL_COUNTRY_NAME } from "../../../shared/helpers";
import ReactTooltip from "react-tooltip";
import { DateTime } from "luxon";
import tmdbApi from "../../../api/tmdbApi";
import { MovieCatalogAPI, TypesAPI } from "../../../api";
import { useSelector } from "react-redux";
import Select from "react-select";
import { primarySelectStyle, defaultSelectStyle } from "../../../shared/types";
import { toast } from "react-toastify";
import { validateMovieFormInput, getBlobFromURL } from "./validator";

export interface ISelectOption {
  value: string;
  label: string;
}

const AddMovie = (props) => {
  const [coverPhotoURL, setCoverPhotoURL] = useState("");

  const [titleInput, setTitleInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [releseYearInput, setReleseYearInput] = useState("");
  const [runningTimeInput, setRunningTimeInput] = useState("");
  const [overviewLinkInput, setOverviewLinkInput] = useState("");
  const [profitPercentageInput, setProfitPercentageInput] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  //#region Chexbox

  const [hasLocalAudio, setHasLocalAudio] = useState(false);
  const [hasLocalSubtitles, setHasLocalSubtitles] = useState(false);
  const [has3D, setHas3D] = useState(false);

  //#endregion

  //#region Cover Image

  const [coverImage, setCoverImage] = useState({
    file: "",
    imagePreviewURL: null,
  });
  const [coverImageURL, setCoverImageURL] = useState("");

  const handleImageChange = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];

    if (file != undefined) {
      setCoverImageURL("");

      reader.onloadend = () => {
        setCoverImage({
          file: file,
          imagePreviewURL: reader.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  //#endregion

  //#region Trailer Upload

  const [videoURLInput, setVideoURLInput] = useState("");

  //#endregion

  //#region Trailer Upload

  const backdropImportType = [
    { label: "URL", value: 0 },
    { label: "Upload", value: 1 },
  ];

  const [selectedBackdropUploadType, setSelectedBackdropUploadType] = useState(backdropImportType[0]);

  const [backdropImage, setBackdropImage] = useState({
    file: "",
    imagePreviewURL: null,
  });

  const [backdropImageURLInput, setBackdropImageURLInput] = useState("");

  //#endregion

  //#region Age Rating API

  const ageRatings: IDropdownOption[] = getAgeRatingsOptions();
  const [selectedAgeRating, setSelectedAgeRating] = useState(ageRatings[0]);

  //#endregion

  //#region Genres API

  const [genres, setGenres] = useState([] as IDropdownOption[]);
  const [isLoadingGenres, setLoadingGenres] = useState(true);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    setLoadingGenres(true);
    TypesAPI.getGenres()
      .then((res) => {
        setGenres(
          res.data.map((x) => {
            return {
              label: x.name,
              value: x.code,
            };
          })
        );

        setTimeout(() => {
          setLoadingGenres(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoadingGenres(false);
      });
  }, []);

  //#endregion

  //#region Template Movie

  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(suggestedMovies[0] as ISelectOption);

  function loadSuggestedData(input: any) {
    if (input === "") return;
    else {
      tmdbApi.getMovies(input).then((res) => {
        setSuggestedMovies(
          res.data.results.slice(0, 10).map((x: any, i: number) => {
            return {
              label: `${x.title} (${x.release_date})`,
              value: x.id,
            };
          })
        );
      });
    }
  }

  //#region Is Edit

  const [id, setId] = useState(-1);
  useEffect(() => {
    if (props.match.params.id) {
      MovieCatalogAPI.getMovieDetails(props.match.params.id)
        .then((res) => {
          setId(res.data.id);
          setTitleInput(res.data.title);
          setDescriptionInput(res.data.description);
          setSelectedGenres(
            res.data.genres.map((x) => {
              return { label: CapitalizeString(x), value: x };
            })
          );
          setHas3D(res.data.has3D);
          setHasLocalAudio(res.data.hasLocalAudio);
          setHasLocalSubtitles(res.data.hasLocalSubtitles);
          setCoverImage(res.data.imageURL);
          setOverviewLinkInput(res.data.overviewLinks);
          setVideoURLInput(res.data.videoLinks);
          setReleseYearInput(res.data.releaseYear);
          setRunningTimeInput(res.data.runningTimeInMinutes);
          setSelectedAgeRating(ageRatings[res.data.ageRating]);
          setBackdropImageURLInput(res.data.backdropImageURL);
        })
        .catch(() => {
          toast.error("Greska na serveru");
          setIsEdit(false);
        });
      setIsEdit(true);
    }
  }, []);

  //#endregion

  useEffect(() => {
    if (selectedMovie) {
      tmdbApi.getMovieDetails(selectedMovie.value).then(async (res) => {
        let movie = res.data;

        setCoverImage({ file: "", imagePreviewURL: "" });
        setCoverImageURL(`https://image.tmdb.org/t/p/w300${movie.poster_path}`);
        setTitleInput(movie.title);
        setDescriptionInput(movie.overview);
        setReleseYearInput(movie.release_date.split("-")[0]);
        setRunningTimeInput(movie.runtime);
        if (movie.adult) setSelectedAgeRating({ value: 4, label: "NC17" });

        let overviewSites = [];

        if (movie.imdb_id !== "") overviewSites.push(`https://imdb.com/title/${movie.imdb_id}`);
        if (movie.id !== "") overviewSites.push(`https://www.themoviedb.org/movie/${movie.id}`);

        setOverviewLinkInput(overviewSites.join(",\n"));

        if (movie.spoken_language)
          movie.spoken_language.forEach((x: any) => {
            if (x.english_name == LOCAL_COUNTRY_NAME) setHasLocalAudio(true);
          });

        let _genres: IDropdownOption[] = [];
        let _existingGenres = genres.map((x) => x.value.toLowerCase());

        if (movie.genres) {
          movie.genres.forEach((x: any) => {
            if (_existingGenres.find((y) => y == x.name.toLowerCase()))
              _genres.push({
                label: CapitalizeString(language.words.genreTypes[x.name.toUpperCase()]),
                value: x.name.toUpperCase(),
              });
          });
        }

        setSelectedGenres(_genres);

        let movies = await tmdbApi.getMovieVideos(selectedMovie.value);
        let movieUrl = "";

        if (movies.data.results) {
          movies.data.results.forEach((result: any) => {
            if (result.site === "YouTube") movieUrl = `https://youtube.com/watch?v=${result.key}`;

            if (movieUrl !== "") return;
          });
        }

        setVideoURLInput(movieUrl);

        setSelectedBackdropUploadType(backdropImportType[0]);
        setBackdropImageURLInput(`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`);
      });
    }
  }, [selectedMovie]);

  //#endregion

  //#region Form Submit

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  async function submitForm() {
    setFormSubmitting(true);

    try {
      validateMovieFormInput(
        language,
        titleInput,
        coverImage,
        coverImageURL,
        overviewLinkInput,
        descriptionInput,
        releseYearInput,
        runningTimeInput,
        videoURLInput,
        backdropImportType,
        backdropImageURLInput,
        backdropImage
      );

      let _coverImage;
      let coverImageBlob = await getBlobFromURL(coverImageURL);
      if (!coverImage.file)
        _coverImage = new File([coverImageBlob], "temp1." + coverImageBlob.type.split("/")[1]);
      else _coverImage = coverImage.file;

      let _backdropImage;
      if (selectedBackdropUploadType.value == 0) {
        let backdropImageBlob = await getBlobFromURL(backdropImageURLInput);
        _backdropImage = new File([backdropImageBlob], "temp2." + backdropImageBlob.type.split("/")[1]);
      } else _backdropImage = backdropImage.file;

      let formData = new FormData();
      formData.append("title", titleInput);
      formData.append("description", descriptionInput);
      formData.append("genres", selectedGenres.map((x) => x.value).join(","));
      formData.append("coverImage", _coverImage);
      formData.append("backdropImage", _backdropImage);
      formData.append("videoLinks", videoURLInput);
      formData.append("overviewLinks", overviewLinkInput);
      formData.append("releaseYear", releseYearInput);
      formData.append("runningTimeInMinutes", runningTimeInput);
      formData.append("ageRating", selectedAgeRating.value);
      formData.append("profitPercentageShare", "12");
      formData.append("has3D", has3D.toString());
      formData.append("hasLocalAudio", hasLocalAudio.toString());
      formData.append("hasLocalSubtitles", hasLocalSubtitles.toString());

      MovieCatalogAPI.addMovie(formData)
        .then((res) => {
          toast.success("Uspjesno dodano");
          setFormSubmitting(false);
        })
        .catch((err) => {
          toast.error("Greska na serveru");
          setFormSubmitting(false);
        });
    } catch (ex) {
      console.log(ex);
      toast.error(ex.message);
      setFormSubmitting(false);
    }
  }

  //#endregion

  const language = useSelector((state: any) => state.language);

  return (
    <AuthPage>
      <MainContent
        title={isEdit ? language.words.authHeaders.editMovie : language.words.authHeaders.addMovie}
        inputType="select"
        additionalClassNames="form-center"
        selectAction={
          !isEdit && {
            placeholder: language.words.addMovie.searchForTemplate,
            className: "suggestedMovie-select",
            selectedOption: selectedMovie,
            setSelectedOption: setSelectedMovie,
            options: suggestedMovies,
            loadOptions: loadSuggestedData,
            customStyles: primarySelectStyle,
          }
        }
      >
        <form action="#" className="form">
          <div className="row">
            <div className="col-lg-4 form__cover">
              <div className="row">
                <div className="col-12 col-sm-6 col-md-12">
                  <div className="form__img">
                    <label htmlFor="form__img-upload">Upload {language.words.addMovie.cover}</label>
                    <input
                      id="form__img-upload"
                      name="form__img-upload"
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={(e) => handleImageChange(e)}
                    />
                    <img
                      id="form__img"
                      src={coverImageURL ? coverImageURL : coverImage.imagePreviewURL}
                      alt=" "
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8 form__content">
              <div className="col-lg-12">
                <Input
                  additionalClassNames="form__input"
                  placeholder={language.words.addMovie.title}
                  value={titleInput}
                  onChange={setTitleInput}
                  isLoading={isFormSubmitting}
                />
              </div>

              <div className=" col-lg-12">
                <div className="row">
                  <div className=" col-lg-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <Input
                          additionalClassNames="form__input"
                          placeholder={language.words.addMovie.releaseYear}
                          value={releseYearInput}
                          onChange={setReleseYearInput}
                          isLoading={isFormSubmitting}
                          type="number"
                          min={0}
                        />
                      </div>
                      <div className="col-lg-12">
                        <Input
                          additionalClassNames="form__input"
                          placeholder={language.words.addMovie.runningTimeInMinutes}
                          value={runningTimeInput}
                          onChange={setRunningTimeInput}
                          isLoading={isFormSubmitting}
                          type="number"
                          min={0}
                          max={DateTime.now().year.toString()}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-8">
                    <TextArea
                      placeholder={language.words.addMovie.overviewLinks}
                      value={overviewLinkInput}
                      onChange={setOverviewLinkInput}
                      isDisabled={isFormSubmitting}
                    />
                  </div>
                </div>
              </div>

              <div className="row col-lg-12">
                <div className="col-lg-12">
                  <TextArea
                    placeholder={language.words.addMovie.description}
                    value={descriptionInput}
                    onChange={setDescriptionInput}
                    isDisabled={isFormSubmitting}
                  />
                </div>
                <br />
                <br />
                <br />
                <div className="col-lg-12">
                  <Select
                    placeholder={language.words.addMovie.genres}
                    options={genres}
                    loading={isLoadingGenres}
                    styles={defaultSelectStyle}
                    value={selectedGenres}
                    onChange={(newGenre: any) => setSelectedGenres(newGenre)}
                    isMulti
                    isClearable
                  />
                </div>
              </div>
            </div>

            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4">
                  <div className="addMovie--checkboxContainer-heading">
                    {language.words.addMovie.additionalInformation}
                  </div>

                  <div className="col-lg-3">
                    <Checkbox
                      id="localAudioCheckbox"
                      name="localAudioCheckbox"
                      label={language.words.addMovie.hasLocalAudio}
                      checked={hasLocalAudio}
                      onChange={setHasLocalAudio}
                      isLoading={isFormSubmitting}
                      additionalClasses="form__checkbox"
                    />
                  </div>
                  <div className="col-lg-3">
                    <Checkbox
                      id="localSubtitlesCheckbox"
                      name="localSubtitlesCheckbox"
                      label={language.words.addMovie.hasLocalSubtitles}
                      checked={hasLocalSubtitles}
                      onChange={setHasLocalSubtitles}
                      isLoading={isFormSubmitting}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Checkbox
                      id="3dcheckbox"
                      name="3dcheckbox"
                      label={language.words.addMovie.has3D}
                      checked={has3D}
                      onChange={setHas3D}
                      isLoading={isFormSubmitting}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Dropdown
                      additionalClassNames="addMovie--ageRatingDropdown"
                      label={language.words.addMovie.ageRating}
                      options={ageRatings}
                      selectedOption={selectedAgeRating}
                      setSelectedOption={setSelectedAgeRating}
                      inlineLabel
                    />
                  </div>
                </div>

                <div className="col-lg-8 ">
                  <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 addMovie--checkboxContainer-heading">
                          {language.words.addMovie.videoTrailers}
                          {"  "}
                          <i
                            className="icon ion-information-circled"
                            style={{ color: "#fff", cursor: "pointer" }}
                            data-tip={` <span> <strong style="color: #FFD700">${language.words.addMovie.supportedPlatforms}:</strong> <ul> <li>Youtube</li> <li>Facebook</li> <li>Soundcloud</li> <li>Vimeo</li> <li>Wistia</li> <li>Mixcloud</li> <li>Dailymotion</li> <li>Twitch</li> </ul> </span> `}
                          />
                        </div>

                        <div className="col-12">
                          <Input
                            wrapperClasses="form__input"
                            value={videoURLInput}
                            onChange={setVideoURLInput}
                            placeholder={language.words.addMovie.videoURL}
                            isLoading={isFormSubmitting}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-12">
                      <div id="backdropInput" className="col-lg-12">
                        <RadioInput
                          label={language.words.addMovie.backdropType}
                          options={backdropImportType}
                          selected={selectedBackdropUploadType}
                          setSelected={setSelectedBackdropUploadType}
                        />
                      </div>

                      <div id="uploadField" className="col-lg-12">
                        <div className="row">
                          {selectedBackdropUploadType.value == 0 ? (
                            <div className="col-12">
                              <Input
                                wrapperClasses="form__input"
                                value={backdropImageURLInput}
                                onChange={setBackdropImageURLInput}
                                placeholder={language.words.addMovie.backdropURL}
                                isLoading={isFormSubmitting}
                              />
                            </div>
                          ) : (
                            <div className="col-12">
                              <div className="form__image form__video">
                                <label id="movie1" htmlFor="form__image">
                                  {language.words.addMovie.uploadBackdrop}
                                </label>
                                <input
                                  data-name="#movie1"
                                  id="form__image-upload"
                                  name="movie"
                                  className="form__image-upload"
                                  type="file"
                                  accept="video/mp4,video/x-m4v,video/*"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 btnContainer">
              <Button
                additionalClasses="form__btn"
                text={language.words.addMovie.publish}
                onClick={submitForm}
                isLoading={isFormSubmitting}
              />
            </div>
          </div>
        </form>
      </MainContent>
      <ReactTooltip html place="top" effect="solid" />
    </AuthPage>
  );
};

export default AddMovie;
