import React, { useEffect, useState } from "react";
import { AuthPage, MainContent } from "../../../components";
import { Button, Input, RadioInput } from "../../../elements";
import { EmployeeAPI, genresApi, HallsAPI, TypesAPI } from "../../../api";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import Dropdown from "../../../elements/Dropdown/Dropdown";

const AddEmployee = () => {
  const [nameInput, setNameInput] = useState("");
  const [surnameInput, setSurnameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [bornAtInput, setBornAt] = useState({
    year: DateTime.now().year,
    month: DateTime.now().month,
    day: DateTime.now().day,
  });
  const [addressInput, setAddressInput] = useState("");
  const [contactPhoneInput, setContactPhoneInput] = useState("");
  const [salary, setSalary] = useState("");

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const [selectedRole, setSelectedRole] = useState({ label: "-", value: -1 });

  const roleOptions = [
    {
      label: "Administrator",
      value: 4,
    },
    {
      label: "Menadžer",
      value: 3,
    },
    {
      label: "Radnik",
      value: 2,
    },
    {
      label: "Volonter",
      value: 1,
    },
  ];

  const onFormSubmit = () => {
    setFormSubmitting(true);
    EmployeeAPI.add({
      name: nameInput,
      surname: surnameInput,
      username: usernameInput,
      email: emailInput,
      contactPhone: contactPhoneInput,
      bornAt: Number(
        bornAtInput.year.toString() +
          (bornAtInput.month < 10 ? "0" + bornAtInput.month : bornAtInput.month.toString()) +
          bornAtInput.day.toString()
      ),
      password: passwordInput,
      role: selectedRole.value,
      address: addressInput,
      key: "access",
      salary: salary,
    })
      .then(() => {
        toast.success("Uspješno dodano");
        setFormSubmitting(false);
      })
      .catch(() => {
        toast.error("Server error");
        setFormSubmitting(false);
      });
  };

  return (
    <AuthPage>
      <MainContent title="Dodaj zaposlenog" additionalClassNames="form-center">
        <form className="form addHallForm">
          <div className="row">
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={nameInput}
                onChange={setNameInput}
                placeholder="Ime"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={surnameInput}
                onChange={setSurnameInput}
                placeholder="Prezime"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={usernameInput}
                onChange={setUsernameInput}
                placeholder="Username"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={emailInput}
                onChange={setEmailInput}
                placeholder="Email"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={passwordInput}
                onChange={setPasswordInput}
                placeholder="Lozinka"
                isLoading={isFormSubmitting}
                type="password"
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={contactPhoneInput}
                onChange={setContactPhoneInput}
                placeholder="Kontakt Telefon"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Input
                wrapperClasses="form__input"
                value={salary}
                onChange={setSalary}
                placeholder="Plata"
                isLoading={isFormSubmitting}
              />
            </div>
            <div className="screeningFormRow col-lg-12">
              <Dropdown
                label="Uloga"
                options={roleOptions}
                selectedOption={selectedRole}
                setSelectedOption={setSelectedRole}
              />
            </div>
          </div>

          <Button text="Posalji" onClick={onFormSubmit} />
        </form>
      </MainContent>
    </AuthPage>
  );
};

export default AddEmployee;
