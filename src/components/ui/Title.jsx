import '../../styles/Title.css'

export default function Title({headline , underHeadline}) {
  return (
    <div className='title-container text-center'>
        <h2 className="headline text-3xl text-[#b71c1c] font-bold">{headline}</h2>
        <p className="under-headline text-sm pt-2.5 px-14 font-medium">{underHeadline}</p>
    </div>
  )
}
