
export default function Title({headline , underHeadline}) {
  return (
    <div className='title-container text-center'>
        <h2 className="headline text-3xl sm:text-5xl text-[#b71c1c] font-bold leading-15">{headline}</h2>
        <p className="under-headline text-sm sm:text-2xl sm:font-bold pt-2.5 px-14 font-medium">{underHeadline}</p>
    </div>
  )
}
