import "./style.scss";
import { useSelector } from "react-redux";

function Genres({ data }) {
  const { genres } = useSelector((state) => state.home);
  return (
    <div className="genres">
      {data?.map((id: number) => {
        if (!genres[id]?.name) return;
        return (
          <div className="genre" key={id}>
            {genres[id]?.name}
          </div>
        );
      })}
    </div>
  );
}

export default Genres;
