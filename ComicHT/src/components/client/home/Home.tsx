import "./Home.css";

import { useEffect, useState } from "react";

import { getComicList, getComicListByView } from "../../../api/comicApi";

import { ComicType } from "../../../types/ComicType";

import Slides from "./slides/Slides";
import ComicViews from "./ComicViews";
import ListComic from "../../common/listComic/ListComic";

function Home() {
  const [dataComicNewUpdated, setDataComicNewUpdated] = useState<ComicType[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const resComicNew = await getComicList(1, 30, "time_desc");
        setDataComicNewUpdated(resComicNew.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {/* <Slides dataComicRank={dataComicRank} /> */}
      <div className="list-comic">
        <div className="container">
          <ListComic
            dataComic={dataComicNewUpdated}
            isShowMore={true}
            title="Truyện mới cập nhật"
            linkName="home?pageNew=1"
          />
          <ComicViews />
        </div>
      </div>
    </>
  );
}

export default Home;
