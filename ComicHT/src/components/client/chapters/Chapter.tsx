import {
  AiOutlineBars,
  AiOutlineDoubleLeft,
  AiOutlineDoubleRight,
} from "react-icons/ai";

import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { getChapterDetailById } from "../../../api/chapterApi";
import Comments from "../../common/comment/Comments";
import { getCommentsWithChapter } from "../../../api/commentApi";
import { CommentType } from "../../../types/CommentType";

function Chapters() {
  const { comicSlug, chapterId } = useParams();

  const navigate = useNavigate();

  const comicId = localStorage.getItem("comicId");

  const [dataContentChapter, setDataContentChapter] = useState<string[]>([]);

  const [dataCommentByChapter, setDataCommentByChapter] = useState<
    CommentType[]
  >([]);

  const [dataChapterCurrent, setDataChapterCurrent] = useState<{
    currentChapter: {
      id: number;
      nameComic: string;
      content: string;
      order: number;
    };
    nextChapter: { id: number; comicId: number } | null;
    prevChapter: { id: number; comicId: number } | null;
  }>({
    currentChapter: { id: 0, nameComic: "", content: "", order: 0 },
    nextChapter: null,
    prevChapter: null,
  });

  useEffect(() => {
    const getDataChapter = async () => {
      try {
        const [resChapter, resComments] = await Promise.all([
          getChapterDetailById(Number(comicId), Number(chapterId)),
          getCommentsWithChapter(Number(comicId), Number(chapterId)),
        ]);
        setDataCommentByChapter(resComments);
        const contentCurrent = JSON.parse(
          JSON.parse(resChapter.currentChapter.content)
        );
        setDataChapterCurrent(resChapter);
        setDataContentChapter(contentCurrent);
      } catch (error) {}
    };
    getDataChapter();
  }, [chapterId]);

  const nameComic = localStorage.getItem("nameComic");
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center">
        <div className="header-chapter flex items-center">
          <span className="text-xl">{nameComic}</span>
          <span className="mr-2 ml-2">-</span>
          <span className="text-xl">Chương 1</span>
        </div>
        <div className="flex mt-2">
          <span className="text-xl">
            <AiOutlineDoubleLeft
              className={`cursor-pointer ${
                dataChapterCurrent.prevChapter === null
                  ? "text-gray-400 pointer-events-none"
                  : ""
              }`}
              onClick={() => {
                navigate(`/${comicSlug}/${dataChapterCurrent.prevChapter?.id}`);
              }}
            />
          </span>
          <span className=" mr-3 ml-3 flex flex-col items-center">
            <AiOutlineBars className="text-xl" />
            <p>Chương</p>
          </span>
          <span className="text-xl">
            <AiOutlineDoubleRight
              className={`cursor-pointer ${
                dataChapterCurrent.nextChapter === null
                  ? "text-gray-400 pointer-events-none"
                  : ""
              }`}
              onClick={() => {
                navigate(`/${comicSlug}/${dataChapterCurrent.nextChapter?.id}`);
              }}
            />
          </span>
        </div>
      </div>
      <div>
        {dataContentChapter.map((chap, i) => {
          return (
            <div className="" key={chap}>
              <img
                className="m-auto"
                src={dataContentChapter[i]}
                alt=""
                style={{ width: "550px" }}
              />
            </div>
          );
        })}
      </div>
      <div className="flex mt-4 justify-center items-center">
        <span className="flex flex-col items-center mr-4">
          <AiOutlineDoubleLeft
            className={`cursor-pointer text-2xl ${
              dataChapterCurrent.prevChapter === null
                ? "text-gray-400 pointer-events-none"
                : ""
            }`}
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate(`/${comicSlug}/${dataChapterCurrent.prevChapter?.id}`);
            }}
          />
          <p>Back</p>
        </span>
        <span className="flex flex-col items-center ml-4">
          <AiOutlineDoubleRight
            className={`cursor-pointer text-2xl ${
              dataChapterCurrent.nextChapter === null
                ? "text-gray-400 pointer-events-none"
                : ""
            }`}
            onClick={() => {
              window.scrollTo({ top: 0 });
              navigate(`/${comicSlug}/${dataChapterCurrent.nextChapter?.id}`);
            }}
          />
          <p>Next</p>
        </span>
      </div>
      <Comments
        comicId={Number(comicId)}
        chapterId={Number(chapterId)}
        dataComments={dataCommentByChapter}
        setDataComments={setDataCommentByChapter}
      />
    </div>
  );
}

export default Chapters;
