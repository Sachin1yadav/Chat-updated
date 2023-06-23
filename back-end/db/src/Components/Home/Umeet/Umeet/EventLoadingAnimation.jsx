import '../Umeet.css'

export default function EventLoadingAnimation(){
 return (
  <section>
  {[1,2,3,4,5,6].map((i)=>(
  	<div key={i} className='m-2 bg-white rounded-xl shadow p-2.5'>
  	 <div className='flex items-center'>
  	  <div className='skeleton w-3/12 h-16 rounded-xl object-cover'></div>  	  
  	  <div className='w-9/12 pl-3'>
  	  	<p className='skeleton-text skeleton'></p>
  	  	<p className='skeleton-text skeleton'></p>
  	  	<p className='skeleton-text skeleton'></p>
  	  	<p className='skeleton-text skeleton'></p>
  	  </div>
  	 </div>
  	</div>
  ))
   }  	
  </section>
 )
}