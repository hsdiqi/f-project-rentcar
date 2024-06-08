import React from 'react';
import '../index.css';

function Home() {
  return (
    <nav className="home d-flex" id="home   ">
      <div className="container-1">
        <div className="container-article">
          <article><b>Fast and Easy Way to Rent Car</b></article>
          <article>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
            tenetur perferendis maiores. A expedita quis itaque. Pariatur in
            hic, asperiores laudantium veritatis odit atque veniam
            necessitatibus. Perferendis esse consectetur laboriosam.
          </article>
        </div>
      </div>
      <div className="container-2">
        <img src="/assets/pajero.png" alt="Pajero" />
      </div>
    </nav>
  );
}

export default Home;
