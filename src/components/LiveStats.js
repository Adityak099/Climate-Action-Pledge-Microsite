import React, { useState, useEffect } from "react";
import { Users, Briefcase, Award, Target } from "lucide-react";

const LiveStats = ({ data }) => {
  const TARGET_PLEDGES = 1000000;

  const total = data.length;
  const students = data.filter((item) => item.profile === "Student").length;
  const professionals = data.filter(
    (item) => item.profile === "Working Professional"
  ).length;
  const others = data.filter((item) => item.profile === "Other").length;

  const [counts, setCounts] = useState({
    total: 0,
    students: 0,
    professionals: 0,
    others: 0,
  });

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = total / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      setCounts({
        total: Math.min(Math.floor(start), total),
        students,
        professionals,
        others,
      });
      if (start >= total) clearInterval(counter);
    }, 20);
  }, [total, students, professionals, others]);

  return (
    <section
      data-aos="fade-up"
      className="bg-gradient-to-tl from-green-100 to-green-600 py-12 px-4"
    >
      {/* KPI Cards */}
      <div className="max-w-6xl mx-auto  relative z-20 mb-12 mt-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center ">
            <Target className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <div className="text-2xl font-bold text-green-600 mb-1">
              {TARGET_PLEDGES}
            </div>
            <div className="text-gray-600 text-sm">Target Pledges</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Award className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {counts.total}
            </div>
            <div className="text-gray-600 text-sm">Achieved Pledges</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Users className="w-8 h-8 mx-auto text-purple-600 mb-2" />
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {counts.students}
            </div>
            <div className="text-gray-600 text-sm">Students</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <Briefcase className="w-8 h-8 mx-auto text-orange-600 mb-2" />
            <div className="text-2xl font-bold text-orange-600 mb-1">
              {counts.professionals}
            </div>
            <div className="text-gray-600 text-sm">Professionals</div>
          </div>
        </div>
      </div>

      {/* Why Take Climate Action */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-white ">
          Why Take Action To Save Climate?
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">
            Climate change is the defining challenge of our time, but it's not
            too late to act. While governments and corporations must lead,
            individual actions create powerful ripples of change. When you make
            a pledge, you're not just changing your habits—you're inspiring your
            family, friends, and community to do the same.
          </p>
          <p className="text-lg text-gray-700">
            <strong className="text-green-600 text-xl font-serif">Join</strong>{" "}
            thousands of students, professionals, and changemakers who are
            proving that collective action starts with personal commitment.
            Together, we're building a movement that shows the world: we are{" "}
            <strong className="text-green-600 underline decoration-3">
              cool enough to care
            </strong>{" "}
            about our planet's future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
