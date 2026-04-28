import React, { useState } from "react";
import { ComicType } from "../../../../types/ComicType";

interface SlidesProps {
  dataComicRank: ComicType[];
}

const Slides: React.FC<SlidesProps> = ({ dataComicRank }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? dataComicRank.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === dataComicRank.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[400px] overflow-hidden">
      {/* Ảnh */}
      <div className="flex items-center justify-center gap-6 transition-all duration-500">
        {dataComicRank.map((comic, index) => {
          const isActive = index === activeIndex;
          const isPrev =
            index ===
            (activeIndex - 1 + dataComicRank.length) % dataComicRank.length;
          const isNext = index === (activeIndex + 1) % dataComicRank.length;

          let scale = "scale-75 opacity-50";
          let zIndex = "z-0";

          if (isActive) {
            scale = "scale-110 opacity-100";
            zIndex = "z-20";
          } else if (isPrev || isNext) {
            scale = "scale-90 opacity-80";
            zIndex = "z-10";
          }

          return (
            <div
              key={comic.id}
              className={`transition-all duration-500 cursor-pointer ${scale} ${zIndex}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="rounded-xl shadow-lg w-[200px] h-[300px] object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Nút điều hướng */}
      <button
        onClick={prevSlide}
        className="absolute left-0 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 bg-black/40 text-white rounded-full p-2 hover:bg-black/60 transition"
      >
        ›
      </button>
    </div>
  );
};

export default Slides;
