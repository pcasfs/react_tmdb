import { useEffect, useState } from "react";
import "../components/MovieList.css";
import Modal from "./Modal";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.results);
        setMovies(data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="wrapper-card">
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="card"
              onClick={() => setDetail(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
              <p>⭐평점: {movie.vote_average}</p>
            </div>
          );
        })}
      </div>
      {/* onClose props로 함수(콜백)를 전달 */}
      <Modal detail={detail} onClose={() => setDetail(null)}></Modal>
    </>
  );
}
