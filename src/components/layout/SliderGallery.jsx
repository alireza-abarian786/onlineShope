import React from 'react'
import { useState } from 'react'

import martyr1 from '../../assets/images/Portrait//babai.jpg'
import martyr2 from '../../assets/images/Portrait/slider/1.jpeg'
import martyr3 from '../../assets/images/Portrait/slider/2.jpeg'
import martyr4 from '../../assets/images/Portrait/slider/3.jpg'
import martyr5 from '../../assets/images/Portrait/slider/4.jpg'
import martyr6 from '../../assets/images/Portrait/slider/5.jpg'
import martyr7 from '../../assets/images/Portrait/slider/6.jpg'
import martyr8 from '../../assets/images/Portrait/slider/7.jpg'
import martyr9 from '../../assets/images/Portrait/slider/8.jpeg'
import martyr10 from '../../assets/images/Portrait/slider/9.jpg'
import martyr11 from '../../assets/images/Portrait/slider/10.jpg'
import martyr12 from '../../assets/images/Portrait/slider/11.jpg'
import martyr13 from '../../assets/images/Portrait/slider/12.jpg'
import martyr14 from '../../assets/images/Portrait/slider/13.jpg'
import martyr15 from '../../assets/images/Portrait/slider/14.jpg'
import martyr16 from '../../assets/images/Portrait/slider/15.jpeg'
// import martyr17 from '../../assets/images/Portrait/slider/16.jpeg'

// import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : ""
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  )
}

function Autoplay(slider) {
  let timeout
  let mouseOver = false
  function clearNextTimeout() {
    clearTimeout(timeout)
  }
  function nextTimeout() {
    clearTimeout(timeout)
    if (mouseOver) return
    timeout = setTimeout(() => {
      slider.next()
    }, 2000)
  }
  slider.on("created", () => {
    slider.container.addEventListener("mouseover", () => {
      mouseOver = true
      clearNextTimeout()
    })
    slider.container.addEventListener("mouseout", () => {
      mouseOver = false
      nextTimeout()
    })
    nextTimeout()
  })
  slider.on("dragStarted", clearNextTimeout)
  slider.on("animationEnded", nextTimeout)
  slider.on("updated", nextTimeout)
}

export default function SliderGallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider(
    {
        loop: true,
        renderMode: "performance",
        initial: 0,
        slides: {
            perView: 9,
            spacing: 10, 
            origin: "center"
        },
        breakpoints: {
            '(min-width: 500px)': {
                // loop: false,
            },
        },
        slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    },
    [Autoplay]
  )



  return (
    <>
      <div ref={sliderRef} className="gallery-box-wrapper keen-slider py-8 w-full h-max flex">

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr1} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید عباس بابایی</h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl mx shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr3} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید محمد رضا دهقان </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr4} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید مهدی زین الدین </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr5} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید حاج قاسم سلیمانی </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr6} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید ابراهیم هادی </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr7} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید علی ذوالفقاری </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr8} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید حسن باقری </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr2} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید عباس بابایی</h5>
            </div>
        </a>
        
        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr9} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید امیر علی حاجی زاده </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr10} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید مصطفی صدر زاده </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr11} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید سید حسن نصر الله </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr12} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید سید ابراهیم رئیسی </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr13} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید حسین امیر عبداللهیان </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr14} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید محمد باقری </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr15} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید غلامعلی رشید </h5>
            </div>
        </a>

        <a href='#' className="gallery-item keen-slider__slide w-full relative rounded-3xl shadow-[0px_4px_12px_0px_#00000033]">
            <img src={martyr16} alt="martyr-img" className="martyr-img-item w-full h-[900px] object-cover rounded-3xl border-4 border-white"/>
            <div className="martyr-name absolute bottom-10 bg-white rounded-ss-full rounded-se-full p-1 flex items-center justify-center [writing-mode:sideways-lr] [text-orientation:mixed]">
                <h5 className="name text-sm font-semibold leading-none mx-7 my-0.5">شهید جهاد مغنیه </h5>
            </div>
        </a>


        {loaded && instanceRef.current && (
            <>
                <Arrow
                left
                onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
                />

                <Arrow
                onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                    currentSlide ===
                    instanceRef.current.track.details.slides.length - 1
                }
                />
            </>
        )}

      </div>

      {loaded && instanceRef.current && (
    <div className="dots">
      {[
        ...Array(instanceRef.current.track.details.slides.length).keys(),
      ].map((idx) => {
        return (
          <button
            key={idx}
            onClick={() => {
              instanceRef.current?.moveToIdx(idx)
            }}
            className={"dot" + (currentSlide === idx ? " active" : "")}
          ></button>
        )
      })}
    </div>
      )}
    </>
  )
}

