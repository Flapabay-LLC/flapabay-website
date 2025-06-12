import { useScreenSize } from "@/utilis/screenUtils";
import { Link } from "react-router-dom";
import { Navigation, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import "swiper/css/bundle";
import { FilterEdit } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  propertyCount: number;
}

interface ListingbyCategoryProps {
  categories: Category[];
  onCategorySelect?: (categoryName: string) => void;
  selectedCategory?: string;
}

const ListingbyCategory = ({ 
  categories, 
  onCategorySelect,
  selectedCategory 
}: ListingbyCategoryProps) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const handleCategoryClick = (categoryName: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
  };

  useEffect(() => {
    const swiper = swiperRef.current?.swiper;

    if (swiper && prevRef.current && nextRef.current) {
      // Assign the navigation refs
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();

      const updateNavState = () => {
        setAtStart(swiper.isBeginning);
        setAtEnd(swiper.isEnd);
      };

      swiper.on("slideChange", updateNavState);
      updateNavState();
    }
  }, [categories]);

  const isMobile = useScreenSize();
  const location = useLocation();
  const isIndexPage = location.pathname === "/";

  return (
    <div className="relative w-full max-w-full items-center justify-center">
      {/* Navigation buttons */}
      <div className="absolute top-[2.5rem] -translate-y-1/2 w-full flex justify-between items-center px-1 z-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Button
            ref={prevRef}
            variant="default"
            size="icon"
            className={`bg-flapabay-yellow text-white shadow transition-opacity duration-200 ${
              atStart ? "opacity-0 cursor-default" : "opacity-100"
              }`}
          >
            <i className="far fa-chevron-left" />
          </Button>
        </div>
        <div className="flex items-center gap-2 ml-auto pointer-events-auto">
          <Button
            ref={nextRef}
            variant="default"
            size="icon"
            className={`bg-flapabay-yellow text-white shadow transition-opacity duration-200 ${
              atEnd ? "opacity-0 cursor-default" : "opacity-100"
              }`}
          >
            <i className="far fa-chevron-right" />
          </Button>
          <Button variant="outline" size="icon" className="text-sm font-medium shadow">
            <FilterEdit size={15} color="#000000" />
          </Button>
        </div>
      </div>

      {/* Right fade gradient */}
      <div className="pointer-events-none relative left-2 top-0 bottom-0 w-60 bg-[linear-gradient(92deg, #ffffff99 16%, #ffffff 26px, #ffffff 100%)] z-10" />

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        spaceBetween={8}
        modules={[Navigation, Mousewheel]}
        slidesPerView={1}
        breakpoints={{
          300: { slidesPerView: 4 },
          768: { slidesPerView: 6 },
          1024: { slidesPerView: 10 },
          1200: { slidesPerView: 12 },
        }}
        className="!overflow-visible text-white pt-0 sm:gap-0"
      >
        {categories.map((category) => {
          const isSelected = selectedCategory === category.name;

          // Determine conditional styles
          const iconBgColor =
            isMobile && isIndexPage ? "bg-white" : isSelected ? "bg-flapabay-yellow" : "bg-yellow-400/10";
          const iconColor =
            isMobile && isIndexPage ? "#ffc500" : isSelected ? "#fff" : "#ffc500";
          const textColor =
            isMobile && isIndexPage ? "text-white" : "text-black";

          return (
            <SwiperSlide key={category.id}>
              <div
                className={`flex flex-col items-center cursor-pointer transition-transform duration-300 ${
                  isSelected ? "scale-70" : "scale-90"
                }`}
                onClick={() => handleCategoryClick(category.name)}
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-colors ${iconBgColor}`}
                >
                  {category.icon && (
                    <category.icon
                      size={28}
                      color={iconColor}
                      variant="TwoTone"
                    />
                  )}
                </div>
                <p
                  className={`text-sm text-[13px] ${
                    isSelected ? "font-semibold" : "font-[500]"
                  } ${textColor}`}
                >
                  {category.name}
                </p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ListingbyCategory;
