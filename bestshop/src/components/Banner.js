import React from 'react'
import './Banner.css'
import { Link } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

function Banner() {
  return (
    <Carousel
      autoPlay={true}
      interval={3000}
      transitionTime={2000}
      infiniteLoop={true}
      showThumbs={false}
      showArrows={false}
    >
      <div className='Carousel-img'>
        <img src="/assets/12.avif" alt="Banner 1" className="carousel-image" />
      </div>
      <div className='Carousel-img'>
        <img src="/assets/13.avif" alt="Banner 2" className="carousel-image" />
      </div>
      <div className='Carousel-img'>
        <img src="/assets/14.avif" alt="Banner 3" className="carousel-image" />
      </div>
    </Carousel>
  )
}

export default Banner;
