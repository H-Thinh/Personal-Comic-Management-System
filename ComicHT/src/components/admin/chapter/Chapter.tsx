import { useEffect, useState } from "react";
import "./Chapter.css";

import axios from "axios";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useToast } from "../../../context/ToastContext";
import { getChapterById } from "../../../api/chapterApi";
import CartComicForChapter from "./CardComicForChapter";
import FormChapter from "./FormChapter";
import { Files } from "./FilesType";

function Chapter() {
  const [inputs, setInputs] = useState<{
    chapter: number;
    title: string;
  }>({
    chapter: 0,
    title: "",
  });

  const [images, setImages] = useState<Files[]>([]);

  const [DataTableChapter, setDataTableChapter] = useState<
    {
      id: number;
      title: string;
      content: string;
      order: number;
      comicId: number;
    }[]
  >([]);

  const [dataImg, setDataImg] = useState<string[]>([]);

  const [checkShowImg, setCheckShowImg] = useState(false);

  const { showToast } = useToast();

  const [idComic, setIdComic] = useState<number>(0);

  const [idChapter, setIdChapter] = useState<number>();

  const [isUpdateChapter, setIsUpdateChapter] = useState(false);

  const [isShowModalForm, setIsShowModalForm] = useState<boolean>(false);

  const handleGetChapterComic = async (id: number) => {
    try {
      const resChapterForComic = await getChapterById(id);
      setDataTableChapter(resChapterForComic);
      setIsShowModalForm(true);
    } catch (error) {
      console.log(error);
    }
  };

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((pre) => ({
      ...pre,
      [name]: name === "chapter" ? Number(value) : value,
    }));
  }

  // Xử lý bất động bộ ảnh
  const readFileAsync = (file: File): Promise<Files> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve({ file, preview: e.target.result as string });
        } else {
          reject("Lỗi đọc file");
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileShow = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileArray = Array.from(files);
      const results: Files[] = [];
      for (const file of fileArray) {
        try {
          const result = await readFileAsync(file);
          results.push(result);
        } catch (err) {
          console.error("Lỗi đọc file:", err);
        }
      }
      const array = results.reverse();
      setImages((prev) => [...prev, ...array]);
    }
  };

  function handleGetContent(img: string) {
    setCheckShowImg(true);
    setImages([]);
    setIsShowModalForm(false);
    const imgArray = JSON.parse(JSON.parse(img));

    setDataImg([...imgArray]);
  }

  function handleCloseContent() {
    setCheckShowImg(false);
    setIsShowModalForm(true);
  }

  function handleShowImg() {
    if (images.length === 0) {
      showToast("Vui lòng chọn ảnh để xem", "error");
    } else {
      setIsShowModalForm(false);
      setCheckShowImg(true);
    }
  }

  function handleDeleteChap(id: number, comicId: number) {
    const data = {
      comicId,
    };
    axios
      .put(`http://localhost:3001/api/chapter/delete/${id}`, data)
      .then((res) => {
        showToast("Xóa Thành Công", "success");
      })
      .catch((error) => {
        showToast("Xóa thất bại", "error");
      });
  }

  function handleSubmitChapter() {
    let check = true;

    if (inputs.chapter === 0) {
      check = false;
    }

    if (inputs.title === "") {
      check = false;
    }

    if (images.length === 0) {
      check = false;
    }

    if (check) {
      const formData = new FormData();

      formData.append("order", inputs.chapter.toString());

      formData.append("title", inputs.title);

      if (images.length !== 0) {
        Object.keys(images).map((key, i) => {
          formData.append("ChapterComic", images[i].file);
        });
      }
      if (!isUpdateChapter) {
        axios
          .post(
            `http://localhost:3001/api/chapter/add/${idComic}?order=${inputs.chapter}`,
            formData
          )
          .then((res) => {
            setDataTableChapter((prev) => [res.data, ...prev]);
            showToast("Thêm chap thành công", "success");
            resetInputs();
          })
          .catch((error) => {
            showToast("Thêm chap thất bại", "error");
          });
      } else {
        axios
          .put(
            `http://localhost:3001/api/chapter/update/${idChapter}?order=${inputs.chapter}`,
            formData
          )
          .then((res) => {
            console.log(res.data);

            // setDatatable((prev) => [res.data, ...prev]);
            // showToast("Thêm chap thành công", "success");
            // resetInputs();
          })
          .catch((error) => {
            // showToast("Thêm chap thất bại", "error");
          });
      }
    } else {
      showToast("Vui lòng điền đầy đủ", "error");
    }
  }

  function handleUpdateChap(id: number, order: number, title: string) {
    setInputs({ title: title, chapter: order });
    setIdChapter(id);
    setIsUpdateChapter(true);
  }

  function resetInputs() {
    setIsUpdateChapter(false);
    setInputs({ chapter: 0, title: "" });
    setImages([]);
  }

  return (
    <>
      {/* Hiển thị hình của truyện */}
      <div className={`content-obscure ${checkShowImg ? "show" : ""}`}>
        <IoIosCloseCircleOutline
          className="icon-content"
          onClick={handleCloseContent}
        />
        <div className="img-list">
          {images.length
            ? images.map((key, i) => {
                return <img key={i} src={`${images[i].preview}`} alt="" />;
              })
            : dataImg.map((key, i) => {
                return <img key={key} src={`${dataImg[i]}`} alt="" />;
              })}
        </div>
      </div>
      <section className="category-management">
        <h2 className="section-title">Quản lý chương truyện</h2>

        <CartComicForChapter
          handleGetChapterComic={handleGetChapterComic}
          setIdComic={setIdComic}
        />

        <FormChapter
          inputs={inputs}
          images={images}
          isUpdateChapter={isUpdateChapter}
          isShowModalForm={isShowModalForm}
          DataTableChapter={DataTableChapter}
          setImages={setImages}
          handleInputs={handleInputs}
          handleShowImg={handleShowImg}
          handleFileShow={handleFileShow}
          handleGetContent={handleGetContent}
          handleUpdateChap={handleUpdateChap}
          handleDeleteChap={handleDeleteChap}
          setIsShowModalForm={setIsShowModalForm}
          handleSubmitChapter={handleSubmitChapter}
        />
      </section>
    </>
  );
}

export default Chapter;
