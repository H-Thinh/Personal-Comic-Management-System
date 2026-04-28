import { Link } from "react-router-dom";

import img from "../../../assets/imgs/sat-nhan-cuong-loan-1725616795.jpg";

import ListComic from "../../common/listComic/ListComic";

import { useEffect, useState } from "react";

import { useToast } from "../../../context/ToastContext";
import { RootState } from "../../../redux/authStore";
import { useSelector } from "react-redux";
import { getComicFollowedByIdUser } from "../../../api/followApi";
import { ComicType } from "../../../types/ComicType";

function Follow() {
  const [dataFollowed, setDataFollowed] = useState<ComicType[]>([]);

  const user = useSelector((state: RootState) => state.auth.user);
  const { showToast } = useToast();

  useEffect(() => {
    const getListFollowed = async () => {
      if (!user?.id) return;
      try {
        const resFollowed = await getComicFollowedByIdUser(user.id);
        setDataFollowed(resFollowed.data);
      } catch (error) {}
    };
    getListFollowed();
  }, []);

  return (
    <div className="container">
      {/* <div className="list-item">
        <h2>Truyện theo dõi</h2>
        <ul className="comic-more flex">
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>{" "}
          <li>
            <Link to={"/detail"}>
              <img src={img} alt="" />
              <p className="name-comic">Bí mật của cô vợ Gyaru</p>
              <p className="chap-comic">Chương 10</p>
            </Link>
          </li>
        </ul>
      </div> */}
      <ListComic
        title="Truyện đã theo dõi"
        dataComic={dataFollowed}
        isShowMore={false}
      />
    </div>
  );
}

export default Follow;
