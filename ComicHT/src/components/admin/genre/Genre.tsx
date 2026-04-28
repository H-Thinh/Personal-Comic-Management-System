import React, { useEffect, useState } from "react";
import "./Genre.css";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  createGenre,
  deleteGenre,
  getGenreList,
  updateGenre,
} from "../../../api/genresApi";
import { useToast } from "../../../context/ToastContext";
import { InterfaceDefault } from "../../../types/InterfaceDefault";

function Genre() {
  const { showToast } = useToast();

  const [dataGenre, setDataGenre] = useState<InterfaceDefault[]>([]);

  const [inputs, setInputs] = useState({
    name: "",
  });

  const [checkUpdate, setCheckUpdate] = useState(true);
  const [currentGenre, setCurrentGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchDataGenre = async () => {
      try {
        const resGenres = await getGenreList();
        setDataGenre(resGenres.Genre);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataGenre();
  }, []);

  const handleSubmitGenre = async () => {
    let check = true;
    const errorSubmit: { name: string } = { name: "" };

    if (inputs.name === "") {
      errorSubmit.name = "Vui long nhap name";
      check = false;
    }

    if (check) {
      const data = { name: inputs.name };
      if (checkUpdate) {
        try {
          const resGenre = await createGenre(data);
          const newGenre = [resGenre.genre, ...dataGenre];

          showToast(resGenre.message, resGenre.type);
          setDataGenre(newGenre);
          setInputs({ name: "" });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          if (currentGenre !== null) {
            const resUpdateGenre = await updateGenre(currentGenre, data);
            setInputs({ name: "" });
            setCheckUpdate(true);
            setDataGenre((prev) =>
              prev.map((item) =>
                item.id === currentGenre ? { ...resUpdateGenre } : item
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  function handleInputs(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function hanldeUpdateGenre(name: string, id: number) {
    setCheckUpdate(false);
    setInputs({ name: name });
    setCurrentGenre(id);
  }

  const hanldeDeleteGenre = async (id: number) => {
    try {
      const resGenre = await deleteGenre(id);
      showToast(resGenre.message, "success");
      setDataGenre((prev) => prev.filter((genre) => genre.id !== id));
    } catch (error) {
      showToast("lỗi dữ liệu không xóa được", "error");
      console.log(error);
    }
  };
  return (
    <>
      <section className="category-management">
        <h2 className="section-title">Quản lý thể loại</h2>

        <div className="add-category-form">
          <input
            name="name"
            value={inputs.name}
            type="text"
            placeholder="Tên thể loại"
            className="input-category"
            onChange={handleInputs}
          />
          {checkUpdate ? (
            <button className="btn-add-category" onClick={handleSubmitGenre}>
              Thêm thể loại
            </button>
          ) : (
            <button className="btn-update-category" onClick={handleSubmitGenre}>
              Cập nhật thể loại
            </button>
          )}
        </div>

        <table className="category-table w-1/2">
          <thead>
            <tr>
              <th>Tên Thể loại</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(dataGenre).map((key, i) => {
              return (
                <tr key={key}>
                  <td>{dataGenre[i].name}</td>
                  <td>
                    <div className="icons">
                      <FaPen
                        className="edit-icon"
                        title="edit"
                        onClick={() => {
                          hanldeUpdateGenre(dataGenre[i].name, dataGenre[i].id);
                        }}
                      />
                      <MdDelete
                        className="delete-icon"
                        title="delete"
                        onClick={() => {
                          hanldeDeleteGenre(dataGenre[i].id);
                        }}
                      />
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

export default Genre;
