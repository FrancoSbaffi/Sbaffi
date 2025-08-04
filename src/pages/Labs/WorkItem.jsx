import React from "react";
import { Link } from "react-router-dom";
import { useVideoOptimization } from "../../hooks/useVideoOptimization";

const WorkItem = ({
  imgUrl,
  videoUrl,
  containerHeight,
  workName,
  workDate,
  type,
  url,
  playbackRate = 1,
}) => {
  const videoRef = useVideoOptimization(videoUrl);

  // Efecto para controlar la velocidad de reproducción
  React.useEffect(() => {
    if (videoRef.current && playbackRate !== 1) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [videoRef, playbackRate]);

  return (
    <div className={`work-item type-${type}`}>
      <div className={`work-item-img work-${containerHeight}`}>
        <div className={`work-item-img-wrapper`}>
          {videoUrl ? (
            <video 
              ref={videoRef}
              data-src={videoUrl}
              autoPlay 
              loop 
              muted 
              playsInline
              preload="none"
              loading="lazy"
            />
          ) : (
            <img src={imgUrl} alt="" />
          )}
        </div>

        <div className="work-item-info">
          <p id="work-name">{workName}</p>
          <p id="work-date">{workDate}</p>
        </div>
      </div>
      <div className="work-item-cta">
        <Link to={url}>
          {type === "blog" ? (
            <button>Hacking Narratives</button>
          ) : type === "article" ? (
            <button>Read Essay</button>
          ) : null}
        </Link>
      </div>
    </div>
  );
};

export default WorkItem;
