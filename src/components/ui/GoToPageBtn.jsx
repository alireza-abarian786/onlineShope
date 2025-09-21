import React from 'react'

export default function GoToPageBtn({page}) {
  return (
    <div className="p-[4px] w-fit justify-self-end mx-8 rounded-2xl bg-gradient-to-l from-yellow-400 to-orange-500 cursor-pointer">
    <div className="flex items-center justify-between gap-3 rounded-md bg-white py-1 px-3 hover:bg-gradient-to-l from-yellow-400 to-orange-500 hover:text-white transition-all duration-300">
        <p className="text-sm">برو به صفحه  {page}</p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="size-6">
        <path 
            fillRule="evenodd" 
            d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" 
            clipRule="evenodd" 
        />
        </svg>
    </div>
    </div>
  )
}
