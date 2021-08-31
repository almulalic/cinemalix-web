import React from "react";
import { useSelector } from "react-redux";
import { Container, Section } from "..";
import { Card } from "../../elements";

const TopOffers = () => {
  const mockMovies = [
    {
      id: 1,
      imageURL: require("../../assets/img/covers/cover.jpg"),
      title: "I Dream in Another Language",
      genres: ["Action", "Triler"],
      rating: 8.4,
    },
    {
      id: 2,
      imageURL: require("../../assets/img/covers/cover2.jpg"),
      title: "Benched",
      genres: ["Comedy"],
      rating: 7.1,
    },
    {
      id: 3,
      imageURL: require("../../assets/img/covers/cover3.jpg"),
      title: "Whitney",
      genres: ["Romance", "Drama"],
      rating: 6.3,
    },
    {
      id: 4,
      imageURL: require("../../assets/img/covers/cover4.jpg"),
      title: "Blindspotting",
      genres: ["Comedy", "Drama"],
      rating: 7.9,
    },
  ];

  const language = useSelector((state: any) => state.language);

  return (
    <Section imageURL="">
      <Container title={language.words.landing.topOffers}>
        {mockMovies.map((x) => {
          return <Card id={x.id} key={x.id} imageURL={x.imageURL} heading={x.title} subtext={"Hello"} />;
        })}

        <div className="col-12">
          <a href="#" className="section__btn">
            {language.words.showMore}
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default TopOffers;
