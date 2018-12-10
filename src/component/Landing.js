import React from 'react';
import './css/landing.css'

class Landing extends React.Component {
  render() {
    const imgSrc = "https://4dttx13zn7901db8sx1mg5n8-wpengine.netdna-ssl.com/wp-content/uploads/2017/10/iStock-492654918-1024x680.jpg";
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
