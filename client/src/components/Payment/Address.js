import React, { useState } from 'react'
import './Address.css'
import PlacesAutocomplete from 'react-places-autocomplete'
import { WhiteBox } from '../StyledComponents'

const Address = () => {
  const [address, setAddress] = useState('')

  const handleSelect = async (value) => {
    setAddress(value)
  }

  return (
    <WhiteBox style={{ width: '100%', height: '100%', marginRight: '40px' }}>
      <h2 className='payment-title'>Delivery Address</h2>

      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps }) => {
          return (
            <div className='places-autocomplete'>
              <div className='input-address'>
                <input {...getInputProps({ placeholder: 'Type address' })} />
              </div>

              <div>
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active
                      ? 'rgb(230, 230, 230)'
                      : '#fff',
                  }

                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                      className='address-suggestion'
                    >
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
    </WhiteBox>
  )
}

// https://www.youtube.com/watch?v=uJYqQdnw8LE
// https://www.npmjs.com/package/react-places-autocomplete
export default Address
