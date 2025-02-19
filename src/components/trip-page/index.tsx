import { Link } from "react-router-dom";
import DashboardHeader from "../common/DashboardHeader";
import MobileMenu from "../common/mobile-menu";


export default function TripsPage() {
  

  return (
    <>
    <DashboardHeader/>
    <MobileMenu />
    <div className="max-w-2xl mx-auto sm:mt-2 md:mt-2 lg:mt-28 px-2  ">
      <h1 className="text-3xl font-bold">Trips</h1>
      <p className="text-lg font-semibold pt-6">No trips booked...yet!</p>
      <p className="text-gray-600 mt-2">
        Time to dust off your bags and start planning your next adventure.
      </p>
      <div className="pb-4 pt-4">
      <Link to={"/"}>
      <button
        
        className=" px-6 py-2 border border-black font-medium rounded-lg text-black hover:bg-gray-100"
      >
        Start searching
      </button>
      
      </Link>
      </div>
      <p className="mt-10 text-gray-600">
        Can’t find your reservation here? <a href="#" className="text-black font-semibold underline">Visit the Help Center</a>
      </p>
    </div>
    </>
  );
}
