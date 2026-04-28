import { useEffect, useState } from "react";
import ListComic from "../../common/listComic/ListComic";
import { getComicList } from "../../../api/comicApi";
import { ComicType } from "../../../types/ComicType";
import { useSearchParams } from "react-router-dom";
import { Pagination } from "antd";

function Comic() {
  const [dataComicNew, setDataComicNew] = useState<ComicType[]>([]);

  const [searchParams] = useSearchParams();

  const [pageComicNew, setPageComicNew] = useState<number>(
    Number(searchParams.get("pageNew"))
  );
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const resComicNew = await getComicList(1, 30, "time_desc");
        setDataComicNew(resComicNew.data);
        setTotalPage(resComicNew.total);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="container">
      <ListComic
        dataComic={dataComicNew}
        isShowMore={false}
        title="Truyện mới"
      />
      <Pagination
        align="center"
        current={pageComicNew}
        pageSize={30}
        total={totalPage}
        style={{ marginTop: 10 }}
        onChange={(p) => setPageComicNew(p)}
        simple
      />
    </div>
  );
}

export default Comic;
