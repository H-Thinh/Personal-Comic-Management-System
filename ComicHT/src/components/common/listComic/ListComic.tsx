import React, { useEffect, useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useToast } from "../../../context/ToastContext";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/authStore";

import { IoIosInformationCircle } from "react-icons/io";
import { CiHeart } from "react-icons/ci";

import { getListFollowedByIdUser, toggleFollow } from "../../../api/followApi";

import { ComicType } from "../../../types/ComicType";
import { updateViewComic } from "../../../api/comicApi";
import { createHistory } from "../../../api/historyApi";

interface ListComicProps {
  title: string;
  dataComic: ComicType[];
  isShowMore: boolean;
  linkName?: string;
}

const ListComic: React.FC<ListComicProps> = ({
  title,
  dataComic,
  isShowMore,
  linkName,
}) => {
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement>(null);
  const [dataFollowed, setDataFollowed] = useState<number[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const getListFollowed = async () => {
      try {
        if (!user?.id) return;

        const resFollowed = await getListFollowedByIdUser(user?.id);
        setDataFollowed(resFollowed);
      } catch (error) {}
    };
    getListFollowed();
  }, []);

  const { showToast } = useToast();

  const handleFollowClick = async (id: number) => {
    try {
      const data: {
        comicId: number;
        userId: number;
      } = { comicId: id, userId: user?.id || 0 };

      const resFollowed = await toggleFollow(data);
      showToast(resFollowed.message, "success");
      setDataFollowed((prev) =>
        prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const comicItems = listRef.current?.querySelectorAll(".comic-item");

    if (!comicItems) return;

    comicItems.forEach((item) => {
      const introduce = item.querySelector(".introduce-comic") as HTMLElement;

      let timer: ReturnType<typeof setTimeout>;

      const handleEnter = () => {
        timer = setTimeout(() => {
          introduce.style.opacity = "1";
          introduce.style.visibility = "visible";
        }, 500);
      };

      const handleLeave = () => {
        clearTimeout(timer);
        introduce.style.opacity = "0";
        introduce.style.visibility = "hidden";
      };

      item.addEventListener("mouseenter", handleEnter);
      introduce.addEventListener("mouseleave", handleLeave);

      return () => {
        item.removeEventListener("mouseenter", handleEnter);
        introduce.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, []);

  const handleViewsComic = async (comicId: number, chapterId: number) => {
    if (!user?.id) return;

    const data: {
      comicId: number;
      userId: number;
      chapterId: number;
    } = { chapterId, userId: user.id, comicId };

    try {
      const [resView, resHistory] = await Promise.all([
        updateViewComic(comicId, user.id),
        createHistory(data),
      ]);
      console.log(resView);
      console.log(resHistory);
    } catch (error) {}
  };

  return (
    <div className="list-item">
      <h2>{title}</h2>
      {isShowMore ? (
        <Link to={linkName || ""}>
          <p className="comic-link float-right md:mb-1">Xem thêm {">>"}</p>
        </Link>
      ) : (
        ""
      )}

      <ul ref={listRef} className="comic-more grid grid-cols-6">
        {dataComic?.map((comic) => {
          return (
            <li
              className="relative comic-item bg-gray-100 rounded-lg"
              key={comic.id}
            >
              <img
                src={comic.coverImage}
                alt={comic.title}
                className="image-comic"
                onClick={() => navigate(`/detail/${comic.id}`)}
              />
              <p className="name-comic">{comic.title}</p>
              <p className="chap-comic">{comic.chapters.length} Chap</p>
              <div className="introduce-comic absolute shadow-lg">
                <img
                  src={comic.coverImage}
                  alt=""
                  style={{ height: "350px" }}
                />
                <div className="info-comic">
                  <p className="name-comic">{comic.title}</p>

                  <div className="flex justify-between items-center">
                    <p className="author-comic">{comic.author.name}</p>
                    <button
                      className="border-2 border-solid rounded-md px-3 p-1 flex items-center mr-2"
                      onClick={() => navigate(`/detail/${comic.id}`)}
                    >
                      <span className="mr-2">
                        <IoIosInformationCircle />
                      </span>
                      Chi tiết
                    </button>
                  </div>

                  <div className="flex mt-2 justify-between">
                    <Link
                      to={
                        comic.chapters.length !== 0
                          ? `/${comic.slug}/${comic.chapters[0].id}`
                          : ""
                      }
                      onClick={(e) => {
                        if (comic.chapters.length === 0) {
                          e.preventDefault();
                          showToast("Chưa có chap", "error");
                        } else {
                          localStorage.setItem(
                            "comicId",
                            JSON.stringify(comic.id)
                          );
                          handleViewsComic(comic.id, comic.chapters[0].id);
                        }
                      }}
                    >
                      <button className="border-2 border-solid rounded-md px-3 p-1 mr-2 border-red-500 bg-red-500 text-white">
                        Đọc
                      </button>
                    </Link>

                    <button
                      className={`follow-comic border-2 border-solid rounded-md px-3 p-1 flex items-center border-red-500 transition-all duration-300 ${
                        dataFollowed.includes(comic.id)
                          ? "active bg-red-500 text-white"
                          : ""
                      }`}
                      onClick={() => {
                        handleFollowClick(comic.id);
                      }}
                    >
                      <span className="mr-2">
                        <CiHeart
                          style={{
                            color: dataFollowed.includes(comic.id)
                              ? "white"
                              : "red",
                          }}
                        />
                      </span>
                      <p>Theo dõi</p>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ListComic;
