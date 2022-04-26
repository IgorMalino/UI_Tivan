import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { Link, useLocation } from "react-router-dom";

import BigSize from "../../assets/img/bigSize.png";
import BigSizeClose from "../../assets/img/bigSizeClose.png";
import BigSizeLoading from "../../assets/img/bigSizeLoading.png";
import SmallSize from "../../assets/img/smallSize.png";
import SmallSizeClose from "../../assets/img/smallSizeClose.png";
import SmallSizeLoading from "../../assets/img/smallSizeLoading.png";

import News from "../../News/News";
import Presale from "../../Presale/Presale";
import { db } from "../../Services/Firebase";
import useWindowDimensions from "../../utils/windowDimensions";

import WalletList from "../WalletList/WalletList";

import "animate.css";
import "./styles.css";

const ContentWindow = () => {
  const fetchBlogs = async (current) => {
    const response = await db.collection("documentContent").doc(current).get();
    setData(response.data());
  };

  const [selected, setSelected] = useState("");
  const [data, setData] = useState();
  const { width } = useWindowDimensions();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split(`/${i18n.language}/`)[1];
    setSelected(path);
    fetchBlogs(path[0].toUpperCase() + path.slice(1));
  }, []);

  const renderContentWindowContent = (selected) => {
    switch (selected) {
      case "connectWallet":
        return <WalletList />;
      case "news":
        return <News />;
      case "presale":
        return <Presale />;
      default:
        return null;
    }
  };

  return (
    <div className="mainContent">
      {width > 800 ? (
        <>
          <img className="bigSizeImg" src={BigSize} />
          <Link to={`/${i18n.language}`}>
            <img className="bigSizeImgClose" src={BigSizeClose} />
          </Link>
          <img className="bigSizeImgLoading" src={BigSizeLoading} />
        </>
      ) : (
        <>
          <img className="smallSizeImg" src={SmallSize} />
          <Link to={`/${i18n.language}`}>
            <img className="smallSizeImgClose" src={SmallSizeClose} />
          </Link>
          <img className="smallSizeImgLoading" src={SmallSizeLoading} />
        </>
      )}

      <div style={{ width: width < 800 && "70%" }} className="content">
        {selected && renderContentWindowContent(selected)}
        {data && (
          <div
            className={`${
              selected === "about" && "contentWindow_content"
            } animate__animated animate__fadeInUp`}
            dangerouslySetInnerHTML={{ __html: data[i18n.language] }}
          />
        )}
      </div>
    </div>
  );
};

export default ContentWindow;
