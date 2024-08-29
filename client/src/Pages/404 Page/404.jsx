import React from 'react';
import './404.css';

function Error404() {
  return (
    <section className="section-404">
      <div className="text-404">
        <h1>404</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <div className="search-404">
          <input type="text" placeholder="Search for something else..." />
          <button type="button">Search</button>
        </div>
        <a href="/">
          <i className="fa fa-home"></i> Go back home
        </a>
      </div>
    </section>
  );
}

export default Error404;
