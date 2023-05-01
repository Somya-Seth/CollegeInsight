import React from "react";
import Carousel from "react-bootstrap/Carousel";
import img1 from "../../image/image1.jpg";
import img3 from "../../image/image3.jpeg";
import img4 from "../../image/image4.jpg";
import img5 from "../../image/image5.png";
import img6 from "../../image/image6.jpg";

export default function ControlledCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src={img1} alt="First slide" />
      </Carousel.Item>
      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />
      </Carousel.Item> */}
      <Carousel.Item>
        <img className="d-block w-100" src={img3} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img4} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img5} alt="Second slide" />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={img6} alt="Second slide" />
      </Carousel.Item>
    </Carousel>
  );
}
