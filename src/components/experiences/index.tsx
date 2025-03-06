import { useState } from "react";
import Header from "../home/home-v1/Header";
import MobileMenu from "../common/mobile-menu";
import Hero from "../home/home-v1/hero";
import PropertiesByCategory from "../home/home-v4/PropertiesByCategory";
import PropertyByCitiesWrapper from "../home/home-v3/PropertyByCitiesWrapper";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import Footer from "../common/default-footer";
import { FaRegHeart } from "react-icons/fa";

const ExperiencePage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [showMore, setShowMore] = useState(false);

  const celebrities = [
    {
      id: 1,
      name: "Celebrity One",
      desc: "Description One",
      price: 9.4,
      image:
        "https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg",
    },
    {
      id: 2,
      name: "Celebrity Two",
      desc: "Description Two",
      price: 9.4,
      image:
        "https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg",
    },
    {
      id: 3,
      name: "Celebrity Three",
      desc: "Description Three",
      price: 9.4,
      image:
        "https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg",
    },
    {
      id: 4,
      name: "Celebrity Four",
      desc: "Description Four",
      price: 9.4,
      image:
        "https://img.freepik.com/free-photo/beautiful-selective-focus-shot-crystal-ball-reflecting-breathtaking-sunset_181624-8579.jpg",
    },
  ];

  const experiences = Array.from(
    { length: 12 },
    (_, i) => `Experience ${i + 1}`
  );

  return (
    <>
      <Header />
      <MobileMenu />
      <section className="home-banner-style1 p0">
        <div className="home-style1">
          <div className="container-fluid container-fluidest">
            <div className="row">
              <div className="mx-auto col-xl-10">
                <Hero />
              </div>
            </div>
          </div>

          <a href="#explore-property">
            <div className="mouse_scroll animate-up-4">
              <img src="/images/about/home-scroll.png" alt="scroll image" />
            </div>
          </a>
        </div>
      </section>
      <div className="relative min-h-screen ">
        {/* Tabs */}
        <div className="mt-16 flex gap-4 p-4">
          {["All", "Meet celebrity", "Adventure", "Cooking"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 border rounded-md transition-all ${
                activeTab === tab
                  ? "bg-[#ffc500] text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Meet Your Celebrity Section */}
        <section className="p-4">
          <div className=" flex items-center justify-between">
            <h2 className="text-2xl font-medium pb-4">Meet Your Celebrity</h2>
            <Link className=" font-medium" to={"/agents"}>
              <MdKeyboardArrowRight className=" text-4xl" />
            </Link>
          </div>
          <div
            className="flex overflow-x-auto gap-4 no-scrollbar lg:grid lg:grid-cols-4 "
            data-aos="fade-up"
            data-aos-delay="0"
          >
            {celebrities.map((celeb) => (
              <div
                key={celeb.id}
                className="relative rounded-3xl shadow-sm flex-shrink-0 w-80"
              >
                <FaRegHeart className=" absolute text-white text-xl top-2 right-3 cursor-pointer" />
                <div className="absolute inset-0 rounded-3xl bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white ">
                  <h3 className="font-bold text-white">{celeb.name}</h3>
                  <p className="text-sm text-white">{celeb.desc}</p>
                  <button className="w-full bg-[#ffc500] text-white font-semibold py-2 mt-2 rounded-md">
                    Book for ${celeb.price}
                  </button>
                </div>
                <img
                  src={celeb.image}
                  alt={celeb.name}
                  className="w-full h-44 object-cover rounded-3xl"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Experiences Section */}
        <section className="p-4">
          <div className=" flex items-center justify-between">
            <h2 className="text-2xl font-medium pb-4">Experiences</h2>
            <Link className=" font-medium" to={"/agents"}>
              <MdKeyboardArrowRight className=" text-4xl" />
            </Link>
          </div>

          <section id="explore-property" className="pb90 pb30-md somesections">
            {/* Popular Property */}
            <PropertyByCitiesWrapper showCircularIcons={false} />
            {/* Popular Property */}
          </section>
        </section>
      </div>
      <section className="pb-0 footer-style1 pt60">
        <Footer />
      </section>
    </>
  );
};

export default ExperiencePage;
