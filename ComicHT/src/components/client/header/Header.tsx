import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

import { FaArrowUp, FaCaretDown } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../../redux/authSlice";
import { RootState } from "../../../redux/authStore";
// import { useAuth } from "../../../context/AuthContext";

import { logoutUser } from "../../../api/authApi";
import { getGenreList } from "../../../api/genresApi";
import { searchComics } from "../../../api/comicApi";

import SearchComics from "./SearchComics";
import ChatClient from "./ChatClient";

const ArrowUpIcon = FaArrowUp as React.FC<{
  className?: string;
  size?: number;
  onClick?: Function;
}>;

function Header() {
  const user = useSelector((state: RootState) => state.auth.user);
  // const { user } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [input, setInput] = useState<{ message: string; search: string }>({
    message: "",
    search: "",
  });

  const [dataSearchComic, setDataSearchComic] = useState<
    { id: number; title: string; coverImage: string }[]
  >([]);

  const [dataGenres, setDataGenres] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isVisible, setIsVisible] = useState(false);

  const [isDownSearch, setIsDownSearch] = useState(false);

  const [isDownGenres, setIsDownGenres] = useState(false);

  const [isInfo, setIsInfo] = useState(false);

  const [showMessage, setShowMessage] = useState(false);

  const searchRef = useRef<HTMLInputElement | null>(null);

  const genresRef = useRef<HTMLLIElement>(null);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleOut = async () => {
    try {
      await logoutUser();
      setIsInfo(false);
      localStorage.clear();
      navigate("/login");
      dispatch(logout());
    } catch (error) {}
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up
  }, []);

  useEffect(() => {
    const getListGenres = async () => {
      try {
        const resGenres = await getGenreList();
        setDataGenres(resGenres.Genre);
      } catch (error) {}
    };
    getListGenres();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        genresRef.current &&
        !genresRef.current.contains(e.target as Node) &&
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setIsDownSearch(false);
        setIsDownGenres(false);
      }
    };
    document.addEventListener("mouseup", handleClickOutside);
    return () => document.removeEventListener("mouseup", handleClickOutside);
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!input.search.trim()) {
        setIsDownSearch(false);
        setDataSearchComic([]);
        return;
      }
      try {
        const res = await searchComics(input.search.trim());
        setDataSearchComic(res);
        setIsDownSearch(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);

    return () => clearTimeout(delaySearch);
  }, [input.search]);

  return (
    <header id="header">
      <div className="container">
        <div id="header-comic">
          <div className="logo">
            <Link to="/">LOGO</Link>
          </div>
          <ul className="info-more">
            <li>
              <Link to="/follow">Theo dõi</Link>
            </li>
            <li>
              <Link to="/history">Lịch sử</Link>
            </li>
            <li ref={genresRef}>
              <div
                className="flex items-center cursor-pointer"
                onClick={() => {
                  setIsDownGenres(!isDownGenres);
                  setIsDownSearch(false);
                }}
              >
                <p>Thể loại</p>
                <FaCaretDown />
              </div>
              <ul
                className={`catory-more ${
                  isDownGenres ? "grid grid-cols-4 gap-4" : "hide"
                } `}
              >
                {dataGenres.map((genre) => (
                  <Link
                    to={`/genres?category=${genre.id}`}
                    key={genre.id}
                    onClick={() => {
                      localStorage.setItem("selectGenre", String(genre.id));
                      setIsDownGenres(false);
                    }}
                  >
                    <li>{genre.name}</li>
                  </Link>
                ))}
              </ul>
            </li>
          </ul>
          <SearchComics
            user={user}
            input={input}
            searchRef={searchRef}
            isDownSearch={isDownSearch}
            dataSearchComic={dataSearchComic}
            setInput={setInput}
            handleInput={handleInput}
            setIsDownSearch={setIsDownSearch}
            setIsDownGenres={setIsDownGenres}
          />
          {user ? (
            <>
              <div className={`flex items-center ${isInfo ? " active" : ""}`}>
                <span className="mr-1">{user.name}</span>
                <IoIosArrowDown
                  className="cursor-pointer"
                  onClick={() => setIsInfo(!isInfo)}
                />
                <ul className="list-info">
                  <li onClick={() => navigate("/info")}>Thông tin cá nhân</li>
                  <li onClick={handleOut}>Đăng xuất</li>
                </ul>
              </div>
            </>
          ) : (
            <Link to={"/login"} className="log-in">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
      <div>
        <ArrowUpIcon
          className={`go_to_top ${
            isVisible ? "active" : ""
          } fixed bottom-7 right-12`}
          size={30}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        {showMessage ? (
          <ChatClient
            user={user}
            input={input}
            handleInput={handleInput}
            setShowMessage={setShowMessage}
          />
        ) : (
          <div
            className="fixed bottom-7 right-24 bg-red-500 p-2 rounded-s-2xl rounded-se-2xl cursor-pointer"
            onClick={() => setShowMessage(true)}
          >
            <FaMessage />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
