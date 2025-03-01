import React from 'react'
import { MdWarning, MdLink } from 'react-icons/md';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Host = () => {
  return (

    <>
    <div className="mt-6 mx-auto w-full px-2 max-w-4xl">
    <h2 className="text-2xl font-medium mb-4">Recommended for you</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center text-red-600 font-bold mb-2">
          <MdWarning className="mr-2" /> ACTION REQUIRED
        </div>
        <h3 className="font-semibold">Your identity is not fully verified</h3>
        <p className="text-sm text-gray-600 pb-3">Identity verification helps us check that you’re really you. It’s one of the ways we keep Airbnb secure.</p>
        <div className='flex justify-between items-center border-b border-t  pb-3 border-gray-300'>
        <button className="mt-2 ">Check identity verification status</button>
        <MdOutlineKeyboardArrowRight className='text-lg mt-2' />
        </div>
        <div className='flex justify-between items-center pt-2'>
        <button className="mt-1 ">Learn more </button>
        <MdOutlineKeyboardArrowRight className='text-lg mt-2'/>
        </div>
      </div>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="flex items-center text-gray-600 font-bold mb-2">
          <MdLink className="mr-2" /> QUICK LINK
        </div>
        <h3 className="font-semibold">Finding reservation details</h3>
        <p className="text-sm text-gray-600 pb-16">Your Trips tab has full details, receipts, and Host contact info for each of your reservations.</p>
        <div className='flex justify-between items-center border-t border-gray-300'>
        <button className="mt-2 ">Go to Today tab</button>
        <MdOutlineKeyboardArrowRight className=' text-lg mt-2' />
        </div>
      </div>
    </div>
    <h2 className="text-2xl font-medium pt-6 mb-4">Guides for getting started</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Getting started" className="rounded-lg" />
        <p className="mt-2 font-medium">Getting started on Airbnb</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Finding a stay" className="rounded-lg" />
        <p className="mt-2 font-medium">Finding a stay that's right for you</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Paying for your trip" className="rounded-lg" />
        <p className="mt-2 font-medium">Paying for your trip</p>
      </div>
      <div>
        <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="AirCover" className="rounded-lg" />
        <p className="mt-2 font-medium">AirCover for guests</p>
      </div>
    </div>


    <h2 className="text-2xl font-medium pt-6 pb-2">Top articles</h2>
      <div className="grid grid-cols-2 pb-10 gap-4 text-sm">
        <div className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">If your guest cancels</a>
        <p>It happens—plans change! If a guest needs to cancel their reservation, we’re here to help you...</p>
        </div>
        <div className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">Cancellation policies for your listing</a>
        <p>Sometimes, things come up and guests have to cancel. To keep things running smoothly, you can choose the cancellation policies....</p>
        </div>
        <div className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">Deactivating or deleting your account</a>
        <p>We’d hate to see you go, but if you’ve decided to leave Airbnb, you have a couple of options. You can temporarily deactivate your account,...</p>
        </div>
        <div className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">Expired or withdrawn invites, offers and requests</a>
        <p>It's important to respond to guests within 24 hours, but if a pre-approved invite, special...</p>
        </div>
        <div    className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">Changing the price of confirmed or pending reservations</a>
        <p>Here's how to change the price of a confirmed reservation, or send a special offer for a...</p>
        </div>
        <div   className='border-b pb-3 border-gray-300'>
        <a href="#" className=" underline font-medium">Experienced guests</a>
        <p>
        At Airbnb, we want to help make hosting easier for all our Host—and we’re always identifying ways to help make our comm...</p>
        </div>
      </div>


     





  </div>



<div className="bg-black text-white mt-10 p-6">
<h2 className="text-2xl font-medium mb-4 text-white max-w-4xl mx-auto">Explore more</h2>
<div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
  <div className="bg-gray-800 pb-2 rounded-lg">
    <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Community policies" className="rounded-lg" />
    <p className="mt-2 font-medium text-white pl-2">Our community policies</p>
    <p className="text-sm text-gray-400 pl-2">How we build a foundation of trust.</p>
  </div>
  <div className="bg-gray-800 pb-2 rounded-lg">
    <img src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg" alt="Safety tips" className="rounded-lg" />
    <p className="mt-2 font-medium text-white pl-2">Safety tips and guidelines</p>
    <p className="text-sm text-gray-400 pl-2">Resources to help travelers stay safe.</p>
  </div>
  <div className=' p-2 rounded-lg my-auto'>
    <h2 className=' text-white text-lg font-medium'>Need to get in touch?</h2>
    <p className=' text-white'>We’ll start with some questions and get you to the right place.</p>
    <button className="mt-2 bg-white text-black w-full px-4 py-2 rounded-lg font-medium">Contact us</button>
    <p className=' text-white pt-2'>You can also <span className=' underline font-medium'>give us feedback.</span> </p>
  </div>
</div>
</div>

</>
  )
}

export default Host