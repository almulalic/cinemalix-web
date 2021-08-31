import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import auth from "../../api/auth";
import { Container, Form, Section } from "../../components";
import Page from "../../components/Page/Page";
import { Anchor, Button, Checkbox, Input, SecondayText } from "../../elements";

import "./Login.css";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = () => {
  const [isFormSubmitting, setFormSubmitting] = useState(false);
  const [credentialInput, setCredentialInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const history = useHistory();

  const language = useSelector((state: any) => state.language);

  function validateInput(credential, password) {
    if (credential.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.login.credential));
    else if (password.length <= 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.password));
    else if (password.length < 6)
      throw new Error(
        language.words.validation.tooShortField.replace("*", language.words.password).replace("**", 6)
      );
  }

  function onFormSubmit() {
    setFormSubmitting(true);

    try {
      if (passwordInput !== "test") validateInput(credentialInput, passwordInput);

      auth
        .login(credentialInput, passwordInput)
        .then((res) => {
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
          toast.success("Login uspješan");
          history.push("/landing");
          setFormSubmitting(false);
        })
        .catch((err) => {
          toast.error("Login nije uspješan");
          setPasswordInput("");
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
            <div className="login__content">
              <Form additionalClasses="login__form" includeLogo>
                <Input
                  value={credentialInput}
                  onChange={setCredentialInput}
                  placeholder={language.words.credential}
                  isLoading={isFormSubmitting}
                />

                <Input
                  value={passwordInput}
                  onChange={setPasswordInput}
                  placeholder={language.words.password}
                  isLoading={isFormSubmitting}
                  type="password"
                />

                <Checkbox
                  id="rememberMe"
                  name="rememberMe"
                  label={language.words.login.rememberMe}
                  isLoading={isFormSubmitting}
                  checked={rememberMe}
                  onChange={setRememberMe}
                  additionalClasses="group"
                />

                <Button
                  text={language.words.login.loginButton}
                  onClick={onFormSubmit}
                  isLoading={isFormSubmitting}
                />

                <SecondayText text={language.words.login.dontHaveAccount}>
                  <Anchor text={language.words.login.signUp} href="/singup" isLoading={isFormSubmitting} />
                </SecondayText>

                <SecondayText>
                  <Anchor
                    text={language.words.login.forgotPassword}
                    href="/forgotPassword"
                    isLoading={isFormSubmitting}
                  />
                </SecondayText>
              </Form>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
};

export default Login;
