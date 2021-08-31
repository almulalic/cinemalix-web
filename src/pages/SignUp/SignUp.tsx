import React, { useState } from "react";
import { Container, Form, Page, Section } from "../../components";
import { Anchor, Button, Checkbox, Input } from "../../elements";
import SecondaryText from "../../elements/SecondaryText/SecondaryText";

import "./SignUp.css";
import { useSelector } from "react-redux";
import { UsersAPI } from "../../api";
import { toast } from "react-toastify";

const SignUp = () => {
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [contactPhoneInput, setContactPhoneInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [isPrivacyPolicyAccepted, setIsPrivacyPolicyAccepted] = useState(false);

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const language = useSelector((state: any) => state.language);

  function validateInput(
    name,
    surname,
    username,
    email,
    contactPhone,
    password,
    passwordRepeat,
    isPrivacyPolicyAccepted
  ) {
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
    else if (password.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.password));
    else if (password.length < 6)
      throw new Error(
        language.words.validation.tooShortField.replace("*", language.words.password).replace("**", 6)
      );
    else if (passwordRepeat.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.confirmPassword));
    else if (passwordRepeat.length < 6)
      throw new Error(
        language.words.validation.tooShortField.replace("*", language.words.confirmPassword).replace("**", 6)
      );
    else if (password !== passwordRepeat) throw new Error(language.words.validation.passwordDontMatch);
    else if (!isPrivacyPolicyAccepted) throw new Error(language.words.validation.privacyPolicyMustBeAccepted);
  }

  function onFormSubmit() {
    setFormSubmitting(true);

    try {
      validateInput(
        nameInput,
        surnameInput,
        usernameInput,
        emailInput,
        contactPhoneInput,
        passwordInput,
        confirmPasswordInput,
        isPrivacyPolicyAccepted
      );

      UsersAPI.create({
        name: nameInput,
        surname: surnameInput,
        username: usernameInput,
        email: emailInput,
        contactPhone: contactPhoneInput,
        password: passwordInput,
        passwordRepeat: confirmPasswordInput,
      })
        .then(() => {
          toast.success(language.words.signup.signupSuccess);
          setFormSubmitting(false);
        })
        .catch((err) => {
          toast.error(language.words.signup.signupFail);
          setFormSubmitting(false);
        });
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  return (
    <Page>
      <Section imageURL="https://cinemalux.hopto.org/img/section/section.jpg">
        <Container>
          <div className="col-12">
            <div className="singup__content">
              <Form additionalClasses="singup__form" includeLogo>
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={nameInput}
                      onChange={setNameInput}
                      placeholder={language.words.name}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={surnameInput}
                      onChange={setSurnameInput}
                      placeholder={language.words.surname}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={usernameInput}
                      onChange={setUsernameInput}
                      placeholder={language.words.username}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={emailInput}
                      onChange={setEmailInput}
                      placeholder={language.words.email}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={contactPhoneInput}
                      onChange={setContactPhoneInput}
                      placeholder={language.words.contactPhone}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6"></div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={passwordInput}
                      onChange={setPasswordInput}
                      placeholder={language.words.password}
                      isLoading={isFormSubmitting}
                      type="password"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Input
                      value={confirmPasswordInput}
                      onChange={setConfirmPasswordInput}
                      placeholder={language.words.confirmPassword}
                      isLoading={isFormSubmitting}
                      type="password"
                    />
                  </div>

                  <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                    <Checkbox
                      id="remember"
                      name="remember"
                      label={
                        <span>
                          {language.words.agreeWithTerms}{" "}
                          <Anchor text={language.words.privacyPolicy} href="#" isLoading={isFormSubmitting} />
                        </span>
                      }
                      wrapperClasses="group"
                      checked={isPrivacyPolicyAccepted}
                      onChange={setIsPrivacyPolicyAccepted}
                      isLoading={isFormSubmitting}
                    />
                  </div>

                  <div className="col-12">
                    <Button
                      additionalClasses="signupButton"
                      text={language.words.signup.signUp}
                      isLoading={isFormSubmitting}
                      onClick={onFormSubmit}
                    />
                  </div>
                  <div className="col-12">
                    <SecondaryText additionalClasses="signup-secondaryText">
                      {language.words.signup.alreadyHaveAccount}{" "}
                      <Anchor text={language.words.signup.logIn} href="/login" isLoading={isFormSubmitting} />
                    </SecondaryText>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
};

export default SignUp;
