import React, { useEffect, useRef, useState } from "react";
import { FaImage } from "react-icons/fa";

import { createComic, updateComicById } from "../../../api/comicApi";
import { InterfaceDefault } from "../../../types/InterfaceDefault";
import { getAuthorList } from "../../../api/authorApi";
import { ComicType } from "../../../types/ComicType";
import ListGenre from "./ListGenre";

interface FormComicProps {
  inputs: {
    content: string;
    title: string;
    author: string;
  };
  currentComicId: number;
  imageSrc: string;
  selectedGenres: number[];
  isUpdate: boolean;
  selectedAuthor: number;
  handleSelectGenre: (id: number) => void;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hanldeResetForm: () => void;
  setImageSrc: React.Dispatch<React.SetStateAction<string>>;
  setInputs: React.Dispatch<
    React.SetStateAction<{
      content: string;
      title: string;
      author: string;
    }>
  >;
  setSelectedAuthor: React.Dispatch<React.SetStateAction<number>>;
  setDataComic: React.Dispatch<React.SetStateAction<ComicType[]>>;
}

const FormComic: React.FC<FormComicProps> = ({
  currentComicId,
  selectedGenres,
  isUpdate,
  imageSrc,
  inputs,
  selectedAuthor,
  handleSelectGenre,
  handleInput,
  hanldeResetForm,
  setImageSrc,
  setInputs,
  setSelectedAuthor,
  setDataComic,
}) => {
  const [authors, setAuthors] = useState<InterfaceDefault[]>([]);

  const [avatar, setAvatar] = useState<{
    file: File | null;
    preview: string;
  }>({
    file: null,
    preview: "",
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [searchAuthor, setSearchAuthor] = useState("");

  useEffect(() => {
    const getDataAuthor = async () => {
      try {
        const resAuthor = await getAuthorList();
        setAuthors(resAuthor);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    getDataAuthor();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      let reader = new FileReader();

      reader.onload = function (e) {
        if (e.target?.result) {
          setImageSrc(e.target.result as string);
          setAvatar({
            file,
            preview: e.target.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorsSubmit = { title: "", author: "", genreIds: "", content: "" };
    let check = true;

    if (inputs.title === "") {
      errorsSubmit.title = "Vui long nhap title";
      check = false;
    }

    if (inputs.author === "") {
      errorsSubmit.author = "Vui long nhap author";
      check = false;
      console.log(check);
    }

    if (inputs.content === "") {
      errorsSubmit.content = "Vui long nhap content";
      check = false;
    }

    if (selectedGenres.length === 0) {
      errorsSubmit.title = "Vui long chon the loai";
      check = false;
    }

    if (isUpdate) {
      if (check) {
        const formData = new FormData();
        formData.append("title", inputs.title);
        formData.append("authorID", selectedAuthor.toString());
        formData.append("content", inputs.content);

        if (avatar.file) {
          formData.append("coverImage", avatar.file); // ✅ Đúng: truyền file thật
        }

        selectedGenres.map((genreId) => {
          formData.append("genreIds[]", genreId.toString());
        });

        try {
          const resComicNew = await createComic(formData);
          setDataComic((prev) => [...prev, resComicNew]);
          hanldeResetForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(errorsSubmit);
      }
    } else {
      if (check) {
        const formData = new FormData();

        formData.append("title", inputs.title);

        formData.append("authorID", selectedAuthor.toString());

        formData.append("content", inputs.content);

        if (avatar.file) {
          formData.append("coverImage", avatar.file || imageSrc);
        }

        selectedGenres.map((genreId) => {
          formData.append("genreIds[]", genreId.toString());
        });

        try {
          const resComicUpdated = await updateComicById(
            currentComicId,
            formData
          );
          setDataComic((prev) =>
            prev.map((user) =>
              user.id === resComicUpdated.id ? resComicUpdated : user
            )
          );
          hanldeResetForm();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(errorsSubmit);
      }
    }
  };

  return (
    <div className="form justify-between">
      <form className="form-left" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên sách"
            name="title"
            value={inputs.title}
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Tên tác giả"
            name="author"
            value={inputs.author}
            onChange={(e) => {
              setSearchAuthor(e.target.value);
              handleInput(e);
            }}
          />
          <ul
            className="author-box"
            style={{
              display: searchAuthor !== "" ? "block" : "none",
            }}
          >
            {authors
              .filter((author) =>
                author.name.toLowerCase().includes(searchAuthor.toLowerCase())
              )
              .slice(0, 4)
              .map((author) => (
                <li
                  key={author.id}
                  onClick={() => {
                    setInputs((prev) => ({
                      ...prev,
                      author: author.name,
                    }));
                    setSelectedAuthor(author.id);
                    setSearchAuthor("");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {author.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Giới thiệu về sách"
            name="content"
            value={inputs.content}
            onChange={handleInput}
          />
        </div>
        <ListGenre
          selectedGenres={selectedGenres}
          handleSelectGenre={handleSelectGenre}
        />
        {isUpdate ? (
          <button className="submit-btn">Thêm sách</button>
        ) : (
          <>
            <button className="submit-btn">Cập nhập sách</button>
            <button className="cancel-btn" onClick={hanldeResetForm}>
              Hủy
            </button>
          </>
        )}
      </form>

      <div className="form-right">
        <input
          type="file"
          name=""
          id=""
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
        <div className="image-box">
          {imageSrc !== "" ? (
            <img
              id="imageShow"
              src={imageSrc}
              alt=""
              style={{
                width: "200px",
                height: "250px",
                borderRadius: "10px",
              }}
            />
          ) : (
            <FaImage
              className="fas fa-image"
              style={{ fontSize: "48px", color: "white" }}
            />
          )}
        </div>
        <button
          className="file-upload"
          onClick={() => {
            fileInputRef.current?.click();
          }}
        >
          Thêm ảnh
        </button>
      </div>
    </div>
  );
};

export default FormComic;
