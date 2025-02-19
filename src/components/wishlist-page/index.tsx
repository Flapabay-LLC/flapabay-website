import { Link } from "react-router-dom";
import DashboardHeader from "../common/DashboardHeader";
import MobileMenu from "../common/mobile-menu";

export default function WishlistPage() {
    return (
        <>
        <DashboardHeader/>
        <MobileMenu />
      <div className="max-w-3xl mx-auto sm:mt-2 md:mt-2 lg:mt-28 px-2">
        <h1 className="text-3xl font-bold">Wishlists</h1>
        
        <div className="pt-6">
          <div className="p-2 rounded-2xl shadow-lg inline-block">
            <Link to={"/wishlist-page-recently"}>
            <div className="grid grid-cols-2 gap-1 w-56 h-56">
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Snow cabin"
                className="w-full h-full object-cover rounded-tl-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="City view apartment"
                className="w-full h-full object-cover rounded-tr-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Countryside house"
                className="w-full h-full object-cover rounded-bl-2xl"
              />
              <img
                src="https://img.freepik.com/premium-photo/side-view-adventurous-couple-bivouacking_23-2150562891.jpg"
                alt="Mountain retreat"
                className="w-full h-full object-cover rounded-br-2xl"
              />
            </div>
            </Link>
          </div>
          
          <div className="mt-4">
            <p className="text-lg font-semibold">Recently viewed</p>
            <p className="text-gray-600">Yesterday</p>
          </div>
        </div>
      </div>
      </>
    );
  }
  