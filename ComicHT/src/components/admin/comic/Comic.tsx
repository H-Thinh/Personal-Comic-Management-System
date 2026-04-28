import "./Comic.css";
import React, { useEffect, useState } from "react";

import { deleteComic, getComicById, getComicList } from "../../../api/comicApi";

import FormBook from "./FormComic";
import { Pagination } from "antd";
import { ComicType } from "../../../types/ComicType";

function Comic() {
  const [currentComicId, setCurrentComicId] = useState<number>(0);

  const [dataComic, setDataComic] = useState<ComicType[]>([]);

  const [imageSrc, setImageSrc] = useState<string>("");

  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [isUpdate, setIsUpdate] = useState<boolean>(true);

  const [inputs, setInputs] = useState<{
    content: string;
    title: string;
    author: string;
  }>({
    title: "",
    author: "",
    content: "",
  });

  const [selectedAuthor, setSelectedAuthor] = useState<number>(0);

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getDataComic = async () => {
      try {
        const resComics = await getComicList(page, 10);
        setDataComic(resComics.data);
        setTotalPage(resComics.total);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    getDataComic();
  }, [page]);

  function handleSelectGenre(id: number) {
    setSelectedGenres((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((pre) => ({ ...pre, [name]: value }));
  }

  const handleDeleteComic = async (id: number) => {
    try {
      await deleteComic(id);
      setDataComic((prev) => prev.filter((comic) => comic.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const resComicUpdated = await getComicById(id);

      setInputs((prev) => ({
        ...prev,
        title: resComicUpdated.title,
        author: resComicUpdated.author.name,
        content: resComicUpdated.content,
      }));

      const genreIds = resComicUpdated.genres.map((g: any) => g.id);

      setSelectedGenres(genreIds);
      setImageSrc(`${resComicUpdated.coverImage}`);
      setCurrentComicId(id);
      setIsUpdate(false);
      setSelectedAuthor(resComicUpdated.author.id);
    } catch (error) {
      console.log(error);
    }
  };

  function hanldeResetForm() {
    setIsUpdate(true);
    setInputs({ title: "", author: "", content: "" });
    setSelectedGenres([]);
    setImageSrc("");
    setCurrentComicId(0);
  }

  return (
    <>
      <section className="book-tabs-section">
        <div className="table-card">
          <FormBook
            setDataComic={setDataComic}
            setInputs={setInputs}
            hanldeResetForm={hanldeResetForm}
            handleInput={handleInput}
            handleSelectGenre={handleSelectGenre}
            inputs={inputs}
            currentComicId={currentComicId}
            imageSrc={imageSrc}
            selectedGenres={selectedGenres}
            isUpdate={isUpdate}
            selectedAuthor={selectedAuthor}
            setSelectedAuthor={setSelectedAuthor}
            setImageSrc={setImageSrc}
          />
        </div>
        <div className="table-container">
          <div className="book-list">
            {Object.keys(dataComic).map((key, i) => (
              <div className="book-item" key={i}>
                <img
                  src={dataComic[i].coverImage}
                  alt="Bìa sách"
                  className="book-cover"
                />
                <div className="book-info">
                  <h3 className="book-title line-clamp-1">
                    {dataComic[i].title}
                  </h3>
                  <p className="book-author">{dataComic[i].author.name}</p>
                  <div className="button-group">
                    <button
                      onClick={() => {
                        handleDeleteComic(dataComic[i].id);
                      }}
                      className="delete-btn"
                    >
                      Xóa
                    </button>
                    <button
                      className="update-btn"
                      onClick={() => {
                        handleUpdate(dataComic[i].id);
                      }}
                    >
                      Cập nhật
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            align="center"
            current={page}
            pageSize={10}
            total={totalPage}
            style={{ marginTop: 10 }}
            onChange={(p) => setPage(p)}
            simple
          />
        </div>
      </section>
    </>
  );
}

export default Comic;
