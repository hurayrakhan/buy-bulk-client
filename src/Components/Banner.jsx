import React, { useEffect, useState } from "react";
import slider1 from '../assets/slider-1.webp'
import slider2 from '../assets/slider-2.webp'
import slider3 from '../assets/slider-3.webp'
import slider4 from '../assets/slider-4.jpg'

const images = [
  slider1,
  slider2,
  slider3,
  slider4
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 6000); // change every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </div>
  );
};

export default Banner;
