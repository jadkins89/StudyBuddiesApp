import React from 'react';
import './css/landing.css'

class Landing extends React.Component {
  render() {
    const imgSrc = "https://www.mountainphotography.com/images/xl/20060328-Boulder-Inversion-Sunrise.jpg";
    return (
      <div className = "Landing">
        <img src={imgSrc} className="bg" alt="Study Buddies"/>
      	<div className = "Body">
        	<h1>
            Study Buddies is dedicated to helping computer science students at CU Boulder.
            We know that many times it is difficult to find help with studying or finishing assignments.
            Through this application, you now have a platform where you can
            meet up with other students so that you can study and work together.
        	</h1>
          <h1 align="center"> Find your study buddy! </h1>
      	</div>
      </div>
    )
  }
};

export default Landing;
