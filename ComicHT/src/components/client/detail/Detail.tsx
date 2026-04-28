import "./Detail.css";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaBookOpen, FaRegHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

import { RootState } from "../../../redux/authStore";
import { useToast } from "../../../context/ToastContext";
import ListComic from "../../common/listComic/ListComic";

import { Rate } from "antd";

import { ComicType } from "../../../types/ComicType";
import { CommentType } from "../../../types/CommentType";

import { getListFollowedByIdUser, toggleFollow } from "../../../api/followApi";
import { createRatingForComic } from "../../../api/rateApi";
import { getCommentsWithComic } from "../../../api/commentApi";
import { getComicById, getComicList } from "../../../api/comicApi";
import Comments from "../../common/comment/Comments";

function Detail() {
  const user = useSelector((state: RootState) => state.auth.user);

  const [dataFollowed, setDataFollowed] = useState<number[]>([]);

  const [dataComments, setDataComments] = useState<CommentType[]>([]);

  const [dataDetailComic, setDataDetailComic] = useState<ComicType>({
    id: 0,
    title: "",
    slug: "",
    content: "",
    chapters: [],
    author: { id: 0, name: "" },
    views: 0,
    coverImage: "",
    genres: [],
    rates: [],
  });

  const [valueRating, setValueRating] = useState<number>(0);

  const { showToast } = useToast();

  const { comicId } = useParams();

  const [dataComicNewUpdated, setDataComicNewUpdated] = useState<ComicType[]>(
    []
  );

  const getListComicForDetail = async () => {
    if (!user?.id) return;
    try {
      const [resComicNew, resInfoComic, resComments, resFollowed] =
        await Promise.all([
          getComicList(1, 6, "time_desc"),
          getComicById(Number(comicId)),
          getCommentsWithComic(Number(comicId)),
          getListFollowedByIdUser(user?.id),
        ]);
      setDataComicNewUpdated(resComicNew.data);
      setDataDetailComic(resInfoComic);
      setDataComments(resComments);
      setDataFollowed(resFollowed);
    } catch (error) {}
  };

  useEffect(() => {
    getListComicForDetail();
  }, [comicId]);

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

  const handleChangeRate = async (e: number) => {
    if (!user?.id) return;
    try {
      const resRating = await createRatingForComic({
        comicId: Number(comicId),
        userId: user?.id,
        rating: e,
      });
      setValueRating(e);
    } catch (error) {
      // showToast(resRating.message, "error");
    }
  };

  useEffect(() => {
    const avg =
      dataDetailComic.rates.length > 0
        ? dataDetailComic.rates.reduce((sum, r) => sum + r.rating, 0) /
          dataDetailComic.rates.length
        : 0;
    setValueRating(avg);
  }, [dataDetailComic]);

  return (
    <div className="container">
      <div className="detail-comic">
        <div className="detail-img">
          <img src={dataDetailComic?.coverImage} alt="" />
        </div>
        <div className="detail-info">
          <div className="detail-header">
            <div className="detail-title">{dataDetailComic.title}</div>
            <div className="detail-status">Đang cập nhật</div>
          </div>
          <div className="detail-tag">
            {dataDetailComic.genres.map((genre) => (
              <Link
                className="tag-type"
                key={genre.id}
                to={`/genres?category=${genre.id}`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
          <div className="detail-author">
            <span>Tên tác giả: {dataDetailComic.author.name}</span>
          </div>
          <div>
            <Rate allowHalf value={valueRating} onChange={handleChangeRate} />
          </div>
          <div className="detail-description">{dataDetailComic.content}</div>
          <div className="detail-interact">
            <Link
              to={
                dataDetailComic.chapters.length !== 0
                  ? `/${dataDetailComic.slug}/${dataDetailComic.chapters[0].id}`
                  : ""
              }
              onClick={(e) => {
                if (dataDetailComic.chapters.length === 0) {
                  e.preventDefault();
                  showToast("Chưa có chap", "error");
                } else {
                  localStorage.setItem(
                    "comicId",
                    JSON.stringify(dataDetailComic.id)
                  );
                }
              }}
            >
              <div className="detail-read">
                <div className="detail-read-icon text-white">
                  <FaBookOpen />
                </div>
                <p className="text-white">Đọc từ đầu</p>
              </div>
            </Link>
            <div
              className={`detail-collect ${
                dataFollowed.includes(dataDetailComic.id) ? "active" : ""
              }`}
              onClick={() => {
                handleFollowClick(dataDetailComic.id);
              }}
            >
              <div className="detail-collect-icon">
                <FaRegHeart className="icon-collect" />
              </div>
              <p>Theo dõi</p>
            </div>
          </div>
        </div>
        <div className="detail-tab">
          <div className="detail-tab-title">
            <h1 className="active">Chapter</h1>
            <p className="line">
              Đã cập nhật {dataDetailComic.chapters.length} chap
            </p>
            <h1>Comments</h1>
            <p>{dataComments.length}</p>
          </div>
          <div className="detail-tab-menu">
            <div className="chapters-menu">
              {dataDetailComic.chapters.map((chap) => {
                const dateChapter = new Date(chap.createdAt);
                return (
                  <Link
                    to={`/${dataDetailComic.slug}/${chap.id}`}
                    key={chap.id}
                    onClick={() => {
                      localStorage.setItem(
                        "comicId",
                        JSON.stringify(dataDetailComic.id)
                      );
                    }}
                  >
                    <div className="chapter-item">
                      <h1>Chap {chap.order}</h1>
                      <div className="chapter-data">
                        <span className="chapter-date">
                          {dateChapter.getFullYear()}-{dateChapter.getMonth()}-
                          {dateChapter.getDate()}
                        </span>
                        <span className="chapter-comments">
                          <div className="comment-icon">
                            <AiFillMessage />
                          </div>
                          <p>123</p>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Comments
        dataComments={dataComments}
        comicId={Number(comicId)}
        setDataComments={setDataComments}
      />
      <ListComic
        title="Truyện mới"
        dataComic={dataComicNewUpdated}
        isShowMore={true}
      />
    </div>
  );
}

export default Detail;
