import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Loading.json"

export default function Loading() {
  return (
    <div className="md:max-w-7xl mx-auto h-svh flex justify-center">
        <Lottie animationData={loadingAnimation} loop={true} />;
    </div>
  )
}
