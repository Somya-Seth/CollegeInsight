import React, { useState, useEffect } from 'react';
import img1 from "./image1.jpg";
import img3 from "./image3.jpeg";
import img4 from "./image4.jpg";
import img5 from "./image5.png";
import img6 from "./image6.jpg";

export default function ControlledCarousel() {
    // <Carousel>
    //   <Carousel.Item>
    //     <img className="d-block w-100" src={img1} alt="First slide" />
    //   </Carousel.Item>
    //   {/* <Carousel.Item>
    //     <img
    //       className="d-block w-100"
    //       src={img2}
    //       alt="Second slide"
    //     />
    //   </Carousel.Item> */}
    //   <Carousel.Item>
    //     <img className="d-block w-100" src={img3} alt="Second slide" />
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img className="d-block w-100" src={img4} alt="Second slide" />
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img className="d-block w-100" src={img5} alt="Second slide" />
    //   </Carousel.Item>
    //   <Carousel.Item>
    //     <img className="d-block w-100" src={img6} alt="Second slide" />
    //   </Carousel.Item>
    // </Carousel>


  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [{img1}, {img3}, {img4}, {img5}, {img6}];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Image ${index}`}
          style={{ display: index === currentIndex ? 'block' : 'none' }}
        />
      ))}
    </div>
  );
  
}
