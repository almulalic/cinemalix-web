import { useSelector } from "react-redux";
import React, { Fragment, useEffect, useState } from "react";
import { AuthPage, MainContent } from "../../../components";
import { Button, Input, RadioInput } from "../../../elements";
import { TypesAPI } from "../../../api";
import { toast } from "react-toastify";
import "./AddType.css";
import { DateTime } from "luxon";
import { Calendar } from "react-modern-calendar-datepicker";

const addType = (props) => {
  const language = useSelector((state: any) => state.language);
  const [isEdit, setIsEdit] = useState(false);
  //#region Inputs

  const [codeInput, setCodeInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [ticketPriceInput, setTicketPriceInput] = useState("");
  const [discountPercentageInput, setDiscountPercentageInput] = useState("");

  const [expiresOn, setExpiresOn] = useState({
    day: DateTime.now().day,
    month: DateTime.now().month,
    year: DateTime.now().year,
  });
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const renderCustomInput = (
    <div
      className={`input datePicker-input datePicker-forminput`}
      onClick={() => setCalendarVisible(!isCalendarVisible)}
    >
      {language.words.days[expiresOn.day % 7]}
      {" -"} {expiresOn.day}
      {" /"} {expiresOn.month}
      {" /"} {expiresOn.year}
    </div>
  );

  //#endregion

  //#region Type selector

  const typesOptions = [
    {
      label: language.words.addType.ticket,
      value: 0,
    },
    {
      label: language.words.addType.reservation,
      value: 1,
    },
    {
      label: language.words.addType.payment,
      value: 2,
    },
    {
      label: language.words.addType.discount,
      value: 3,
    },
  ];

  const [selectedType, setSelectedType] = useState(typesOptions[0]);

  useEffect(() => {
    setCodeInput("");
    setNameInput("");
    setDiscountPercentageInput("");
  }, [selectedType]);

  //#endregion

  //#region From Submit

  //#region Is Edit

  useEffect(() => {
    if (props.match.params.type && props.match.params.code) {
      let type = props.match.params.type;

      if (type == "ticket") {
        TypesAPI.getTicketTypes().then((res) => {
          setSelectedType(typesOptions[0]);
          let type = res.data.find((x) => x.code == props.match.params.code);

          setTimeout(() => {
            setCodeInput(type.code);
            setNameInput(type.description);
            setTicketPriceInput(type.price);
          }, 500);
        });
      } else if (type == "reservation") {
        TypesAPI.getReservationGrid(9999, 0, "").then((res) => {
          setSelectedType(typesOptions[1]);
          let type = res.data.rows.find((x) => x.code == props.match.params.code);

          setTimeout(() => {
            setCodeInput(type.code);
            setNameInput(type.name);
          }, 500);
        });
      } else if (type == "payment") {
        TypesAPI.getPaymentGrid(9999, 0, "").then((res) => {
          setSelectedType(typesOptions[2]);
          let type = res.data.rows.find((x) => x.code == props.match.params.code);

          setTimeout(() => {
            setCodeInput(type.code);
            setNameInput(type.name);
          }, 500);
        });
      } else if (type == "discount") {
        TypesAPI.getDiscountGrid(9999, 0, "").then((res) => {
          setSelectedType(typesOptions[3]);
          let type = res.data.rows.find((x) => x.code == props.match.params.code);
          let date = DateTime.fromISO(type.expiresOn);

          setTimeout(() => {
            setCodeInput(type.code);
            setNameInput(type.description);
            setDiscountPercentageInput(type.discountPct);
            setExpiresOn({
              day: date.day,
              month: date.month,
              year: date.year,
            });
          }, 500);
        });
      }

      setIsEdit(true);
    }
  }, []);

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function validate(code, name, discountPct = 1) {
    if (code.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addType.code));
    else if (code.length > 16)
      throw new Error(
        language.words.validation.tooLongField
          .replace("*", language.words.addType.code)
          .replace("**", language.words.addType.code)
      );
    else if (name.length === 0)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addType.name));
    else if (name.length > 32)
      throw new Error(
        language.words.validation.tooLongField
          .replace("*", language.words.addType.name)
          .replace("**", language.words.addType.name)
      );
  }

  function onFormSubmit() {
    setFormSubmitting(true);

    try {
      if (selectedType.value !== 3) {
        validate(codeInput, nameInput);

        if (selectedType.value == 0) {
          if (ticketPriceInput.length == 0)
            throw new Error(
              language.words.validation.emptyField.replace("*", language.words.addType.discount)
            );
          else if (Number(ticketPriceInput) < 0)
            throw new Error(
              language.words.validation.outOfRange
                .replace("*", language.words.addType.discount)
                .replace("**", "0")
                .replace("***", "inf")
            );

          TypesAPI.addTicket({
            code: codeInput,
            description: nameInput,
            price: ticketPriceInput,
          })
            .then(() => {
              toast.success(
                language.words.addType.success.replace("*", language.words.addType.ticket.toLowerCase())
              );
              setFormSubmitting(false);
            })
            .catch(() => {
              toast.error("Greska na serveru");
              setFormSubmitting(false);
            });
        } else if (selectedType.value == 1)
          TypesAPI.addReservationType({
            code: codeInput,
            name: nameInput,
          })
            .then(() => {
              toast.success(
                language.words.addType.success.replace("*", language.words.addType.reservation.toLowerCase())
              );
              setFormSubmitting(false);
            })
            .catch(() => {
              toast.error("Greska na serveru");
              setFormSubmitting(false);
            });
        else if (selectedType.value == 2)
          TypesAPI.addPaymentType({
            code: codeInput,
            name: nameInput,
          })
            .then(() => {
              toast.success(
                language.words.addType.success.replace("*", language.words.addType.payment.toLowerCase())
              );
              setFormSubmitting(false);
            })
            .catch(() => {
              toast.error("Greska na serveru");
              setFormSubmitting(false);
            });
      } else {
        validate(codeInput, nameInput);

        if (discountPercentageInput.length == 0)
          throw new Error(language.words.validation.emptyField.replace("*", language.words.addType.discount));
        else if (Number(discountPercentageInput) < 0 || Number(discountPercentageInput) > 100)
          throw new Error(
            language.words.validation.outOfRange
              .replace("*", language.words.addType.discount)
              .replace("**", "0")
              .replace("**", "100")
          );

        TypesAPI.addDiscountType({
          code: codeInput,
          description: nameInput,
          discountPct: discountPercentageInput,
          expiresOn: `${expiresOn.year}/${expiresOn.month}/${expiresOn.day}`,
        })
          .then(() => {
            toast.error(
              language.words.addType.success.replace("*", language.words.addType.discount.toLowerCase())
            );
            setFormSubmitting(false);
          })
          .catch(() => {
            toast.error("Greska na serveru");
            setFormSubmitting(false);
          });
      }
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  //#endregion

  return (
    <AuthPage>
      <MainContent
        title={isEdit ? language.words.authHeaders.editType : language.words.addType.header}
        additionalClassNames="form-center"
      >
        <form className="form addTypeForm">
          <div className="row">
            <div className="screeningFormRow col-lg-12">
              <RadioInput
                options={typesOptions}
                setSelected={setSelectedType}
                selected={selectedType}
                label="Tipovi"
              />
            </div>
            <div className="col-lg-12">
              <h4>
                {language.words.addType.addType} {selectedType.label}
              </h4>
            </div>
            <div className="col-lg-12">
              <div className="row">
                <div className="screeningFormRow col-lg-12">
                  <Input
                    wrapperClasses="form__input"
                    value={codeInput}
                    onChange={setCodeInput}
                    placeholder={language.words.addType.code}
                    isLoading={isFormSubmitting}
                  />
                </div>
                <div className="screeningFormRow col-lg-12">
                  <Input
                    wrapperClasses="form__input"
                    value={nameInput}
                    onChange={setNameInput}
                    placeholder={language.words.addType.name}
                    isLoading={isFormSubmitting}
                  />
                </div>

                {selectedType.value == 0 && (
                  <div className="screeningFormRow col-lg-12">
                    <Input
                      wrapperClasses="form__input"
                      value={ticketPriceInput}
                      onChange={setTicketPriceInput}
                      placeholder={language.words.addType.ticketPrice}
                      isLoading={isFormSubmitting}
                    />
                  </div>
                )}

                {selectedType.value == 3 && (
                  <>
                    <div className="screeningFormRow col-lg-12">
                      {renderCustomInput}
                      <Calendar
                        value={expiresOn}
                        onChange={(e) => {
                          setCalendarVisible(false);
                          setExpiresOn({
                            day: e.day,
                            month: e.month,
                            year: e.year,
                          });
                        }}
                        shouldHighlightWeekends
                        calendarClassName={`calendar ${
                          isCalendarVisible ? "calendar-visible" : "calendar-hidden"
                        }`}
                        colorPrimary="#FFD700"
                        colorPrimaryLight="#ff55a480"
                      />
                    </div>
                    <div className="screeningFormRow col-lg-12">
                      <Input
                        wrapperClasses="form__input"
                        value={discountPercentageInput}
                        onChange={setDiscountPercentageInput}
                        placeholder={language.words.addType.discountPct}
                        isLoading={isFormSubmitting}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <Button text={language.words.submit} onClick={onFormSubmit} />
        </form>
      </MainContent>
    </AuthPage>
  );
};

export default addType;
