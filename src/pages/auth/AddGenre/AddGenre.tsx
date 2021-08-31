import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { AuthPage, MainContent } from "../../../components";
import { Button, Input } from "../../../elements";
import { genresApi, HallsAPI, TypesAPI } from "../../../api";
import { toast } from "react-toastify";

const AddGenre = (props) => {
  const language = useSelector((state: any) => state.language);
  const [isEdit, setIsEdit] = useState(false);

  //#region Inputs

  const [codeInput, setCodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  //#endregion

  //#region From Submit

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function validate(code, name) {
    if (code.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addGenre.code));
    else if (name.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addGenre.name));
  }

  function onFormSubmit() {
    setFormSubmitting(true);

    try {
      validate(codeInput, nameInput);

      TypesAPI.addGenre({
        code: codeInput,
        name: nameInput,
      })
        .then((res) => {
          toast.success(language.words.addGenre.success);
          setFormSubmitting(false);
        })
        .catch(() => {
          toast.error("Server error");
          setFormSubmitting(false);
        });
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  //#endregion

  useEffect(() => {
    if (props.match.params.code) {
      setIsEdit(true);

      genresApi
        .getAllGenres()
        .then((res) => {
          let genre = res.data.find((x) => x.code == props.match.params.code);
          setCodeInput(genre.code);
          setNameInput(genre.name);
        })
        .catch(() => {
          toast.error("Greška na serveru");
          setIsEdit(false);
        });
    }
  }, []);

  return (
    <AuthPage>
      <MainContent
        title={isEdit ? language.words.authHeaders.editGenre : language.words.addGenre.header}
        additionalClassNames="form-center"
      >
        <form className="form addHallForm">
          <div className="row">
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={codeInput}
                onChange={setCodeInput}
                placeholder={language.words.addGenre.code}
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={nameInput}
                onChange={setNameInput}
                placeholder={language.words.addGenre.name}
                isLoading={isFormSubmitting}
              />
            </div>
          </div>

          <Button text={language.words.submit} onClick={onFormSubmit} />
        </form>
      </MainContent>
    </AuthPage>
  );
};

export default AddGenre;
