import Navbar from '../layout/Navbar'

import rahbar from '../../assets/images/rahbar.webp'
import emam from '../../assets/images/emam.webp'
import divider from '../../assets/images/divider.png'
import Tulips from '../../assets/images/Tulips.png'
import symbolLeft from '../../assets/images/symbol.png'
import symbolRight from '../../assets/images/symbol.png'

import salami from '../../assets/images/Portrait/salami.jpg'
import soleimani from '../../assets/images/Portrait/soleimani.jpg'
import amirabd from '../../assets/images/Portrait/amirabd.jpg'
import babai from '../../assets/images/Portrait/babai.jpg'
import hajizadeh from '../../assets/images/Portrait/hajizadeh.jpg'
import hajmahmoud from '../../assets/images/Portrait/hajmahmoud.jpg'
import HajRamadan from '../../assets/images/Portrait/HajRamadan.jpg'
import hojaji from '../../assets/images/Portrait/hojaji.jpg'
import jomhour from '../../assets/images/Portrait/jomhour.jpg'
import kazemi from '../../assets/images/Portrait/kazemi.jpg'
import Nasrallah from '../../assets/images/Portrait/Nasrallah.jpg'
import nilforoshan from '../../assets/images/Portrait/nilforoshan.jpg'
import mohaghegh from '../../assets/images/Portrait/mohaghegh.jpg'
import rashid from '../../assets/images/Portrait/rashid.jpg'
import shahriari from '../../assets/images/Portrait/shahriari.jpg'
import zainodin from '../../assets/images/Portrait/zainodin.jpg'
import sardarbagheri from '../../assets/images/Portrait/sardarbagheri.jpg'
import MartyrSlider from '../layout/Automove'

export default function Header() {
  // لیست تصاویر شهدا
  const martyrImages = [
    { src: amirabd, alt: "amirabd" },
    { src: salami, alt: "salami" },
    { src: soleimani, alt: "soleimani" },
    { src: babai, alt: "babai" },
    { src: hajizadeh, alt: "hajizadeh" },
    { src: hojaji, alt: "hojaji" },
    { src: jomhour, alt: "jomhour" },
    { src: kazemi, alt: "kazemi" },
    { src: Nasrallah, alt: "Nasrallah" },
    { src: HajRamadan, alt: "HajRamadan" },
    { src: nilforoshan, alt: "nilforoshan" },
    { src: mohaghegh, alt: "mohaghegh" },
    { src: rashid, alt: "rashid" },
    { src: shahriari, alt: "shahriari" },
    { src: hajmahmoud, alt: "hajmahmoud" },
    { src: zainodin, alt: "zainodin" },
    { src: sardarbagheri, alt: "sardarbagheri" },
  ]

  return (
    <section className='header-container bg-section-dark relative h-screen w-screen'>
      <div className="h-full grid grid-cols-3 grid-rows-3 gap-2">

          <div className='col-span-3 row-start-1 h-fit self-center xl:self-end'>
            <Navbar />

            {/* رهبر و امام */}
            <div className="emamain-img-container flex items-center justify-center md:justify-between gap-10 p-[20px]">
              <img src={rahbar} alt='rahbar' className="img-item w-22 xl:w-30 h-30 xl:h-43 border-4 border-green-900 rounded-3xl shadow-[0_4px_14px_#ffffff40]" />
              <img src={emam} alt='emam' className="img-item w-22 xl:w-30 h-30 xl:h-43 border-4 border-green-900 rounded-3xl shadow-[0_4px_14px_#ffffff40]" />
            </div>
          </div>

          <div className="title-container flex flex-col items-center h-fit gap-5 col-span-3 row-start-2 -translate-y-0 sm:-translate-y-12 md:-translate-y-30 lg:-translate-y-25 xl:-translate-y-35">
            <div className="title-item flex flex-col items-center gap-0.5 md:gap-2 p-[4%_4%_2%] sm:p-[2%_2%_1%] bg-[#d9d9d912] shadow-xs shadow-white rounded-4xl">
              <div className='flex items-center justify-between'>
                <img src={symbolRight} alt="symbol" className="symbol-right w-2 h-3.5 sm:w-3.5 md:w-4 xl:w-6 sm:h-6 md:h-7 xl:h-10 rotate-180" />
                <h4 className="quran text-[#ffd700] mx-2 text-[10px] sm:text-sm md:text-lg xl:text-2xl font-bold leading-[25px] text-shadow-[0_2px_4px_#000] relative">وَلَا تَقُولُوا لِمَنْ يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ بَلْ أَحْيَاءٌ وَلَكِنْ لَا تَشْعُرُونَ</h4>
                <img src={symbolLeft} alt="symbol" className="symbol-left w-2 h-3.5 sm:w-3.5 md:w-4 xl:w-6 sm:h-6 md:h-7 xl:h-10" />
              </div>
              <p className="quran-translation text-[8px] sm:text-xs md:text-sm xl:text-base font-medium text-[#ffffffd9] text-center  relative w-[250px] sm:w-95 md:w-110 xl:w-127 text-shadow-[0px_4px_4px_#d4af3740] ">از روى بى‌اطلاعى يا بى‌ادبى، به آنان كه در راه خدا شهيد مى‌شوند، مرده نگوييد؛ بلكه آنان به‌طور ويژه زنده‌اند؛ ولى شما درك نمى‌كنيد</p>
              <img src={divider} alt="divider-img" className="divider-img w-[90px] sm:w-35 md:w-40" />
              <span className="verse-number text-[#ffd700] text-[8px] sm:text-xs md:text-sm font-normal">بقره، 154</span>
            </div>

            <div className="title-item flex flex-col items-center gap-1 md:gap-2 p-[4%_7%] md:p-[3%] bg-[#d9d9d912] shadow-[0_-.5px_2px_0_#fff] rounded-4xl">
              <h1 className="title text-[#b71c1c] text-sm sm:text-2xl md:text-3xl xl:text-4xl font-bold">قصه‌های آسمانی شهدا الهام ‌بخش فردای روشن ماست</h1>
              <p className="title-description text-[8px] sm:text-sm md:text-base w-3xs sm:w-md md:w-lg xl:w-full font-medium text-[#ffffffcc] tracking-[7%]">قصه‌های آسمانی شهدا تنها روایت‌هایی از گذشته نیستند، بلکه چراغ‌هایی جاوید برای ساختن فردایی روشن و امیدبخش‌اند.</p>
              <div className="search-container flex items-center justify-between bg-[#d9d9d980] w-[75%] h-8 sm:h-10 md:h-11 rounded-full mt-[10px] xl:mt-[20px] pr-[20px]">
                <input type="text" className='search-input outline-none border-0 w-[70%] text-xs md:text-sm' placeholder='جستجو رو آغاز کن...' />
                <button className="search-btn bg-gradient-gold hover:shadow-[0_0_8px_#d4af3799] cursor-pointer transition-all w-1/5 sm:w-1/6 md:w-1/7 h-full rounded-[50px] rounded-tr-none flex items-center justify-center">
                  <svg className='w-6 md:w-9' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="footer-head-container col-span-3 col-start-1 row-start-3 self-end translate-y-1/8 sm:translate-y-1/5 lg:translate-y-1/6 xl:translate-y-1/6">
            <MartyrSlider images={martyrImages} />
            {/* ✅ bottom-0 نسبت به footer-head-container */}
            <div className='footer-background relative z-10 w-[300vw] lg:w-[150vw] xl:w-[105vw] justify-self-center'>
              <img src={Tulips} alt="Tulips" className='' />
              {/* <p className='poetry absolute bottom-1 left-1/2 -translate-x-1/2 text-center text-md md:text-lg xl:text-2xl text-[#ede0d4]'>از
                <span className='font-bold text-[#b71c1c]'> خون </span>
                جوانان وطن
                <span className='font-bold text-[#b71c1c]'> لاله </span>
                دمیده
              </p> */}
            </div>
          </div>

      </div>
    </section>
)
}