import React from 'react'
import { isEmpty } from '../../../Utility/utility';
import EmptyComponent from '../../../empty component/EmptyComponent';

const PostVideo = ({ data }) => {
  return (
    <>
      {
        isEmpty(data)
          ?
          <div>
            <EmptyComponent message={'No video'} />
          </div>
          :

          <div className="w-full grid sm:grid-cols-3 lg:grid-cols-4 gap-3 text-center rounded-xl p-2 h-[400px] bg-white">
            {
              data?.map((item) => (
                <video>
                  <source src={item?.video}></source>
                </video>
              ))
            }
          </div>
      }
    </>
  );
}

export default PostVideo;