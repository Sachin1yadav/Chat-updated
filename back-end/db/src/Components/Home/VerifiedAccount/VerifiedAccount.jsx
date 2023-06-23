import React from 'react'
import CatergorySection from '../CategorySection/CategorySection';
import CoverImageSection from './CoverImageSection/CoverImageSection';

const VerifiedAccount = () => {
  return (
    <div className="w-full flex justify-center bg-[#E4E7EC]">
    <section className="flex w-[40%] h-[600px] flex-col mt-2 items-center">
     <CoverImageSection />

    </section>
    <section className="flex w-[40%] pr-[8px] flex-col">
      {/* Category Section */}
      <section className="w-full mt-3">
        <CatergorySection />
      </section>


   
    </section>
  </div>
  )
}

export default VerifiedAccount;
