import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";

import { useIntersectionObserver } from "../scroll-animations/watchElementsIntoView.ts";
import "../css/global.module.css";
import Header from "../components/Header/Header";

// styles
const pageStyles = {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  color: "#fff",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const SectionContainer = styled.div`
  /* max-width: 1200px; */
  max-width: 100%;
  display: flex;
  flex: 1;
  padding: 50px 20px;
  justify-content: center;
  div {
    flex: 1 1 0px;
    padding: 20px 40px;
  }
  @media (max-width: 1100px) {
    flex-direction: column;
    div {
      padding: 5px 10px;
    }
  }
`;

const InvertedSectionContainer = styled.div`
  /* max-width: 1200px; */
  max-width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 50px 20px;
  justify-content: center;
  div {
    flex: 1 1 0px;
    padding: 20px 40px;
  }
  @media (max-width: 1100px) {
    flex-direction: row;
    div {
      padding: 5px 10px;
    }
  }
`;

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    style={{ width: "2rem" }}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "2rem" }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "2rem" }}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

// markup
const IndexPage = () => {
  // const image = getImage(data.file);
  const { init } = useIntersectionObserver();
  React.useEffect(() => {
    init();
  }, []);

  return (
    <main style={pageStyles}>
      <title>Home Page</title>
      <Header />
      <SectionContainer
        style={{
          backgroundColor: "#fff",
          color: "rgb(1, 13, 41)",
          marginTop: 20,
        }}
        id="home-section"
      >
        <div>
          <StaticImage src="../images/plumbing1.jpeg" alt="plumbing-pic" />
        </div>
        <div>
          <h1>Some header here</h1>
          <p style={{ color: "rgb(1, 13, 41)" }}>
            May have some text here. May have some text here. May have some text
            here. May have some text here. May have some text here.
          </p>
        </div>
      </SectionContainer>
      <SectionContainer id="about-section">
        <div>
          <h1>Who we are?</h1>
          <p>
            May have some text here. May have some text here. May have some text
            here. May have some text here. May have some text here. May have
            some text here.
          </p>
        </div>
        <div
          data-scroll="fade-in"
          data-scroll-duration="1000"
          dat-scroll-delay="400"
          data-scroll-easing="ease"
        >
          <StaticImage
            src="../images/plumber-fixing-pipe.jpg"
            alt="plumbing-pic-2"
          />
        </div>
      </SectionContainer>
      <SectionContainer
        style={{ backgroundColor: "#fff", color: "rgb(1, 13, 41)" }}
        id="services-section"
      >
        <div
          data-scroll="fade-in"
          data-scroll-duration="1000"
          dat-scroll-delay="400"
          data-scroll-easing="ease"
        >
          <StaticImage src="../images/plumbing4.webp" alt="plumbing-pic-2" />
        </div>
        <div>
          <h1>Our Services</h1>
          <p style={{ color: "rgb(1, 13, 41)" }}>Service 1</p>
          <p style={{ color: "rgb(1, 13, 41)" }}>Service 2</p>
          <p style={{ color: "rgb(1, 13, 41)" }}>Service 3</p>
          <p style={{ color: "rgb(1, 13, 41)" }}>Service 4</p>
        </div>
      </SectionContainer>
      <InvertedSectionContainer className="hide-on-mobile" id="contact-section">
        <div>
          <h1>Contact Us</h1>
        </div>
        <div style={{ display: "flex" }}>
          <span style={{ display: "flex", alignItems: "center" }}>
            <LocationIcon />
            <a
              href="https://goo.gl/maps/gF85iKdbH4uTdmbTA"
              target="_blank"
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              3650 NW 36th St, Miami, FL 33142
            </a>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", marginLeft: 50 }}
          >
            <PhoneIcon />
            <a
              href="tel:+17868030698"
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              7868030698
            </a>
          </span>
          <span
            style={{ display: "flex", alignItems: "center", marginLeft: 50 }}
          >
            <EmailIcon />
            <a
              href="mailto:testerson@gmail.com"
              style={{ marginLeft: 10, marginTop: 10 }}
            >
              testerson@gmail.com
            </a>
          </span>
          {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3591.853670632837!2d-80.25776145012338!3d25.80840118353516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b0b54a7fcc8d%3A0x881e34119fc0de59!2s3650%20NW%2036th%20St%2C%20Miami%2C%20FL%2033142!5e0!3m2!1sen!2sus!4v1648722506295!5m2!1sen!2sus" width="600" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
        </div>
      </InvertedSectionContainer>
      <SectionContainer className="show-on-mobile">
        <div>
          <h1>Contact Us</h1>
        </div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <LocationIcon />
          <a
            href="https://goo.gl/maps/gF85iKdbH4uTdmbTA"
            target="_blank"
            style={{ marginLeft: 10, marginTop: 10 }}
          >
            3650 NW 36th St, Miami, FL 33142
          </a>
        </span>
        <span style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <PhoneIcon />
          <a href="tel:+17868030698" style={{ marginLeft: 10, marginTop: 10 }}>
            7868030698
          </a>
        </span>
        <span style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <EmailIcon />
          <a
            href="mailto:testerson@gmail.com"
            style={{ marginLeft: 10, marginTop: 10 }}
          >
            testerson@gmail.com
          </a>
        </span>
      </SectionContainer>
    </main>
  );
};

export default IndexPage;
