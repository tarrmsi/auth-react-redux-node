import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

const Landing = () => {
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Landing Page</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus, est iste dolores labore cupiditate illum voluptate
            assumenda sit error quod?
          </p>
          <div>
            <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>
            <Link to='/login' className='btn btn-light'>
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
