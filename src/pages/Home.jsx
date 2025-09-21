import React from 'react'
import Header from '../components/sections/Header'
import Category from '../components/sections/Category'
import Gallery from '../components/sections/Gallery'
import SliderGallery from '../components/layout/SliderGallery'
// import HoverSlider from '../components/sections/HoverSlider'

export default function Home() {
  return (
    <div className='overflow-hidden'>
        <Header />
        <div className='flex flex-col items-center justify-between w-4/5 mx-auto'>
          <Category />
          <Gallery />
          {/* <HoverSlider /> */}
        </div>
    </div>
  )
}
