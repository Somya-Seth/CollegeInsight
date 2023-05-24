import React, { useState, useEffect } from 'react';
import img1 from "./image1.jpg";
import img3 from "./image3.jpeg";
import img4 from "./image4.jpg";
import img5 from "./image5.png";
import img6 from "./image6.jpg";

export default function ControlledCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img3, img4, img5, img6];

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
          style={{ display: index === currentIndex ? 'block' : 'none', width: '25rem', height:'15rem' }}
        />
      ))}
    </div>
  );
  
}
