import React from 'react'
import { HiLocationMarker } from 'react-icons/hi'

const SearchBar = ({filter,setFilter}) => {
  return (
    <div className=" search-bar">
    <HiLocationMarker className="icon" color="var(--blue)" size={25}/>
    <input 
    placeholder='search by city/country'
    type="text" 
    value={filter} 
    onChange={(e)=>setFilter(e.target.value)}/>
    <button className='button'>search</button>
</div>
  )
}

export default SearchBar