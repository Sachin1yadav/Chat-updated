import React, { useState } from "react";
import SearchComponent from "../SearchComponent/SearchComponent";
import { BiCategory } from 'react-icons/bi'
import { HiPlus } from 'react-icons/hi'
import '../Umeet/Umeet.css'
import video from '../../../Assets/Videos/v2.mp4';
import { AiOutlinePlayCircle } from 'react-icons/ai'
import CategoriesModal from './CategoriesModal'
import SelectedVideoModal from './SelectedVideoModal'
import SearchVideo from './SearchVideo'
import SearchPeople from './SearchPeople'
import SearchHastag from './SearchHastag'
import { useDispatch, useSelector } from "react-redux";
import { getKicksByTag, getKicksByText, getProfileList } from "../../../redux/actionCreators/kicksActionCreator";

const SearchKicksPage = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profileReducer)

  const { kicksVideoList } = useSelector((state) => state.kicksReducer)
  const [showCategories, setShowCategories] = useState(false)
  const [selectVideo, setSelectVideo] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState(true)
  const [people, setPeople] = useState(false)
  const [hastag, setHastag] = useState(false)

  function handleFileSelection(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedVideo(reader.result);
    };

    reader.readAsDataURL(file);
  }

  const handleHastag = () => {
    setSearch(false)
    setPeople(false)
    setHastag(true)
  }

  const handPeople = () => {
    setSearch(false)
    setPeople(true)
    setHastag(false)
  }

  const handleSearch = () => {
    setSearch(true)
    setPeople(false)
    setHastag(false)
  }

  const handleKicksSearch = (searchText) => {
    dispatch(getKicksByText(searchText, profile?.id));
    dispatch(getProfileList(searchText, profile?.id));
    dispatch(getKicksByTag(searchText, profile?.id))
  }

  const data = [
    { title: "Following" },
    { title: "Latest" },
    { title: "Trending" },
  ]

  function RenderStatus() {
    if (search) return <SearchVideo />
    else if (people) return <SearchPeople />
    else if (hastag) return <SearchHastag />
  }
  return (
    <div className={`w-full relative flex flex-1 lg:h-[90vh] xl:h-[90vh]`}>
      <div className='w-full flex justify-center bg-black'>
        <section className="flex md:w-[42%] w-[92%] col-span-2 flex-col">
          <div className="">
            <div className="flex w-full items-center my-1">
              <input placeholder="Search by name/keywords/hashtags" type='search' className='w-full h-10 rounded-lg outline-none px-2'
               onFocus={() => setIsFocused(true)} bgColor="#fff" 
                onChange={(e) => handleKicksSearch(e.target.value)}
               />
              <img src={search} alt="" width={50} />

              <input type='file' id='chooseVideo' onChange={handleFileSelection} className='hidden' />
              {/* <span><label onClick={() => setSelectVideo(true)} htmlFor='chooseVideo'>
                <HiPlus className='text-white bg-[#6e6f6f] h-10 w-10 rounded-full p-0.5 cursor-pointer' /></label></span> */}
            </div>
          </div>
          {isFocused && (
            <div className='p-2 mb-1 w-full flex bg-white rounded-lg'>
              <div onClick={handleSearch} className={`${search ? 'bg-[#dd8e58] text-white' : 'bg-[#E4E4E4]'} rounded-lg flex justify-center py-1 px-4 w-1/3 cursor-pointer`}>Videos</div>
              <div onClick={handPeople} className={`${people ? 'bg-[#dd8e58] text-white' : 'bg-[#E4E4E4]'} rounded-lg flex justify-center py-1 px-4 w-1/3 mx-2 cursor-pointer`}>Profiles</div>
              <div onClick={handleHastag} className={`${hastag ? 'bg-[#dd8e58] text-white' : 'bg-[#E4E4E4]'} rounded-lg flex justify-center py-1 px-4 w-1/3 cursor-pointer`}>Hastags</div>
            </div>
          )}
          {/* Reels Sections */}
          <div className=" w-full overflow-y-scroll hideScroll h-[89%]  bg-white p-2 rounded-lg">
            <RenderStatus />
          </div>
        </section>
        {selectVideo && <SelectedVideoModal selectedVideo={selectedVideo} onClose={() => setSelectVideo(false)} />}
      </div>
    </div>
  );
};

export default SearchKicksPage;
