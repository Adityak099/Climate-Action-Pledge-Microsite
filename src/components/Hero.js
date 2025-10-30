import React from "react";
// import { Globe, Leaf } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    const formSection = document.getElementById("pledge-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100vh] bg-gradient-to-r  flex flex-col     justify-center items-center text-white px-5 text-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/herobg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/45"></div>

      <h1
        data-aos="fade-down"
        className="font-extrabold text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg relative z-10"
      >
        Join the Climate Action Movement
      </h1>

      <p
        data-aos="fade-up"
        className="mt-4 max-w-2xl text-xl md:text-2xl font-medium opacity-90 text-green-100 relative z-10"
      >
        Every action counts. Take your pledge today and inspire thousands.
      </p>
      {/* Hero Content */}
      <div className="relative mt-6 z-10 inline-block">
        {/* Animated Border */}
        <div className="absolute -inset-1 rounded-full overflow-hidden">
          <div
            className="w-full h-full animate-border-spin"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 75%, #10b981 75%, #3b82f6 100%)",
            }}
          ></div>
        </div>

        {/* Button */}
        <button
          onClick={scrollToForm}
          className="relative bg-white text-green-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-green-50 transition-all transform hover:scale-105"
        >
          Take the Pledge Now 🌍
        </button>
      </div>
    </section>
  );
};

export default Hero;
