import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/odina2.png";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.svg";
import navIcon3 from "../assets/img/nav-icon3.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className=" d-flex justify-content-between align-items-center">
          <Col size={12} sm={6}>
            <span className="font-weight-bold text-white">Huddle</span>
            <span className="text-sm-right text-primary font-weight-bold">
              07
            </span>
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <p>Thank you for attention</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
