import React, { useState } from "react";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = React.Children.count(children);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  return (
    <div className="relative overflow-hidden w-full h-full flex-grow">
      <div
        className="absolute top-0 bottom-0 flex transition-transform duration-500 h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="min-w-full min-h-full flex justify-center items-center"
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-4 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-4 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
      >
        {">"}
      </button>
    </div>
  );
};

export default Carousel;
