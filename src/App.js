import Hero from "./components/Hero";
import LiveStats from "./components/LiveStats";
import StepperForm from "./components/PledgeForm";
import { useEffect, useState } from "react";
import PledgeWall from "./components/PledgeWall";
import PrivacyNote from "./components/PrivacyNote";
import AOS from "aos";

function App() {
  const [pledgeData, setPledgeData] = useState([]);

  const fetchPledgeData = () => {
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
  };

  useEffect(() => {
    fetchPledgeData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Function to add a new pledge optimistically and refresh data
  const handleNewPledge = (newPledgeData) => {
    // Add the new pledge optimistically to the UI
    const optimisticPledge = {
      id: `PLEDGE-${Date.now()}`, // Temporary ID
      name: newPledgeData.name,
      date: new Date().toISOString().split("T")[0],
      state: newPledgeData.state || "Not specified",
      profile: newPledgeData.profile,
      stars: newPledgeData.stars,
    };

    setPledgeData((prevData) => [...prevData, optimisticPledge]);

    // Fetch the latest data from the server after a short delay
    setTimeout(() => {
      fetchPledgeData();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <Hero />
      <LiveStats data={pledgeData} />
      <StepperForm onPledgeSubmitted={handleNewPledge} />
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
