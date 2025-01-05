import React from "react";
import { Link } from "react-router-dom";

const WorkItem = ({
  imgUrl,
  containerHeight,
  workName,
  workDate,
  type,
  url,
}) => {
  return (
    <div className={`work-item type-${type}`}>
      <div className={`work-item-img work-${containerHeight}`}>
        <div className={`work-item-img-wrapper`}>
          <img src={imgUrl} alt="" />
        </div>

        <div className="work-item-info">
          <p id="work-name">{workName}</p>
          <p id="work-date">{workDate}</p>
        </div>
      </div>
      <div className="work-item-cta">
        <Link to={url}>
          {type === "blog" ? (
            <button>Read Post</button>
          ) : type === "article" ? (
            <button>View Article</button>
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default WorkItem;
