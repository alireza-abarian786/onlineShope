import React from 'react'
import Footer from '../components/sections/Footer'

export default function MainLayout({children}) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
