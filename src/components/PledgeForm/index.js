import React, { useState } from "react";
import { Sun, Recycle, Droplet } from "lucide-react";
import Certificate from "./Certificate";

const StepperForm = ({ onPledgeSubmitted }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    state: "",
    profileType: "",
    commitments: [],
  });

  const [errors, setErrors] = useState({});
  const [showCertificate, setShowCertificate] = useState(false);

  const commitmentThemes = {
    "Energy & Transport": [
      "Use public transport or carpool twice a week",
      "Switch to LED bulbs at home",
      "Reduce air conditioning usage",
    ],
    "Waste & Consumption": [
      "Say no to single-use plastics",
      "Compost food waste",
      "Buy local and seasonal produce",
    ],
    "Water & Nature": [
      "Save water - fix leaks and use wisely",
      "Plant and care for trees",
      "Support eco-friendly brands",
    ],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCommitmentChange = (commitment) => {
    setFormData((prev) => {
      const commitments = prev.commitments.includes(commitment)
        ? prev.commitments.filter((c) => c !== commitment)
        : [...prev.commitments, commitment];
      return { ...prev, commitments };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes("@"))
      newErrors.email = "Valid email is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile must be 10 digits";
    if (!formData.profileType)
      newErrors.profileType = "Profile type is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const calculateHearts = (commitmentCount) => {
      if (commitmentCount <= 3) return 3;
      if (commitmentCount <= 6) return 4;
      return 5;
    };

    const stars = calculateHearts(formData.commitments.length);

    const payload = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      state: formData.state || "Not specified",
      profile: formData.profileType,
      stars: stars,
      date: new Date().toISOString().split("T")[0],
    };

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwbZt_OOjqzvaAmmzROOOuii8O12DL66bTAOnQhAKM89ar-J7MFvgSoig3iuzR3aFc/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      // Notify parent component about the new pledge
      if (onPledgeSubmitted) {
        onPledgeSubmitted(payload);
      }

      setShowCertificate(true);
    } catch (error) {
      console.error("Error submitting:", error);
      alert("Something went wrong!");
    }
  };

  if (showCertificate) {
    return <Certificate formData={formData} />;
  }

  return (
    <section
      id="pledge-form"
      data-aos="fade-up"
      className="py-16 px-4 bg-gradient-to-tr from-green-100 to-green-600"
    >
      <div className="max-w-4xl mx-auto ">
        <div className="bg-white border-green-600 border-2 rounded-lg  shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Make Your Climate Pledge
          </h2>

          <div>
            {/* Personal Information */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="your.email@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  🔒 Never shown publicly
                </p>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  maxLength={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="10-digit mobile number"
                />
                <p className="text-xs text-gray-500 mt-1">
                  🔒 Used only for verification
                </p>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your state"
                />
              </div>
            </div>

            {/* Profile Type */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-2">
                Profile Type *
              </label>
              <div className="flex flex-wrap gap-4">
                {["Student", "Working Professional", "Other"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="profileType"
                      value={type}
                      checked={formData.profileType === type}
                      onChange={handleInputChange}
                      className="mr-2 w-4 h-4 accent-green-600"
                    />
                    <span className="text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
              {errors.profileType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.profileType}
                </p>
              )}
            </div>

            {/* Commitments */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Select Your Climate Commitments
              </h3>

              {Object.entries(commitmentThemes).map(([theme, commitments]) => (
                <div key={theme} className="mb-6">
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    {theme === "Energy & Transport" && (
                      <Sun className="w-5 h-5 mr-2" />
                    )}
                    {theme === "Waste & Consumption" && (
                      <Recycle className="w-5 h-5 mr-2" />
                    )}
                    {theme === "Water & Nature" && (
                      <Droplet className="w-5 h-5 mr-2" />
                    )}
                    {theme}
                  </h4>
                  <div className="space-y-2 pl-7">
                    {commitments.map((commitment) => (
                      <label
                        key={commitment}
                        className="flex items-start cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.commitments.includes(commitment)}
                          onChange={() => handleCommitmentChange(commitment)}
                          className="mt-1 mr-3 w-4 h-4 accent-green-600"
                        />
                        <span className="text-gray-700">{commitment}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Privacy Note */}
            <div className="bg-blue-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-black">
                🔒 <strong>Privacy Note:</strong> Your mobile number and email
                are required for validation but will never be shown publicly.
                Your data is used only for verification and engagement purposes.
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-400 via-green-600 to-green-400 text-white py-4 rounded-lg text-lg font-semibold hover:from-green-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Submit My Pledge 🌟
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepperForm;
