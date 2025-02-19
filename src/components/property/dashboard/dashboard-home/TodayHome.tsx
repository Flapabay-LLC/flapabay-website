import React, { useState } from "react";
import { ImFileEmpty } from "react-icons/im";
import { Link } from "react-router-dom";
interface Reservation {
  id: number;
  guestName: string;
  status: "checkingOut" | "currentlyHosting" | "arrivingSoon" | "upcoming" | "pendingReview";
  date: string;
}

const stats = [
  {
    title: "Average Rating",
    value: "4.9",
    description: "Your Rating has gone done",
    trend: "down",
  },
  {
    title: "New Bookings",
    value: "33",
    description: "Compared to (last month)",
    trend: "up",
  },
  {
    title: "Available Earnings",
    value: "$1289",
    description: "Compared to ($21340 last year)",
    trend: "up",
  },
  {
    title: "Total Properties",
    value: "0",
    description: "Compared to ($21340 last year)",
    trend: "up",
  },
];
const dummyReservations: Reservation[] = [
  {
    id: 1,
    guestName: "John Doe",
    status: "currentlyHosting",
    date: "2025-02-10",
  },
  {
    id: 2,
    guestName: "Jane Smith",
    status: "upcoming",
    date: "2025-02-15",
  },
];

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`p-4 border border-gray-300 rounded-lg ${className}`}>{children}</div>
);

const Button: React.FC<{ onClick: () => void; active: boolean; children: React.ReactNode }> = ({ onClick, active, children }) => (
  <button
    className={`px-2 py-2 rounded-full  border ${active ? "border-black" : "border-gray-300"} ${active ? "bg-gray-100" : "  bg-white"}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TodayHome: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);
  const [selectedTab, setSelectedTab] = useState("checkingOut");

  const filteredReservations = reservations.filter((res) => res.status === selectedTab);

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-semibold">Welcome back, George</h1>












      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
        <h3 className="text-black font-semibold text-lg">Average Rating <span className="text-red-500">↓</span></h3>
        <p className="text-white text-3xl font-bold mt-2">4.9</p>
        <p className="text-gray-200 mt-1 text-sm">Your Rating has gone down</p>
      </div>
      <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
        <h3 className="text-gray-800 font-semibold text-lg">New Bookings <span className="text-green-500">↑</span></h3>
        <p className="text-white text-3xl font-bold mt-2">33</p>
        <p className="text-gray-200 mt-1 text-sm">Compared to (last month)</p>
      </div>
      <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
        <h3 className="text-gray-800 font-semibold text-lg">Available Earnings <span className="text-green-500">↑</span></h3>
        <p className="text-white text-3xl font-bold mt-2">$1289</p>
        <p className="text-gray-200 mt-1 text-sm">Compared to ($21340 last year)</p>
      </div>
      <div className="bg-[#FFC500] rounded-2xl shadow-md p-6">
        <h3 className="text-gray-800 font-semibold text-lg">Total Properties <span className="text-green-500">↑</span></h3>
        <p className="text-white text-3xl font-bold mt-2">0</p>
        <p className="text-gray-200 mt-1 text-sm">Compared to ($21340 last year)</p>
      </div>
    </div>







      <div className="mt-4">
        <div className=" flex justify-between items-center">
        <h2 className="text-lg font-medium">Your reservations</h2>
        <Link to="/dashboard-my-favourites">
            <div className="font-medium underline cursor-pointer">All Reservations (0)</div>
          </Link>
        </div>
        <div className="mt-2  overflow-x-auto whitespace-nowrap md:overflow-hidden flex gap-2">
          {["checkingOut", "currentlyHosting", "arrivingSoon", "upcoming", "pendingReview"].map((tab) => (
            <Button key={tab} onClick={() => setSelectedTab(tab)} active={selectedTab === tab}>
              {tab.replace(/([A-Z])/g, " $1")} ({reservations.filter((r) => r.status === tab).length})
            </Button>
          ))}
        </div>
      </div>
      <div className="pt-6">
        {filteredReservations.length === 0 ? (
            <div>
            
          <Card className="flex flex-col bg-gray-100 items-center justify-center p-10 text-gray-500">
          <div className=" text-[30px]"><ImFileEmpty /></div>
            <p className=" mt-2 w-[33%] text-center">You don’t have any guests {selectedTab.replace(/([A-Z])/g, " $1")} today or tomorrow.</p>
          </Card></div>
        ) : (
          <div className="space-y-4">
            {filteredReservations.map((reservation) => (
              <Card key={reservation.id}>
                <div className=" flex items-center justify-between">
                    <div>
                <h3 className="text-lg font-semibold">{reservation.guestName}</h3>
                <p className="text-gray-600">{reservation.date}</p>
                </div>
                <div>
                <p>{reservation.status}</p>
                </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayHome;