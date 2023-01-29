import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import projImg1 from "../assets/img/forth project.jpg";
import projImg2 from "../assets/img/second work.jpg";
import projImg3 from "../assets/img/project1.jpg";
import projImg4 from "../assets/img/first work.jpg";
import projImg5 from "../assets/img/fifth work.jpg";
import projImg6 from "../assets/img/12345.jpg";
import colorSharp2 from "../assets/img/color-sharp2.png";
import DALLE from "../assets/img/DALLE.png";
import dalle1 from "../assets/gold/DALL·E 2023-01-29 03.23.01 - Create an image of a robot with a human face, digital art.png";
import dalle2 from "../assets/gold/DALL·E 2023-01-29 03.22.00 - Generate an image of a robot riding a bike, digital art.png";
import dalle3 from "../assets/silver/DALL·E 2023-01-29 03.32.21 - Generate an image of a robot riding a jet_, digital art.png";
import dalle4 from "../assets/gold/DALL·E 2023-01-29 03.31.21 - Generate an image of a robot riding a bike, digital art.png";
import dalle5 from "../assets/silver/DALL·E 2023-01-29 04.00.17 - Create a picture of a steampunk airship, soaring through the clouds with gears and pipes exposed, digital art.png";

import "animate.css";
import TrackVisibility from "react-on-screen";

export const Projects = () => {
  const projects1 = [
    {
      description: "Silver #1",
      imgUrl: DALLE,
    },
    {
      description: "Silver #2",
      imgUrl: dalle1,
    },
    {
      description: "Silver #3",
      imgUrl: dalle2,
    },
    {
      description: "Silver #4",
      imgUrl: dalle3,
    },
    {
      description: "Silver #5",
      imgUrl: dalle4,
    },
    {
      description: "Silver #6",
      imgUrl: dalle5,
    },
  ];

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Our NFT Collection</h2>
                  <p>We add new NFTs every alternate day</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Silver</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Gold</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Legendary</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects1.map((project, index) => {
                            return <ProjectCard key={index} {...project} />;
                          })}
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>Coming Soon</Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>Coming Soon</Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2}></img>
    </section>
  );
};
