import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Spinner,
} from "reactstrap";

const NewsApp = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   document.title = "Top 10 news of us business";
  // }, []);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Make a GET request to the news API
        const response = await fetch(
          "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=169b7613aa21444f93eea0e25146a634"
        );

        // Parse the JSON response
        const data = await response.json();

        // Set the fetched news data to the state
        setNews(data.articles.slice(0, 10));
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews(); // Call the fetchNews function when the component mounts
  }, []); // Empty dependency array means this effect runs only once, when component mounts

  return (
    <div className="container margin-top-bottom">
      <h1 className="text-center mt-4 mb-4">Latest News</h1>
      {loading ? (
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      ) : (
        <div className="col-md-10 mx-auto">
          {news.map((article, index) => (
            <Card body className="my-2 mt-4 " key={index}>
              <CardTitle tag="h5">{article.title}</CardTitle>
              <CardText>{article.description}</CardText>

              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Go to article
              </a>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsApp;
