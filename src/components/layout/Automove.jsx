import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

const animation = { duration: 10000, easing: (t) => t }

export default function MartyrSlider({ images }) {
  const [sliderRef] = useKeenSlider({
      loop: true,
      renderMode: "performance",
      slides: {
        perView: 16,
        spacing: 10,
      },
      breakpoints: {
        '(max-width: 1280px)': {
          slides: {
            perView: 12,
            spacing: 10,
          },
        },
        '(max-width: 1024px)': {
          slides: {
            perView: 10,
            spacing: 10,
          },
        },
        '(max-width: 768px)': {
          slides: {
            perView: 8,
            spacing: 10,
          },
        },
        '(max-width: 600px)': {
          slides: {
            perView: 6,
            spacing: 10,
          },
        },
        '(max-width: 500px)': {
          slides: {
            perView: 5,
            spacing: 10,
          },
        }
      },
      drag: false,
      created(s) {
        s.moveToIdx(5, true, animation)
      },
      updated(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
      animationEnded(s) {
        s.moveToIdx(s.track.details.abs + 5, true, animation)
      },
    },
  )

  return (
    <div ref={sliderRef} className="keen-slider h-fit w-screen  translate-y-[55%] sm:translate-y-[65%] md:translate-y-[90%] lg:translate-y-[70%] xl:translate-y-[60%]">
      {images.map((img, i) => (
        <div className="keen-slider__slide" key={i}>
          <img
            src={img.src}
            alt={img.alt}
            className="w-[90px] h-[180px] object-cover border-2 border-white rounded-[20px_20px_0_0]"
          />
        </div>
      ))}
    </div>
  )
}


