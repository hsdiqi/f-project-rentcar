import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/pages/index.css";

function generateLoremIpsum() {
  return "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec odio eget urna fringilla gravida sed eu libero. Sed non risus. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Aliquam erat volutpat. Aenean id metus id velit ullamcorper pulvinar. Nullam ac nisi non eros gravida tempor. Morbi mollis tellus ac sapien. Aliquam erat volutpat. Aenean id metus id velit ullamcorper pulvinar. Nullam ac nisi non eros gravida tempor. Morbi mollis tellus ac sapien.";
}

function Reviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/reviews")
      .then((response) => {
        console.log("Data response:", response.data); // Tambahkan log untuk melihat data respons
        if (Array.isArray(response.data.reviewss)) {
          setReviews(response.data.reviewss); // Mengatur data review ke state reviews
        } else {
          console.error("Data response bukan array:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  return (
    <nav id="Review" className="review">
      {reviews.slice(0, 4).map((review, index) => (
        <div key={index} className="card card-custom">
          <div className="sec">
            <div>
              <img
                className="card-img-top"
                src={`/assets/${review.FOTO_PELANGGAN}`}
                alt={"foto " + review.NAMA_PELANGGAN}
              />
            </div>
            <div>
              <h3>
                <label htmlFor="name">{review.NAMA_PELANGGAN}</label>
              </h3>
              <h5>
                <label htmlFor="Member">{review.JENIS_MEMBERSHIP}</label>
              </h5>
            </div>
          </div>
          <p>{generateLoremIpsum()}</p>
        </div>
      ))}
    </nav>
  );
}

export default Reviews;
