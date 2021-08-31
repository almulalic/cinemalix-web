import React, { useState } from "react";
import { auth, UsersAPI } from "../../../../api";
import { Button, Input } from "../../../../elements";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ChangePasswordForm = () => {
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmNewPasswordInput] = useState("");

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const language = useSelector((state: any) => state.language);

  function validateInput(oldPassword, newPassword, newPasswordRepeat) {
    if (oldPassword.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.profile.oldPassword));
    else if (oldPassword.length < 6)
      throw new Error(
        language.words.validation.tooShortField
          .replace("*", language.words.profile.oldPassword)
          .replace("**", 6)
      );
    else if (newPassword.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.profile.newPassword));
    else if (newPassword.length < 6)
      throw new Error(
        language.words.validation.tooShortField
          .replace("*", language.words.profile.newPassword)
          .replace("**", 6)
      );
    else if (newPasswordRepeat.length <= 0)
      throw new Error(
        language.words.validation.emptyField.replace("*", language.words.profile.confirmNewPassword)
      );
    else if (newPasswordRepeat.length < 6)
      throw new Error(
        language.words.validation.tooShortField
          .replace("*", language.words.profile.confirmNewPassword)
          .replace("**", 6)
      );
    else if (newPassword !== newPasswordRepeat) throw new Error(language.words.validation.passwordDontMatch);
  }

  function onSubmitAction() {
    setFormSubmitting(true);

    try {
      validateInput(oldPasswordInput, newPasswordInput, confirmPasswordInput);

      UsersAPI.updatePassword({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput,
        newPasswordRepeat: confirmPasswordInput,
      })
        .then((res) => {
          toast.success(language.words.profile.updatePasswordSuccess);
          auth.setToken(res.data);
          setFormSubmitting(false);
        })
        .catch(() => {
          toast.error(language.words.profile.updatePasswordFail);
          setFormSubmitting(false);
        });
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  return (
    <div className="profile__form">
      <div className="row">
        <div className="col-12">
          <h4 className="profile__title">{language.words.profile.changePassword}</h4>
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={oldPasswordInput}
            onChange={setOldPasswordInput}
            isLoading={isFormSubmitting}
            placeholder=""
            label={language.words.profile.oldPassword}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name="oldpass"
            type="password"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">{/* EMPTY */}</div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={newPasswordInput}
            onChange={setNewPasswordInput}
            isLoading={isFormSubmitting}
            placeholder=""
            label={language.words.profile.newPassword}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name="newpass"
            type="password"
          />
        </div>

        <div className="col-12 col-md-6 col-lg-12 col-xl-6">
          <Input
            value={confirmPasswordInput}
            onChange={setConfirmNewPasswordInput}
            isLoading={isFormSubmitting}
            placeholder=""
            label={language.words.profile.confirmNewPassword}
            labelClassName="profile__label"
            wrapperClasses="profile__group"
            additionalClassNames="profile__input"
            name="confirmpass"
            type="password"
          />
        </div>
      </div>
      <Button
        text={language.words.save}
        onClick={onSubmitAction}
        additionalClasses="profile__btn"
        isLoading={isFormSubmitting}
      />
    </div>
  );
};

export default ChangePasswordForm;
