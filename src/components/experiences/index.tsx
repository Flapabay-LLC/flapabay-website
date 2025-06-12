import ExperienceContent from "@/pages/website/experiences/ExperienceContent";
import Experiences from "@/pages/website/experiences/Experiences";
import { FaRegHeart } from "react-icons/fa";
import Footer from "@/components/common/default-footer";
import Header from "@/components/common/DefaultHeader";
import Hero from "../home/home-v1/hero";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import MobileMenu from "@/components/common/mobile-menu";
import { useState } from "react";

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
      {/* <section className="home-banner-style1 p0">
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
      </section> */}

      <Experiences />
    </>
  );
};

export default ExperiencePage;
