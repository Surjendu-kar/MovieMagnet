import React from "react";
import Lottie from "lottie-web";
import animationData from "../../assets/Animation - 1705338913045.json";
import "./style.scss";

class LottieAnimation extends React.Component {
  private animBox: HTMLDivElement | null = null;

  componentDidMount() {
    if (this.animBox) {
      Lottie.loadAnimation({
        container: this.animBox,
        animationData: animationData,
        renderer: "svg",
        loop: true,
        autoplay: true,
      });
    }
  }

  render() {
    return (
      <div ref={(ref) => (this.animBox = ref)} className="lottie-container" />
    );
  }
}

export default LottieAnimation;
