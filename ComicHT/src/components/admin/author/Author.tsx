import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useToast } from "../../../context/ToastContext";

function Author() {
  const [inputs, setInputs] = useState<{ author: string }>({ author: "" });

  const [dataAuthors, setDataAuthors] = useState<
    { id: number; name: string }[]
  >([]);

  const { showToast } = useToast();

  const [isEdit, setIsEdit] = useState(false);

  const [idAuthor, setIdAuthor] = useState<number>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/author/list")
      .then((res) => {
        setDataAuthors(res.data);
      })
      .catch(() => {});
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmitAuthor() {
    let check = true;

    if (inputs.author === "") {
      showToast("Vui lòng nhập tên tac giả", "error");
      check = false;
    }

    if (check) {
      const data = {
        name: inputs.author,
      };
      if (!isEdit) {
        axios
          .post("http://localhost:3001/api/author/add", data)
          .then((res) => {
            setDataAuthors((prev) => [...prev, res.data]);
            setInputs({ author: "" });
            showToast("Thêm tác giả thành công", "success");
          })
          .catch(() => {
            showToast("Thêm tác giả không thành công", "error");
          });
      } else {
        axios
          .put("http://localhost:3001/api/author/update/" + idAuthor, data)
          .then((res) => {
            setDataAuthors((prev) => {
              const filtered = prev.filter((author) => author.id !== idAuthor);
              return [res.data, ...filtered];
            });
            resetInputs();
            showToast("Cập nhật thành công tác giả", "success");
          })
          .catch((error) => {
            showToast("Cập nhật tác giả thất bại", "error");
          });
      }
    }
  }

  function handleUpdateAuthor(nameAuthor: string, idAuthor: number) {
    setIdAuthor(idAuthor);
    setIsEdit(true);
    setInputs({ author: nameAuthor });
  }

  function resetInputs() {
    setIsEdit(false);
    setInputs({ author: "" });
  }

  return (
    <>
      <section className="category-management">
        <h2 className="section-title">Quản lý tác giả</h2>

        <div className="add-category-form">
          <input
            name="author"
            type="text"
            placeholder="Tên tác giả"
            className="input-category"
            onChange={handleInput}
            value={inputs.author}
          />

          {isEdit ? (
            <>
              <button className="btn-add-category" onClick={handleSubmitAuthor}>
                Cập nhật tác giả
              </button>
              <button
                className="btn-cancel w-[150px] mt-[10px] ml-[10px] bg-[#ccc] rounded-[10px] p-[5px]"
                onClick={resetInputs}
              >
                Hủy cập nhật
              </button>
            </>
          ) : (
            <button className="btn-add-category" onClick={handleSubmitAuthor}>
              Thêm tác giả
            </button>
          )}
        </div>

        <table className="category-table w-1/2">
          <thead>
            <tr>
              <th>Tên tác giả</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAuthors.map((key, i) => {
              return (
                <tr>
                  <td>{dataAuthors[i].name}</td>
                  <td>
                    <div className="flex text-xl">
                      <FaEdit
                        onClick={() =>
                          handleUpdateAuthor(
                            dataAuthors[i].name,
                            dataAuthors[i].id
                          )
                        }
                      />
                      <MdDelete />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}

export default Author;
