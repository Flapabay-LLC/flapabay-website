import React from "react";
import { MdWarning, MdLink } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const TravelAdmin = () => {
  return (
    <>
      <div className="mt-6 mx-auto w-full px-2 max-w-4xl">
        <h2 className="text-2xl font-medium mb-4">Guides for getting started</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Getting started"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">Getting started on Airbnb</p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Finding a stay"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">
              Finding a stay that's right for you
            </p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Paying for your trip"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">Paying for your trip</p>
          </div>
          <div>
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="AirCover"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium">AirCover for guests</p>
          </div>
        </div>

        <h2 className="text-2xl font-medium pt-6 pb-2">Top articles</h2>
        <div className="grid grid-cols-2 pb-10 gap-4 text-sm">
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              About Airbnb for Work
            </a>
            <p>
              Arranging accommodation for business trips is a cinch with Airbnb
              for Work, which puts a...
            </p>
          </div>
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              Sign your company up for Airbnb for Work
            </a>
            <p>
              Joining Airbnb for Work makes it easy to book and manage company
              travel, with access to....
            </p>
          </div>
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              Access and get to know your Airbnb for Work dashboard
            </a>
            <p>
              Airbnb for Work admins and trip planners have access to a
              convenient dashboard to help...
            </p>
          </div>
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              Invite employees to join Airbnb for Work
            </a>
            <p>
              If you’re a travel admin for your company’s Airbnb for Work
              account, you can invite...
            </p>
          </div>
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              Set up a company credit card for Airbnb for Work
            </a>
            <p>
              One useful feature of Airbnb for Work is that employees can book
              and charge business...
            </p>
          </div>
          <div className="border-b pb-3 border-gray-300">
            <a href="#" className=" underline font-medium">
              Print or download receipts for Airbnb for Work business trips
            </a>
            <p>
              As a travel admin for your company’s Airbnb for Work account, you
              can print or download....
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black text-white mt-10 p-6">
        <h2 className="text-2xl font-medium mb-4 text-white max-w-4xl mx-auto">
          Explore more
        </h2>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <div className="bg-gray-800 pb-2 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Community policies"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium text-white pl-2">
              Our community policies
            </p>
            <p className="text-sm text-gray-400 pl-2">
              How we build a foundation of trust.
            </p>
          </div>
          <div className="bg-gray-800 pb-2 rounded-lg">
            <img
              src="https://images.pexels.com/photos/1535244/pexels-photo-1535244.jpeg?cs=srgb&dl=pexels-hazardos-1535244.jpg&fm=jpg"
              alt="Safety tips"
              className="rounded-lg"
            />
            <p className="mt-2 font-medium text-white pl-2">
              Safety tips and guidelines
            </p>
            <p className="text-sm text-gray-400 pl-2">
              Resources to help travelers stay safe.
            </p>
          </div>
          <div className=" p-2 rounded-lg my-auto">
            <h2 className=" text-white text-lg font-medium">
              Need to get in touch?
            </h2>
            <p className=" text-white">
              We’ll start with some questions and get you to the right place.
            </p>
            <button className="mt-2 bg-white text-black w-full px-4 py-2 rounded-lg font-medium">
              Contact us
            </button>
            <p className=" text-white pt-2">
              You can also{" "}
              <span className=" underline font-medium">give us feedback.</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelAdmin;
