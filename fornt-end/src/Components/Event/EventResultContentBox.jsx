import React from "react";
import Carousel from "react-multi-carousel";
import EventResultCard from "./EventResultCard";

const EventResultContentBox = () => {
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
        partialVisibilityGutter: 40,
        slidesToSlide: 1,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
        partialVisibilityGutter: 40,
        slidesToSlide: 1,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
      },
    };
  return (
    <div className="w-full overflow-y-scroll mb-3">
      <div className="w-full bg-[#EAE9E7] mt-2">
        <Carousel
          responsive={responsive}
          showDots={true}
          containerClass={" h-[100%] bg-white rounded-[20px] pt-2 bg-red-400"}
        >
          {[1, 2]?.map((img) => (
            <img
              src="./images/events.jpg"
              alt=""
              className="w-[90%] sm:w-[95%] h-[85%] sm:h-[90%] object-cover rounded-[20px] mx-auto bg-green-500"
            />
          ))}
        </Carousel>
      </div>

      <EventResultCard />

      <EventResultCard />
      <EventResultCard />
    </div>
  );
};

export default EventResultContentBox;
