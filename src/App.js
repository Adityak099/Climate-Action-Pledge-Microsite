import Hero from "./components/Hero";
import LiveStats from "./components/LiveStats";
import StepperForm from "./components/PledgeForm";
import { useEffect, useState } from "react";
import PledgeWall from "./components/PledgeWall";
import PrivacyNote from "./components/PrivacyNote";

import AOS from "aos";

function App() {
  const [pledgeData, setPledgeData] = useState([]);

  useEffect(() => {
    // Fetch from Google Script
    fetch(
      "https://script.google.com/macros/s/AKfycbwbZt_OOjqzvaAmmzROOOuii8O12DL66bTAOnQhAKM89ar-J7MFvgSoig3iuzR3aFc/exec"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setPledgeData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch pledges:", err);
        setPledgeData([]);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Check if we need to scroll to pledge wall after reload
  useEffect(() => {
    const shouldScrollToPledgeWall =
      sessionStorage.getItem("scrollToPledgeWall");
    if (shouldScrollToPledgeWall === "true") {
      sessionStorage.removeItem("scrollToPledgeWall");
      setTimeout(() => {
        const pledgeWallSection = document.getElementById("pledge-wall");
        if (pledgeWallSection) {
          pledgeWallSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 1000);
    }
  }, [pledgeData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Hero />
      <LiveStats data={pledgeData} />
      <StepperForm />
      <PrivacyNote />
      <PledgeWall data={pledgeData} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="mb-2">🌍 Climate Action Pledge Microsite</p>
          <p className="text-sm text-gray-400">
            Together, we're building a sustainable future. One pledge at a time.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
