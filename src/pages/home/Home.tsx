import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";

function Home() {
  return (
    <div className="homepage">
      <HeroBanner />
      <div style={{ height: "1000px" }}></div>
    </div>
  );
}

export default Home;
