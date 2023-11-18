import { Metadata } from "next";

import "./style.scss";

export const metadata: Metadata = {
  title: "Vodiy perfume | Contact",
  description:
    "Vodiy perfume is an e-commerce site developed by Azamat Abraev, a softwaree engineer based in Tashkent, Uzbekistan",
};

const ContactPage = () => {
  return <section>
    <div className="container">
      <h1 className="contact__title">Contact Us</h1>
      <div className="contact__main">
        <div className="contact__info">
          <h2>Contact information</h2>
          <div className="contact__text">
            <p>+1012 3456 789</p>
            <p>azamatabraev03@gmail.com</p>
            <p>12 Muqumiy street, Yunusabad district, Tashkent, Uzbekistan United States</p>
          </div>
        </div>
        <div className="contact__form">
          <form className="admin__account contact__form">
            <div className="profile__row account__row">
              <div className="profile__input">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" placeholder="First name" />
              </div>
              <div className="profile__input">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" placeholder="Last name" />
              </div>
            </div>
            <div className="profile__row">
              <div className="profile__input">
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="Email" />
              </div>
              <div className="profile__input">
                <label htmlFor="phoneNumber">Phone number</label>
                <input type="text" id="phoneNumber" placeholder="Phone number" />
              </div>
            </div>
            <div className="profile__footer">
              <button type="submit" className="profile__save__btn send__btn">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>;
};

export default ContactPage;
