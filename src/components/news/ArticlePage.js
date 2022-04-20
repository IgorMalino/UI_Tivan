import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import i18n from "i18next";

import useWindowDimensions from "../../utils/windowDimensions";
import BigSize from "../../assets/img/bigSize.png";
import BigSizeClose from "../../assets/img/bigSizeClose.png";
import BigSizeLoading from "../../assets/img/bigSizeLoading.png";
import SmallSize from "../../assets/img/smallSize.png";
import SmallSizeClose from "../../assets/img/smallSizeClose.png";
import SmallSizeLoading from "../../assets/img/smallSizeLoading.png";

import { db } from "../../Services/Firebase";

import "./news.css";

export default function ArticlePage() {
  const location = useLocation();

  const { width, height } = useWindowDimensions();
  const id =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const [data, setData] = useState();

  const fetchBlogs = async (current) => {
    const response = await db.collection("News").doc(current).get();
    setData(response.data());
  };

  useEffect(() => {
    fetchBlogs(id);
  }, []);

  const renderSingleArticle = () => {
    return (
      <div className="singleArticle_wrapper">
        <div className="singleArticle_caption">{data.caption}</div>
        <div className="singleArticle_text">{data.text}</div>
      </div>
    );
  };

  return (
    <div className="mainContent">
      {width > 800 ? (
        <>
          <img className="bigSizeImg" src={BigSize} />
          <Link to={`/${i18n.language}/news`}>
            <img className="bigSizeImgClose" src={BigSizeClose} />
          </Link>
          <img className="bigSizeImgLoading" src={BigSizeLoading} />
        </>
      ) : (
        <>
          <img className="smallSizeImg" src={SmallSize} />
          <Link to={`/${i18n.language}/news`}>
            <img className="smallSizeImgClose" src={SmallSizeClose} />
          </Link>
          <img className="smallSizeImgLoading" src={SmallSizeLoading} />
        </>
      )}

      <div className="article_content content">
        {data && renderSingleArticle()}
      </div>
    </div>
  );
}
