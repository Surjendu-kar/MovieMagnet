import React, { useRef, useEffect } from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1705338913045.json";
import "./style.scss";

const LottieAnimation = () => {
  const animBox = useRef(null);

  useEffect(() => {
    if (animBox.current) {
      Lottie.loadAnimation({
        container: animBox.current,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return <div ref={animBox} className="lottie-container" />;
};

export default LottieAnimation;
