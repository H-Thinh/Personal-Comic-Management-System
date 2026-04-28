import { Card, Col, Pagination } from "antd";
import Meta from "antd/es/card/Meta";
import { Row } from "antd/lib";
import React, { useEffect, useState } from "react";
import { getComicList } from "../../../api/comicApi";

interface CartComicForChapterProps {
  handleGetChapterComic: (id: number) => void;
  setIdComic: React.Dispatch<React.SetStateAction<number>>;
}

const CartComicForChapter: React.FC<CartComicForChapterProps> = ({
  handleGetChapterComic,
  setIdComic,
}) => {
  const [dataComics, setDataComics] = useState<
    {
      id: number;
      title: string;
      author: { id: number; name: string };
      coverImage: string;
    }[]
  >([]);

  const [page, setPage] = useState<number>(1);

  const [totalPage, setTotalPage] = useState(0);

  const limitDataComics = 8;

  useEffect(() => {
    const getDataComic = async () => {
      try {
        const resComics = await getComicList(page, limitDataComics);

        setDataComics(resComics.data);
        setTotalPage(resComics.total);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    getDataComic();
  }, [page]);

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[16, 16]} justify="center">
        {dataComics.map((comic) => (
          <Col
            key={comic.id}
            xs={24}
            sm={12}
            md={8}
            lg={6}
            style={{ padding: 10 }}
          >
            <Card
              onClick={() => {
                handleGetChapterComic(comic.id);
                setIdComic(comic.id);
              }}
              hoverable
              style={{
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              cover={
                <img
                  alt={comic.title}
                  src={comic.coverImage}
                  style={{
                    margin: "auto",
                    width: 230,
                    height: 350,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
              }
            >
              <Meta title={comic.title} description={comic.author.name} />
            </Card>
          </Col>
        ))}
      </Row>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Pagination
          align="center"
          defaultCurrent={1}
          pageSize={limitDataComics}
          total={totalPage}
          onChange={(e) => setPage(e)}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default CartComicForChapter;
