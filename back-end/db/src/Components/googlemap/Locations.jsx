import React, { useEffect, useState } from 'react'
import AutocompletePlace from './AutocompletePlace'

const Locations = () => {
    console.log(window.google, "{{{{{NNNNNNNNNNNN");
//         this.handleChange = this.handleChange.bind(this);
//     this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
//     this.autocomplete = null;
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       const google = window.google;
//       this.autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
//       this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
//     }, 2000);
//   }

//   handlePlaceSelect() {
//     let addressObject = this.autocomplete.getPlace();
//     const address = getAddress(addressObject);
//     this.props.handleSelect(address);
//   }
// let [ autocomplete, setAutocomplete] = useState()
let autocomplete;
useEffect(() => {
    setTimeout(() => {
         const google = window.google;
        autocomplete  = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {});
        autocomplete.addListener("place_changed", handlePlaceSelect)

    }, 2000);
})
function getAddress (data){
    console.log(data, "KKKKKK");
}
function handleSelect(data){
    console.log(data, "MAAAAAAAAAAAAAAPPPPPPPPPPPPPPPP");
}
 const handlePlaceSelect = () => {
    let addressObject = autocomplete.getPlace();
    const address = getAddress(addressObject);
    handleSelect(address)
 }
  return (
    <div>
    <div>Hello</div>
    <input id='autocomplete'/>
    {/* <AutocompletePlace/> */}
    </div>
  )
}

export default Locations