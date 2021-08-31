import React from "react";

const PartnersSection = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="section__title section__title--no-margin">Our Partners</h2>
          </div>

          <div className="col-12">
            <p className="section__text section__text--last-with-margin">
              It is a long <b>established</b> fact that a reader will be distracted by the readable content of
              a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less
              normal distribution of letters, as opposed to using.
            </p>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/themeforest-light-background.png" alt="" className="partner__img" />
            </a>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/audiojungle-light-background.png" alt="" className="partner__img" />
            </a>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/codecanyon-light-background.png" alt="" className="partner__img" />
            </a>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/photodune-light-background.png" alt="" className="partner__img" />
            </a>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/activeden-light-background.png" alt="" className="partner__img" />
            </a>
          </div>

          <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <a href="#" className="partner">
              <img src="img/partners/3docean-light-background.png" alt="" className="partner__img" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
