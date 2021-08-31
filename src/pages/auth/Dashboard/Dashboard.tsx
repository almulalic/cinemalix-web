import React, { Fragment, useEffect, useState } from "react";
import { AuthPage, Dashbox, Dashcard, MainContent } from "../../../components";
import { Button } from "../../../elements";

import "./Dashboard.css";

const Dashboard = () => {
  const sortDays = [
    { label: "test", value: 0 },
    { label: "test", value: 1 },
    { label: "test", value: 2 },
  ];
  const [test, setTest] = useState(sortDays[0]);
  const [input, setInput] = useState("");

  const [brojac, setBrojac] = useState(0);

  return (
    <AuthPage>
      <MainContent
        title="Dashboard"
        dropdowns={[
          {
            options: sortDays,
            label: "Sort by:",
            selectedOption: test,
            setSelectedOption: setTest,
            inlineLabel: true,
          },
        ]}
        inputAction={{
          value: input,
          onChange: setInput,
          placeholder: "Search",
          isLoading: false,
          wrapperClasses: "main__title-form",
        }}
        buttonAction={{
          text: "Test",
          onClick: () => {},
          additionalClasses: "main__title-link",
        }}
      >
        <Fragment>
          <Dashcard title="Unique views this month" number={5678} iconClass="bi bi-star-fill" />
          <Dashcard
            title="Items added this month
"
            number={172}
            iconClass="bi bi-star-fill"
          />
          <Dashcard
            title="New comments
"
            number={2573}
            iconClass="bi bi-star-fill"
          />
          <Dashcard
            title="New reviews
"
            number={1021}
            iconClass="bi bi-star-fill"
          />
        </Fragment>
        <Fragment>
          <Dashbox
            iconClass="bi bi-star-fill"
            title="Test"
            onRefreshButtonClicked={() => {}}
            buttonAction={{
              text: "Test",
              onClick: () => {},
              additionalClasses: "main__title-link",
            }}
            table={{
              headers: ["a", "b", "c", "d"],
              data: [
                [
                  {
                    type: "user",
                    value: {
                      imageURL: "https://cinemalux.hopto.org/img/user.svg",
                      fullName: "Almir Mulalic",
                      email: "almir.mulalic.am@gmail.com",
                    },
                  },
                  {
                    type: "number",
                    value: 1,
                  },
                  {
                    type: "string",
                    value: "strng",
                  },
                  {
                    type: "boolean",
                    value: false,
                  },
                ],
              ],
            }}
          />
          <Dashbox
            iconClass="bi bi-star-fill"
            title="Test"
            onRefreshButtonClicked={() => {}}
            buttonAction={{
              text: "Test",
              onClick: () => {},
              additionalClasses: "main__title-link",
            }}
            table={{
              headers: ["a", "b", "c", "d"],
              data: [
                [
                  {
                    type: "user",
                    value: {
                      imageURL: "",
                      fullName: "Almir Mulalic",
                      email: "almir.mulalic.am@gmail.com",
                    },
                  },
                  {
                    type: "number",
                    value: 1,
                  },
                  {
                    type: "string",
                    value: "strng",
                  },
                  {
                    type: "boolean",
                    value: false,
                  },
                ],
              ],
            }}
          />

          <Dashbox
            iconClass="bi bi-star-fill"
            title="Test"
            onRefreshButtonClicked={() => {}}
            buttonAction={{
              text: "Test",
              onClick: () => {},
              additionalClasses: "main__title-link",
            }}
            table={{
              headers: ["a", "b", "c", "d"],
              data: [
                [
                  {
                    type: "user",
                    value: {
                      imageURL: "",
                      fullName: "Almir Mulalic",
                      email: "almir.mulalic.am@gmail.com",
                    },
                  },
                  {
                    type: "number",
                    value: 1,
                  },
                  {
                    type: "string",
                    value: "strng",
                  },
                  {
                    type: "boolean",
                    value: false,
                  },
                ],
              ],
            }}
          />
          <Dashbox
            iconClass="bi bi-star-fill"
            title="Test"
            onRefreshButtonClicked={() => {}}
            buttonAction={{
              text: "Test",
              onClick: () => {},
              additionalClasses: "main__title-link",
            }}
            table={{
              headers: ["a", "b", "c", "d"],
              data: [
                [
                  {
                    type: "user",
                    value: {
                      imageURL: "",
                      fullName: "Almir Mulalic",
                      email: "almir.mulalic.am@gmail.com",
                    },
                  },
                  {
                    type: "number",
                    value: 1,
                  },
                  {
                    type: "string",
                    value: "strng",
                  },
                  {
                    type: "boolean",
                    value: false,
                  },
                ],
              ],
            }}
          />
        </Fragment>
      </MainContent>
    </AuthPage>
  );
};

export default Dashboard;
