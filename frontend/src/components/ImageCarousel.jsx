import React, { useState, useEffect } from 'react';
import '../assets/home.css';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of survey-related images
  const images = [
    'https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9304917/pexels-photo-9304917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/669616/pexels-photo-669616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/9064715/pexels-photo-9064715.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/8292894/pexels-photo-8292894.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/16380906/pexels-photo-16380906/free-photo-of-webpage-of-ai-chatbot-a-prototype-ai-smith-open-chatbot-is-seen-on-the-website-of-openai-on-a-apple-smartphone-examples-capabilities-and-limitations-are-shown.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    'https://images.pexels.com/photos/7947758/pexels-photo-7947758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000); // Change slide every 2.5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + images.length) % images.length);
  };

  return (
    <div className='image-box'>
      <div className="carousel-container">
        <button className="carousel-button prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="carousel-slides" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img src={image} alt={`Survey ${index + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-button next" onClick={nextSlide}>
          ❯
        </button>
        <div className="carousel-dots">
          {images.map( (_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel; 