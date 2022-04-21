import React, { useEffect, useState } from "react";

import { db } from "../Services/Firebase";

import PaginationPart from "./PaginationPart";
import Article from "./Article";
import "./news.css";

const News = () => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);

  // const nextPage = () => {
  //     setPage(page+10)
  // }
  // const previousPage = () => {
  //     setPage(page-10)
  // }

  const fetchBlogs = async () => {
    const response = await db
      .collection("News")
      .orderBy("caption", "asc")
      .get();

    const arr = response.docs.map((el) => {
      const newEl = el.data();
      newEl.id = el.id;
      return newEl;
    });
    setData(arr);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const renderNews = ({ caption, text, date, id }) => {
    return <Article caption={caption} text={text} id={id} date={date} />;
  };

  return (
    <>
      <div></div>
      <div style={{ position: "absolute", top: "0" }}>
        {data &&
          data.slice((page - 1) * 10, (page - 1) * 10 + 10).map(renderNews)}
        {data && (
          <PaginationPart
            setPage={setPage}
            pagesCount={Math.ceil(data.length / 10)}
          />
        )}
      </div>
    </>
  );
};

export default News;
