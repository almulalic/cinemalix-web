import React, { useState } from "react";
import { Button, Input } from "../../../../elements";
import { useSelector } from "react-redux";
import { auth, UsersAPI } from "../../../../api";
import { toast } from "react-toastify";

export interface IUser {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  contactPhone: string;
}

const ProfileDetailsForm = () => {
  const [userData, setUserData] = useState(auth.getCurrentUser());
  const [nameInput, setNameInput] = useState(userData.name);
  const [emailInput, setEmailInput] = useState(userData.email);
  const [surnameInput, setSurnameInput] = useState(userData.surname);
  const [usernameInput, setUsernameInput] = useState(userData.username);
  const [contactPhoneInput, setContactPhoneInput] = useState(userData.contactPhone);

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function validateInput(name, surname, username, email, contactPhone) {
    if (name.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.name));
    else if (name.length > 16)
      throw new Error(
        language.words.validation.tooLongField.replace("*", language.words.name).replace("**", 16)
      );
    else if (surname.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.surname));
    else if (surname.length > 32)
      throw new Error(
        language.words.validation.tooLongField.replace("*", language.words.surname).replace("**", 32)
      );
    else if (username.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.username));
    else if (username.length > 16)
      throw new Error(
        language.words.validation.tooLongField.replace("*", language.words.username).replace("**", 16)
      );
    else if (email.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.email));
    else if (email.length > 64)
      throw new Error(
        language.words.validation.tooLongField.replace("*", language.words.email).replace("**", 64)
      );
    else if (!email.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/))
      throw new Error(language.words.validation.invalidFormat.replace("*", language.words.email));
    else if (contactPhone.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.contactPhone));
    else if (contactPhone.length > 16)
      throw new Error(
        language.words.validation.tooLongField.replace("*", language.words.contactPhone).replace("**", 16)
      );
  }

  function onSaveAction() {
    setFormSubmitting(true);

    try {
      validateInput(nameInput, surnameInput, usernameInput, emailInput, contactPhoneInput);

      UsersAPI.update({
        name: nameInput,
        surname: surnameInput,
        username: usernameInput,
        email: emailInput,
        contactPhone: contactPhoneInput,
      })
        .then((res) => {
          toast.success(language.words.profile.updateSuccess);
          auth.setCurrentUser(
            JSON.stringify({
              id: res.data.id,
              name: res.data.name,
              surname: res.data.surname,
              username: res.data.username,
              email: res.data.email,
              contactPhone: res.data.contactPhone,
              role: res.data.role,
            })
          );
          localStorage.setItem("api_token", res.data.token);
          setUserData(auth.getCurrentUser());
          setFormSubmitting(false);
        })
        .catch(() => {
          toast.success(language.words.profile.updateFail);
          setFormSubmitting(false);
        });
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  const language = useSelector((state: any) => state.language);

  return (
    <div className="profile__form">
      <div className="row">
        <div className="col-12">
          <h4 className="profile__title">{language.words.profile.profileDetails}</h4>
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={surnameInput}
            onChange={setSurnameInput}
            isLoading={isFormSubmitting}
            isDisabled={isFormSubmitting}
            placeholder="Doe"
            label={language.words.surname}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name={language.words.surname}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={nameInput}
            onChange={setNameInput}
            isLoading={isFormSubmitting}
            isDisabled={isFormSubmitting}
            placeholder="John"
            label={language.words.name}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name={language.words.name}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={usernameInput}
            onChange={setUsernameInput}
            isDisabled={isFormSubmitting}
            isLoading={isFormSubmitting}
            placeholder="JohnDoe123"
            label={language.words.username}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name={language.words.username}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={emailInput}
            onChange={setEmailInput}
            isLoading={isFormSubmitting}
            isDisabled={isFormSubmitting}
            placeholder="email@email.com"
            label={language.words.email}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name={language.words.email}
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={contactPhoneInput}
            onChange={setContactPhoneInput}
            isLoading={isFormSubmitting}
            isDisabled={isFormSubmitting}
            placeholder={contactPhoneInput}
            label={language.words.profile.contactPhone}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name={language.words.profile.contactPhone}
          />
        </div>
      </div>
      <Button
        text={language.words.save}
        onClick={onSaveAction}
        isLoading={isFormSubmitting}
        additionalClasses="profile__btn"
      />
    </div>
  );
};

export default ProfileDetailsForm;
