import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { AuthPage, MainContent } from "../../../components";
import { Button, Input } from "../../../elements";
import { HallsAPI } from "../../../api";
import { toast } from "react-toastify";

import "./AddHall.css";

const AddHall = (props) => {
  const language = useSelector((state: any) => state.language);
  const [isEdit, setIsEdit] = useState(false);

  //#region Inputs

  const [nameInput, setNameInput] = useState("");
  const [capacityInput, setCapacityInput] = useState("");
  const [seatValidityRegexInput, setSeatValidityRegexInput] = useState("");

  //#endregion

  //#region From Submit

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function validate(name, capacity) {
    if (name.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addHall.hallName));
    else if (capacity.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addHall.capacity));
  }

  useEffect(() => {
    if (props.match.params.id) {
      setIsEdit(true);

      HallsAPI.getAll()
        .then((res) => {
          let hall = res.data.find((x) => x.id == props.match.params.id);

          setNameInput(hall.name);
          setCapacityInput(hall.capacity);
          setSeatValidityRegexInput(hall.seatValidityRegex);
        })
        .catch(() => {
          toast.error("Greska na serveru");
          setIsEdit(false);
        });
    }
  }, []);

  function onFormSubmit() {
    setFormSubmitting(true);

    try {
      validate(nameInput, capacityInput);

      HallsAPI.add({
        name: nameInput,
        capacity: Number(capacityInput),
        seatValidityRegex: seatValidityRegexInput,
      })
        .then((res) => {
          toast.success(language.words.addHall.success);
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

  return (
    <AuthPage>
      <MainContent
        title={isEdit ? language.words.authHeaders.editHall : language.words.authHeaders.addHall}
        additionalClassNames="form-center"
      >
        <form className="form addHallForm">
          <div className="row">
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={nameInput}
                onChange={setNameInput}
                placeholder={language.words.addHall.hallName}
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={capacityInput}
                onChange={setCapacityInput}
                placeholder={language.words.addHall.capacity}
                isLoading={isFormSubmitting}
                type="number"
                min={0}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={seatValidityRegexInput}
                onChange={setSeatValidityRegexInput}
                placeholder={language.words.addHall.seatValidityRegex}
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

export default AddHall;
