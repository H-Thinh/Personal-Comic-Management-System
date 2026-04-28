import { useEffect, useState } from "react";
import ListComic from "../../common/listComic/ListComic";
import { ComicType } from "../../../types/ComicType";
import { getHistoryByUserId } from "../../../api/historyApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/authStore";

function History() {
  const [dataComicReaded, setDataComicReaded] = useState<ComicType[]>([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleGetComicReaded = async () => {
    if (!user?.id) return;

    try {
      const resComicReaded = await getHistoryByUserId(user.id);
      setDataComicReaded(resComicReaded);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetComicReaded();
  }, []);

  return (
    <div className="container">
      <ListComic
        title="Truyện đã đọc"
        dataComic={dataComicReaded}
        isShowMore={false}
      />
    </div>
  );
}

export default History;
