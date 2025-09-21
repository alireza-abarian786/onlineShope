import Title from '../ui/Title'
import GoToPageBtn from '../ui/GoToPageBtn'
import SliderGallery from '../layout/SliderGallery'

export default function Gallery() {
  return (
        <section className="section-container mt-[15rem] grid col-span-1 justify-center">
          <Title headline={"گالری تصاویر"} underHeadline={"مجموعه‌ای از تصاویر تاریخی و خاطره‌انگیز شهدا"}/>

          <SliderGallery />
          
          <GoToPageBtn page="گالری" />
        </section>
  )
}
