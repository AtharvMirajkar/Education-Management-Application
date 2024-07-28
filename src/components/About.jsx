import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div style={{ marginBottom: "120px" }}>
      <Container>
        {/* About us*/}
        <section className="py-4">
          <Row className="align-items-center">
            <Col md={6}>
              <img
                src="https://img.freepik.com/free-vector/isometric-online-education-round-concept-with-devices-online-training-graduation-cap-students-books-magnifier-alarm-clock-backpack-certificate-pencil-illustration_1284-51233.jpg?t=st=1719495901~exp=1719499501~hmac=10acde1182bae65382558f37d83aaa7713a007be20fdbe49697cd0d7954e24d6&w=740"
                alt="About"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <div className="p-4">
                <h2 className="mb-4">About Us</h2>
                <p>
                  Welcome to our website, your ultimate destination for
                  efficient education management solutions. We specialize in
                  providing a comprehensive platform designed to streamline
                  educational administration processes, catering specifically to
                  the needs of administrators, students, and faculty members
                  alike.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Mission */}
        <section className="mission-section py-4">
          <Row className="align-items-center">
            <Col md={6} className="order-md-2">
              <img
                src="https://img.freepik.com/free-vector/qualification-increase-course-skills-improvement-coaching-professional-development-school-authority-initiative-training-teachers-concept_335657-816.jpg?t=st=1719495759~exp=1719499359~hmac=e627e7cf3f26d97a819c9a3a9154792be8ba5060da99f06aecb52b0141e4780f&w=740"
                alt="Mission"
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6} className="order-md-1">
              <div className="p-4">
                <h2 className="mb-4">Our Mission</h2>
                <p>
                  Our mission is to revolutionize the way educational
                  institutions manage their daily operations. We aim to simplify
                  administrative tasks, enhance communication channels, and
                  empower educators and learners to achieve their full
                  potential.
                </p>
              </div>
            </Col>
          </Row>
        </section>

        {/* Why choose us */}
        <section className="py-4">
          <Row className="align-items-center">
            <Col md={6} className="order-md-1">
              <img
                src="https://img.freepik.com/free-vector/man-working-with-computer-people-talking_1262-19832.jpg?t=st=1719496273~exp=1719499873~hmac=a4a76e19645c19eb12798adfbe3e1de0d14e0b313151cf48b71fe4fda946d3d9&w=740"
                alt="Mission"
                className="img-fluid rounded-1"
              />
            </Col>
            <Col md={6} className="order-md-2">
              <div className="p-4">
                <h2 className="mb-4">Why Choose Us?</h2>
                <p>
                  Whether you represent a school, college, or university, our
                  platform is designed to cater to your specific needs. Embrace
                  the next generation of education management with us.
                </p>
                <Link to="/contact">
                  <Button variant="primary">Contact Us</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </section>

        {/* What We Offer Section */}
        <div className="my-5">
          <h2 className="text-center mb-5">What We Offer</h2>
          <Row
            xs={1}
            md={2}
            lg={3}
            className="d-flex justify-content-evenly mx-4 g-4"
          >
            {/* Administrative Tools */}
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mb-3">
                    Administrative Tools
                  </Card.Title>
                  <Card.Text className="text-center">
                    Our platform equips administrators with powerful tools to
                    effortlessly manage student and faculty profiles,
                    assignments, attendance, courses, and results.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Efficient Communication */}
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mb-3">
                    Efficient Communication
                  </Card.Title>
                  <Card.Text className="text-center">
                    Facilitating seamless communication between administrators,
                    faculty members, and students through integrated
                    notification systems.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Comprehensive Student Management */}
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mb-3">
                    Comprehensive Student Management
                  </Card.Title>
                  <Card.Text className="text-center">
                    From enrollment to graduation, our platform supports the
                    entire student lifecycle, ensuring a smooth and organized
                    experience.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Empowering Educators */}
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mb-3">
                    Empowering Educators
                  </Card.Title>
                  <Card.Text className="text-center">
                    Providing faculty members with the resources they need to
                    create, manage, and grade assignments, track attendance, and
                    monitor student progress effectively.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Enhanced Learning Experience */}
            <Col>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title className="text-center mb-3">
                    Enhanced Learning Experience
                  </Card.Title>
                  <Card.Text className="text-center">
                    Enabling students to access course materials, submit
                    assignments, track their progress, and receive timely
                    updates and notifications.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
