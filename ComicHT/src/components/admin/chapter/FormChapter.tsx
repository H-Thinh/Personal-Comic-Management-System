import { Modal } from "antd";
import React, { useRef } from "react";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Files } from "./FilesType";

interface FormChapterProps {
  inputs: {
    chapter: number;
    title: string;
  };
  isUpdateChapter: boolean;
  images: Files[];
  isShowModalForm: boolean;
  DataTableChapter: {
    id: number;
    title: string;
    content: string;
    order: number;
    comicId: number;
  }[];
  setImages: React.Dispatch<React.SetStateAction<Files[]>>;
  handleInputs: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowImg: () => void;
  handleFileShow: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsShowModalForm: React.Dispatch<React.SetStateAction<boolean>>;
  handleGetContent: (img: string) => void;
  handleUpdateChap: (id: number, order: number, title: string) => void;
  handleDeleteChap: (id: number, comicId: number) => void;
  handleSubmitChapter: () => void;
}

const FormChapter: React.FC<FormChapterProps> = ({
  inputs,
  images,
  isUpdateChapter,
  isShowModalForm,
  DataTableChapter,
  setImages,
  handleInputs,
  handleShowImg,
  handleFileShow,
  handleGetContent,
  handleUpdateChap,
  handleDeleteChap,
  setIsShowModalForm,
  handleSubmitChapter,
}) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  return (
    <Modal
      open={isShowModalForm}
      okText={isUpdateChapter ? "Cập nhật chương" : "Thêm chương"}
      width={{
        xs: "90%",
      }}
      onCancel={() => {
        setIsShowModalForm(false);
        setImages([]);
      }}
      cancelText="Hủy"
      onOk={handleSubmitChapter}
    >
      <div className="flex">
        <div className="add-category-form">
          <input
            type="text"
            placeholder="Nhập số chương"
            className="input-category"
            name="chapter"
            value={inputs.chapter}
            onChange={handleInputs}
          />{" "}
          <input
            type="text"
            placeholder="Tên chương"
            className="input-category"
            name="title"
            value={inputs.title}
            onChange={handleInputs}
          />
          <div className="show-image">
            <div className="image">
              {Object.keys(images).map((key, i) => {
                return <p>{images[i].file.name}</p>;
              })}
            </div>
            <button
              className="btn-add-image"
              onClick={() => {
                imageRef.current?.click();
                setImages([]);
              }}
            >
              Thêm ảnh
            </button>
            <button
              className="btn-content-show"
              onClick={() => {
                handleShowImg();
              }}
            >
              Xem
            </button>
          </div>
          <input
            type="file"
            className="input-category"
            multiple
            hidden
            onChange={handleFileShow}
            ref={imageRef}
          />
        </div>

        <table className="category-table" style={{ height: "0px" }}>
          <thead>
            <tr>
              <th>Chap</th>
              <th>Title</th>
              <th>Nội dung</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(DataTableChapter).map((key, i) => {
              return (
                <tr key={key} className="h-10">
                  <td>{DataTableChapter[i].order}</td>
                  <td>{DataTableChapter[i].title}</td>
                  <td>
                    <button
                      className="btn-content"
                      onClick={() => {
                        handleGetContent(DataTableChapter[i].content);
                      }}
                    >
                      Xem
                    </button>
                  </td>
                  <td>
                    <div className="icons">
                      <FaPen
                        className="edit-icon"
                        onClick={() =>
                          handleUpdateChap(
                            DataTableChapter[i].id,
                            DataTableChapter[i].order,
                            DataTableChapter[i].title,
                          )
                        }
                      />
                      <MdDelete
                        className="delete-icon"
                        onClick={() =>
                          handleDeleteChap(
                            DataTableChapter[i].id,
                            DataTableChapter[i].comicId,
                          )
                        }
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default FormChapter;
