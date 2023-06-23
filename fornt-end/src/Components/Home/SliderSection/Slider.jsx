import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <MdArrowForwardIos className='' className="slick-arrow" onClick={onClick}/>  
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <MdArrowBackIosNew className='left-0 my-auto' className="slick-arrow" onClick={onClick}/> 
}

export default class CustomArrows extends Component {
  render() {
    const settings = {
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className="flex flex-col w-[40%] h-[60%] relative">
        <div className="flex justify-between w-full py-2">
          <span className="font-bold text-sm">Recent Kicks</span>
          <span className="text-sm text-[#788eb7] font-medium">
            <Link to="/kicks">View All</Link>
          </span>
        </div>
        <div className='relative'>
        <Slider {...settings}>
          {[1, 2, 3, 4, 5, 6, 7].map((elem,index) => (
              <div key={index} className="w-[51%] px- bg-red-400 h-[70%] mt-7 rounded-3xl">
                  <img
                    src="./images/diwali.jpg"
                    alt=""
                    className=" rounded-3xl"
                  />
                  {/* title name tag added */}
                   <img
                    src="./images/pizza.jpg"
                    alt=""
                    className="w-9 h-9 relative bottom-11 left-2 rounded-full"
                   />
                   <span className='absolute text-white font-medium text-[13px] bottom-[58px] left-[50px] z-20'>
                   {/* {firstName.length < 5 ? firstName : firstName.substring(0,4)}.. {lastName} */}
                   Joe Doe
                   </span>                  
                </div>                      
            ))}
        </Slider>
        </div>
      </div>
    );
  }
}