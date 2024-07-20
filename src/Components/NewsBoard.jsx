// import { useEffect } from "react";
// import { useState } from "react"
// import NewsItem from "./NewsItem";

// const NewsBoard = ({category}) => {

// const[articles, setArticles] = useState([]);
// const[error, setError] = useState(null);

// useEffect(()=>{
//   const apiKey = import.meta.env.VITE_API_KEY;
//     let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;

//     fetch(url)
//     .then(response=> response.json())
//     .then(data=> setArticles(data.articles));
// }, [category])

//   return (
//     <div>
//         <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
//       {articles.map((news, index)=>(
//          <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
//       ))}
//     </div>
//   );
// };

// export default NewsBoard;


import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const NewsBoard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setArticles(data.articles))
      .catch(error => {
        setError(error.toString());
        console.error('There was a problem with the fetch operation:', error);
      });
  }, [category]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Latest <span className="badge bg-danger">News</span></h2>
      {articles.length > 0 ? (
        articles.map((news, index) => (
          <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url} />
        ))
      ) : (
        <p className="text-center">No news available</p>
      )}
    </div>
  );
};

export default NewsBoard;
