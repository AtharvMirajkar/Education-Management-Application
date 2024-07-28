import React from "react";
import { Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
// import Sidebar from "./Sidebar";
import Dashboard from "../Dashboard";

const DeveloperDashboard = () => {
  const cards = [
    {
      image:
        "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "See latest news",
      description:
        "Locate articles and breaking news headlines from news sources and blogs across the web with our JSON API",
      buttonText: "View",
      link: "/news",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1661761077411-d50cba031848?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Add Your Notes",
      description:
        "Make your own notes on this page, write your quick thoughts on this page",
      buttonText: "View",
      link: "/notes",
    },
    {
      image:
        "https://img.freepik.com/free-vector/weather-concept-illustration_114360-1234.jpg?w=826&t=st=1715939101~exp=1715939701~hmac=3ee79767cb42c9b1159a3b6895b930b4530296bc30a5291460534db8a60af526",
      title: "Weather in Kolhapur",
      description: "It show the current temperature of the Kolhapur city",
      buttonText: "View",
      link: "/weather",
    },
    {
      image:
        "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "To-Do App",
      description:
        "You can maintain your to-do list in our app. This Todo app can Add, Update, Delete your tasks that you add in daily Todo list.",
      buttonText: "View",
      link: "/todo",
    },
  ];

  return (
    <>
      <Dashboard title="Developer Dashboard" cards={cards} />;
    </>
  );
};

export default DeveloperDashboard;
