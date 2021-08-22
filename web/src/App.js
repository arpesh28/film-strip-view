import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import sample from './Images/sample.jpg';
import { Image } from 'react-bootstrap';
import previousIcon from './Images/previous.png';
import nextIcon from './Images/next.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

function App(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlide, setNextSlide] = useState(0);

  const [activeSlide, setActiveSlide] = useState(0);
  const [slidesData, setSlidesData] = useState([]);
  const [showNumber, setshownumber] = useState(4);
  var refresh = false;

  useEffect(() => {
    fetch('http://localhost:4000/filmData')
      .then((response) => response.json())
      .then((data) => {
        console.log('API:', data);
        setSlidesData(data);
      });
  }, [refresh]);

  var settings = {
    dots: false,
    arrows: false,
    touchMove: false,
    swipe: false,
    swipeToSlide: false,
    infinite: false,
    speed: 500,
    slidesToShow: showNumber,
    slidesToScroll: showNumber,
    beforeChange: (current, next) => {
      setCurrentSlide(current);
      setNextSlide(next);
      // setCurrentSlide(current);
      // if (slides.length % 4 == 0) {
      //   setNextSlide(next);
      // } else {
      //   if (currentSlide + 4 > slides.length - 1) {
      //     setCurrentSlide(next);
      //   } else {
      //     setCurrentSlide(next);
      //   }
      // }
    },
    afterChange: (current) => {
      setCurrentSlide(current);
    },
  };
  var slider;
  console.log(
    'current next length',
    currentSlide,
    nextSlide,
    slidesData.length
  );
  return (
    <div className='App'>
      <div className='container wrapper '>
        <div className='content'>
          <div className='row'>
            <div className='col-8 '>
              <Image
                src={sample}
                className='img-fluid'
                alt='Image'
                height={100}
              />
              <img
                src={require('./Images/sample.jpg')}
                className='img-fluid'
                alt='Image'
                height={100}
              />
            </div>
            <div className='col-4 text-container'>
              <div className='field-container'>
                <h4>
                  <span>Title</span>
                  {slidesData.length != 0 && slidesData[activeSlide].title}
                </h4>
              </div>
              <div className='field-container'>
                <h4>
                  <span>Description</span>{' '}
                  {slidesData.length != 0 &&
                    slidesData[activeSlide].description}
                </h4>
              </div>
              <div className='field-container'>
                <h4>
                  <span>Cost</span>{' '}
                  {slidesData.length != 0 && slidesData[activeSlide].cost}
                </h4>
              </div>
              <div className='field-container'>
                <h4>
                  <span>Id</span>{' '}
                  {slidesData.length != 0 && slidesData[activeSlide].id}
                </h4>
              </div>
              <div className='field-container'>
                <h4>
                  <span>Thumbnail File</span>{' '}
                  {slidesData.length != 0 && slidesData[activeSlide].thumbnail}
                </h4>
              </div>
              <div className='field-container'>
                <h4>
                  <span>Large Image File</span>{' '}
                  {slidesData.length != 0 && slidesData[activeSlide].thumbnail}
                </h4>
              </div>
            </div>
          </div>

          <div className='thumbnail-container '>
            <div
              className={`slider-icons prev ${currentSlide == 0 && 'inactive'}`}
              onClick={() => {
                if (currentSlide + nextSlide > slidesData.length - 1) {
                  setshownumber(4);
                  slider.slickGoTo(currentSlide - 4);
                  setCurrentSlide(currentSlide - 4);
                } else {
                  slider.slickPrev();
                }
              }}
            >
              <img src={previousIcon} alt='prev' height={25} />
            </div>
            <Slider ref={(c) => (slider = c)} {...settings}>
              {slidesData &&
                slidesData.map((slide, index) => {
                  // import thumb from `./Images/thumbnails/${slide.thumbnail}`
                  var thumb = require(`./Images/thumbnails/${slide.thumbnail}`);
                  return (
                    <div
                      className={`thumbnail d-flex flex-column align-items-center  ${
                        index == activeSlide && 'selected'
                      }`}
                      onClick={() => setActiveSlide(index)}
                    >
                      <img src={thumb} alt='image' height={100} className='' />
                      <div className='img-id'>{slide.id}</div>
                    </div>
                  );
                })}
            </Slider>
            <div
              className={`slider-icons next ${
                nextSlide + 4 >= slidesData.length - 1 && 'inactive'
              }`}
              onClick={() => {
                console.log('currrrrrrrr:', currentSlide, nextSlide);
                if (nextSlide + 4 < slidesData.length - 1) {
                  if (currentSlide + nextSlide > slidesData.length - 1) {
                    setshownumber(3);
                    slider.slickGoTo(currentSlide + 6);
                    setCurrentSlide(currentSlide + 6);
                  } else {
                    slider.slickNext();
                  }
                }
              }}
            >
              <img src={nextIcon} alt='prev' height={25} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
