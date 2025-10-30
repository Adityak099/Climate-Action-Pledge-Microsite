import React, { useState } from "react";
import { Heart } from "lucide-react";

const PledgeWall = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProfile, setFilterProfile] = useState("");

  const filteredData = data.filter((row) => {
    const matchesSearch =
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.state.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProfile =
      filterProfile === "" || row.profile === filterProfile;

    return matchesSearch && matchesProfile;
  });

  return (
    <section id="pledge-wall" data-aos="fade-up" className="py-14 bg-white">
      <h2 className="text-center text-4xl font-bold text-gray-800 mb-8">
        Pledge Wall of Champions🏆
      </h2>

      {/* Search + Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 px-6">
        <input
          type="text"
          placeholder="Search by Name or State..."
          className="border rounded-lg p-3 w-full sm:w-72 focus:ring-2 focus:ring-green-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded-lg p-3 w-full sm:w-60 focus:ring-2 focus:ring-green-500 outline-none"
          value={filterProfile}
          onChange={(e) => setFilterProfile(e.target.value)}
        >
          <option value="">All Profiles</option>
          <option value="Student">Student</option>
          <option value="Working Professional">Working Professional</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-w-6xl mx-auto shadow-xl rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-[#8fbf50] text-white">
            <tr>
              <th className="px-6 py-4 text-left">Pledge ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Date</th>
              <th className="px-6 py-4 text-left">State</th>
              <th className="px-6 py-4 text-left">Profile</th>
              <th className="px-6 py-4 text-center">Love for Planet</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length > 0 ? (
              filteredData.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <td className="px-6 py-4 font-mono text-sm">{row.id}</td>
                  <td className="px-6 py-4 font-semibold">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600">{row.date}</td>
                  <td className="px-6 py-4 text-gray-600">{row.state}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold">
                      {row.profile}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
                      {[...Array(row.stars)].map((_, idx) => (
                        <Heart
                          key={idx}
                          className="w-5 h-5 fill-red-500 text-red-500"
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No pledges found! 🌱 Be the first to take action!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PledgeWall;
