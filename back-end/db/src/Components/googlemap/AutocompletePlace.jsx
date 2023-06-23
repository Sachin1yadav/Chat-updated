
import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { SlLocationPin } from 'react-icons/sl';

const containerStyle = {
  width: '10px',
  height: '10px',
  // display: 'none'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

function Autocomplete({ livePlace, placeholder, value, types, handleChangeLocation }) {
  const [searchBox, setSearchBox] = useState();
  const [input, setInput] = useState(value)

  const onLoad = (ref) => {
    setSearchBox(ref)
  };

  function onPlacesChanged (value){
    const place = searchBox.getPlaces()
    // console.log(place?.[0]?.formatted_address, "PPPPPP LLLLLLLLL");
    console.log(place);
    livePlace(place?.[0]?.formatted_address);
  };
    const handleChange = (e) => {
      const { value } = e.target
      // setInput(value)
      handleChangeLocation(e.target.value)
      // onPlacesChanged(value);
    };
  return (
    <>
      {window.google === undefined ? (
        <LoadScript
          libraries={[[ types || "places"]]}
          // googleMapsApiKey="AlzaSyCxfRNiw6DgtJadpT7aVO2lt8rVhaiGCxO"
          // googleMapsApiKey='AlzaSyAcJzppx6PHvFiGQlP3HXcC21cgDATqAoE'
          // googleMapsApiKey='AIzaSyCm0bUdRDZL9DmCxxDyFxCv9YYoGixvYko'
          // AIzaSyCxfRNiw6DgtJadpT7qVO2It8rVhaiGCx0
          // googleMapsApiKey="AIzaSyD2t7ciNg4QST3zXCjSJVuQapFEhBTLo_E"
          googleMapsApiKey="AIzaSyDVh55QHg4bqcLPZeU8EhAgw-wX0tdowMU"
        >
          <GoogleMap
            id="searchbox-example"
            mapContainerStyle={containerStyle}
            zoom={0}
            center={center}
          >
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                placeholder="Customized your placeholder"
                className="border border-gray-500 border-1 rounded-md"
                style={{
                  boxSizing: `border-box`,
                  // border: `1px solid black`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  // boxShadow: `0 2px 6px rgba(0, 0, 0, 0.1)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  // left: "50%",
                  // marginLeft: "-120px",
                  top: "0px",
                  left: "0px",
                }}
                autoComplete
                onChange={handleChange}
              />
            </StandaloneSearchBox>
          </GoogleMap>
        </LoadScript>
      ) : (
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <div className='flex items-center'>
          <input
            type="text"
            value={value}
            placeholder={ placeholder }
            className="border flex-1 border-gray-300 border-1 py-2 rounded-md !static w-full"
            style={{
              boxSizing: `border-box`,
              height: `39px`,
              width: '100%',
              padding: `4px 12px`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",

            }}
            autoComplete="true"
            onChange={handleChange}
          />
              <SlLocationPin size={20} className="ml-4" />

        </div>
        </StandaloneSearchBox>
      )}
    </>
  );
}

export default React.memo(Autocomplete)