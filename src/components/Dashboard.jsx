import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import { Link } from "react-router-dom";

const Dashboard = ({ title, cards }) => {
  return (
    <>
      <div className="container margin-top-bottom">
        <h1 className="text-center display-6">{title}</h1>
        <div className="d-flex justify-content-around flex-wrap mt-5 mb-5">
          {cards.map((card, index) => (
            <Card
              key={index}
              style={{
                width: "18rem",
                marginTop: "20px",
              }}
            >
              <div
                className="card-image"
                style={{
                  backgroundImage: `url(${card.image})`,
                  backgroundSize: "cover",
                  height: "180px", // Adjust as needed
                }}
              ></div>

              <CardBody className="d-flex flex-column justify-content-between align-items-center">
                <CardTitle tag="h5">{card.title}</CardTitle>
                <CardText className="text-center">{card.description}</CardText>
                <Link to={card.link}>
                  <button className="btn my-btn2">{card.buttonText}</button>
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
