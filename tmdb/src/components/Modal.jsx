import { useEffect } from "react";
import "../components/Modal.css";

export default function Modal({ detail, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.keyCode === 27) {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!detail) return null;

  return (
    <div className="Modal-background" onClick={onClose}>
      <div className="card-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <img
          src={`https://image.tmdb.org/t/p/w200${detail.poster_path}`}
          alt={detail.title}
        />
        <div className="detail-info">
          <h2>{detail.title}</h2>
          <ul>
            <li>개봉일: {detail.release_date}</li>
            <li>⭐평점: {detail.vote_average}</li>
            <li>
              줄거리: {detail.overview ? detail.overview : "줄거리 정보 없음"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
