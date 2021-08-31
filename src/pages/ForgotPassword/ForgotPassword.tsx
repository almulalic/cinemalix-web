import React, { useState } from "react";

import "./ForgotPassword.css";
import { Container, Form, Page, Section } from "../../components";
import { Button, Input } from "../../elements";

const ForgotPassword = () => {
  const [emailInput, setEmailInput] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function onSubmit() {
    setFormSubmitting(true);
  }
  console.log(isFormSubmitting);
  return (
    <Page>
      <Section imageURL="https://cinemalux.hopto.org/img/section/section.jpg">
        <Container>
          <div className="col-12">
            <div className="forgotPassword__content">
              <Form additionalClasses="forgotPassword forgotPassword__form">
                <h4>Forgot your password?</h4>

                <div className="forgotPassword__group">
                  <Input
                    value={emailInput}
                    onChange={setEmailInput}
                    placeholder="Email"
                    isLoading={isFormSubmitting}
                  />
                </div>

                <Button text={"Submit"} onClick={onSubmit} isLoading={isFormSubmitting} />
                <span className="forgotPassword__text">
                  If this email matches to any account <br /> we will send you an email
                </span>
              </Form>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
};

export default ForgotPassword;
