import '../Umeet.css'

const BlankEvents = ({ event, createEvent }) => {
  return (
    <section className={`${createEvent ? 'hidden md:flex' : ''}hidden md:flex fullPage bg-white border border-gray-400 mr-1 justify-center items-center`}>
      <div className='w-3/6 h-2/4 bg-gray-100 rounded-[50px] flex flex-col items-center'>
        <span className='text-xl text-[#649b8e] py-8 font-semibold'>{event}</span>
        <p className='text-gray-700 flex justify-center text-center text-sm'>Create Events by relations and locations</p>
      </div>
    </section>
  )
}

export default BlankEvents