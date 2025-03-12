
import listings from "@/data/listings";
import { Link } from 'react-router-dom'

import React, { useEffect, useState } from 'react'

import FeaturedListings from './FeatuerdListings';

export default function PropertyByCitiesWrapper() {
  const [pageData, setPageData] = useState([])
  const [currentType, setCurrentType] = useState('rent')
  useEffect(() => {
      if (currentType == 'rent') {
          const filtered = listings.filter((elm)=>elm.forRent)
          setPageData(filtered)
          
      } else {
          const filtered = listings.filter((elm)=> !elm.forRent)
          setPageData(filtered)
          
      }
    
  }, [currentType])
  return (
    <section className="pb90 pb30-md pt-0">
    <div className="container-fluid container-fluidest">
      <div className="row" data-aos="fade-up" data-aos-delay="0">
 
      </div>
      {/* End .row */}

      <div className="row" data-aos="fade-up" data-aos-delay="300">
        <FeaturedListings cities = {pageData} />
      </div>
      {/* End .row */}
    </div>
  </section>
  )
}
