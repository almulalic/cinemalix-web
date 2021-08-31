import React, { useState } from "react";
import { Container, Page, Section, TabMenu } from "../../../components";
import { Button, Input } from "../../../elements";

import "./Profile.css";

import { ChangePasswordForm, ProfileDetailsForm, ProfileReviews } from "./components";
import { auth } from "../../../api";
import { useSelector } from "react-redux";

const Profile = () => {
  const currentUser = auth.getCurrentUser();

  const [userData, setUserData] = useState({
    id: currentUser.id,
    username: currentUser.username,
    email: currentUser.email,
    fullName: `${currentUser.name} ${currentUser.surname}`,
    contactPhone: currentUser.contactPhone,
    role: currentUser.role,
  });

  const [selectedTab, setSelectedTab] = useState(0);
  const language = useSelector((state: any) => state.language);

  return (
    <Page>
      <Section first additionalClasses="profileSection" imageURL="">
        <Container title={language.words.profile.myProfile} />
      </Section>

      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="profile__content">
                <div className="profile__user">
                  <div className="profile__avatar">
                    <img src={require("../../../assets/img/user.svg")} alt="" />
                  </div>

                  <div className="profile__meta">
                    <h3>{userData.username}</h3>
                  </div>
                </div>

                <TabMenu
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  labels={[
                    language.words.headers.profile,
                    language.words.headers.review,
                    language.words.headers.reservation,
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {selectedTab === 0 ? (
          <div className="row">
            <div className="col-12 col-lg-6">
              <ProfileDetailsForm />
            </div>

            <div className="col-12 col-lg-6">
              <ChangePasswordForm />
            </div>
          </div>
        ) : (
          <ProfileReviews />
        )}
      </div>
    </Page>
  );
};

export default Profile;
