import Nouislider from "nouislider-react";
import React, { Fragment, useEffect, useState } from "react";
import { Anchor, Button, Input, Slider, TextArea } from "..";
import { auth } from "../../api";
import movieReviews from "../../api/MovieReviewsAPI";

import "./Review.css";
import { toast } from "react-toastify";
import EmptyState from "../EmptyState/EmptyState";
import { useSelector } from "react-redux";

const ReviewForm = ({ movieId, setReviewAdded, isDisabled }) => {
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [rating, setRating] = useState(5.5);
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [isLocallyDisabled, setIsLocallyDisabled] = useState(false);

  const language = useSelector((state: any) => state.language);

  function onFormSubmit() {
    setFormSubmitting(true);

    if (
      auth.getToken() != null &&
      movieId != null &&
      titleInput.length != 0 &&
      titleInput.length <= 32 &&
      bodyInput.length != 0 &&
      bodyInput.length <= 128 &&
      rating >= 1 &&
      rating <= 10
    ) {
      movieReviews
        .postReviews({
          userId: auth.getCurrentUser().id,
          movieId: movieId,
          title: titleInput,
          review: bodyInput,
          rating: Number(rating),
        })
        .then((x) => {
          toast.success("Uspjesno dodano");
          setFormSubmitting(false);
          setReviewAdded(true);
          setIsLocallyDisabled(true);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Dodavanje nije uspjelo");
          setFormSubmitting(false);
          setReviewAdded(false);
        });
    } else {
      toast.error("Dodavanje nije uspjelo");
      setFormSubmitting(false);
    }
  }

  return auth.getCurrentUser() ? (
    <div className="form reviewForm">
      <div className="form__input form__input-slider">
        <span className="filter__item-label">
          {language.words.movieOverview.reviewFormRating} <span>{Math.round(rating * 100) / 100}</span>{" "}
          <i className="icon ion-ios-star" />
        </span>
        <Nouislider
          range={{ min: 1, max: 10 }}
          start={5.5}
          onSlide={(newRatingRange) => setRating(newRatingRange[0])}
          step={0.5}
        />
      </div>

      <Input
        placeholder={language.words.movieOverview.reviewFormTitleField}
        value={titleInput}
        onChange={setTitleInput}
        isLoading={isFormSubmitting}
        isDisabled={isFormSubmitting || isDisabled}
        wrapperClasses="form__input"
      />

      <TextArea
        placeholder={language.words.movieOverview.reviewFormBodyField}
        value={bodyInput}
        onChange={setBodyInput}
        isDisabled={isFormSubmitting || isDisabled}
      />
      <div className="form__slider">
        <div className="form__slider-rating" id="slider__rating"></div>
        <div className="form__slider-value" id="form__slider-value"></div>
      </div>

      <Button
        text={language.words.movieOverview.reviewFormButton}
        onClick={onFormSubmit}
        isLoading={isFormSubmitting || isDisabled}
      />
    </div>
  ) : (
    <EmptyState
      heading={language.words.movieOverview.notLoggedIn}
      text={
        <span>
          {language.words.movieOverview.onlyLoggedUsers}{" "}
          <Anchor text={language.words.here} target="_blank" href="/login" />{" "}
          {language.words.movieOverview.toGoToLogin}{" "}
          <Anchor text={language.words.here} target="_blank" href="/SignUp" />{" "}
          {language.words.movieOverview.toGoToSingup}
        </span>
      }
    />
  );
};

export default ReviewForm;
