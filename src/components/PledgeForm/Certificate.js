import html2canvas from "html2canvas";
import React, { useEffect } from "react";
import { Heart, Award } from "lucide-react";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const Certificate = ({ formData }) => {
  const calculateHearts = (commitmentCount) => {
    if (commitmentCount <= 3) return 3;
    if (commitmentCount <= 6) return 4;
    return 5;
  };

  const hearts = calculateHearts(formData.commitments.length);

  const downloadCertificate = () => {
    const certificate = document.getElementById("certificate");
    html2canvas(certificate).then((canvas) => {
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `${formData.name}_Climate_Pledge.png`;
      link.click();
    });
  };

  useEffect(() => {
    import("canvas-confetti").then((confetti) => {
      confetti.default({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6", "#ef4444"],
      });
    });
  }, []);

  const viewPledgeWall = () => {
    // Store flag in sessionStorage to scroll after reload
    sessionStorage.setItem("scrollToPledgeWall", "true");
    window.location.reload();
  };

  const shareMessage = `I just took a Climate Action Pledge 🌍❤️ Cool Enough to Care! #ClimateAction`;
  const siteURL = window.location.href;

  return (
    <div className="flex flex-col justify-center items-center py-16 px-6 bg-gradient-to-b from-green-50 to-blue-50">
      <div
        id="certificate"
        className="bg-white border-8 border-double border-green-600 rounded-2xl shadow-2xl p-10 text-center max-w-2xl w-full"
      >
        <Award className="w-16 h-16 mx-auto text-yellow-500 mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Certificate of Commitment
        </h2>

        <p className="text-xl mb-4 text-gray-700">This certifies that</p>

        <h1 className="text-4xl font-bold text-green-600 mb-6">
          {formData.name}
        </h1>

        <p className="text-2xl font-semibold text-gray-700 mb-6">
          is Cool Enough to Care!
        </p>

        <div className="flex justify-center mb-6">
          {[...Array(hearts)].map((_, i) => (
            <Heart key={i} className="w-8 h-8 fill-red-500 text-red-500 mx-1" />
          ))}
        </div>

        <p className="text-gray-600 mb-4">
          Committed to {formData.commitments.length} climate-positive actions
        </p>

        <p className="text-sm text-gray-500">
          Issued on{" "}
          {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-4 w-full max-w-md">
        <button
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
          onClick={downloadCertificate}
        >
          📥 Download Certificate
        </button>

        <button
          className="w-full border-2 border-green-600 text-green-700 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition"
          onClick={viewPledgeWall}
        >
          View Pledge Wall 🏆
        </button>

        <div className="flex justify-center gap-4 mt-2">
          <WhatsappShareButton url={siteURL} title={shareMessage}>
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>

          <TwitterShareButton url={siteURL} title={shareMessage}>
            <TwitterIcon size={48} round />
          </TwitterShareButton>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
