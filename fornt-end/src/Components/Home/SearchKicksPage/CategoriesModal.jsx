const data = [
  'All', 'Adventures', 'Arts & Craft', 'Beauty Tips', 'Comedy', 'Cooking', 'Dance', 'Devotional', 'Education', 'Fashion', 'Fitness', 'General', 'Health tips', 'Home decors/design', 'Others', 'Pets/animals/birds', 'Science & technology', 'Singing', 'Sports', 'Travel'
]

export default function CategoriesModal({ onClose }) {
  return (
    <div className='top-[18%] left-0 fixed flex justify-center items-center w-full h-full z-40' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
      <div className='bg-white p-4  min-h-[60%]'>
        <p className='py-1 border-b'>Please Select your preferred Kicks categories</p>
        <div className='h-[290px] overflow-y-scroll'>
          {
            data.map((d, i) => (
              <div key={i} className='my-2 flex items-center'>
                <input type='checkbox' id={d} className='w-4 h-4 accent-orange-600' />
                <label className='ml-2' htmlFor={d}>{d}</label>
              </div>
            ))
          }
        </div>
        <section className='py-1 pt-2 border-t flex justify-center items-center'>
          <button onClick={onClose} className='text-[#dd8e58]  border border-[#dd8e58] px-5 w-36 mx-1 py-1.5 rounded-lg'>Close</button>
          <button onClick={onClose} className='px-5 w-36 border text-[#dd8e58] border-[#dd8e58] py-1.5 mx-1 rounded-lg'>Save</button>
        </section>
      </div>
    </div>
  )
}