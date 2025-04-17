import React, { useState, useEffect } from "react";
import "../src/App.css";

// Import all SVG components
import Rings from "../Maneuver_Properties/Rings";
import Combat from "../Maneuver_Properties/Combat";
import Narrative from "../Maneuver_Properties/Narrative";
import Honorable from "../Maneuver_Properties/Honorable";
import Infamous from "../Maneuver_Properties/Infamous";
import Light from "../Maneuver_Properties/Light";
import Heavy from "../Maneuver_Properties/Heavy";
import Attack from "../Maneuver_Properties/Attack";
import Aura from "../Maneuver_Properties/Aura";
import Inciting from "../Maneuver_Properties/Inciting";
import Modify from "../Maneuver_Properties/Modify";
import Reaction from "../Maneuver_Properties/Reaction";

const ExaminationArea = () => {

  // Group 0: Rings
  const svgGroup0 = [
    { name: "Rings", Component: Rings },
  ];

  // Group 1: Combat & Narrative
  const svgGroup1 = [
    { name: "Combat", Component: Combat },
    { name: "Narrative", Component: Narrative },
  ];

  // Group 2: Honorable & Infamous
  const svgGroup2 = [
    { name: "Honorable", Component: Honorable },
    { name: "Infamous", Component: Infamous },
  ];

  // Group 3: Light & Heavy
  const svgGroup3 = [
    { name: "Light", Component: Light },
    { name: "Heavy", Component: Heavy },
  ];

  // Group 4: Attack & Others
  const svgGroup4 = [
    { name: "Attack", Component: Attack },
    { name: "Aura", Component: Aura },
    { name: "Inciting", Component: Inciting },
    { name: "Modify", Component: Modify },
    { name: "Reaction", Component: Reaction },
  ];

  // State for Group 1
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [fade1, setFade1] = useState(true);

  // State for Group 2
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [fade2, setFade2] = useState(true);

  // State for Group 3
  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [fade3, setFade3] = useState(true);

  // State for Group 4
  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [fade4, setFade4] = useState(true);

  // Cycle through Group 1 SVGs
  useEffect(() => {
    const interval1 = setInterval(() => {
      setFade1(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex1((prevIndex) => (prevIndex + 1) % svgGroup1.length); // Move to the next SVG
        setFade1(true); // Start fade-in
      }, 500); // Match the fade-out duration
    }, 3000); // Change SVG every 3 seconds

    return () => clearInterval(interval1); // Clean up interval on unmount
  }, [svgGroup1.length]);

  // Cycle through Group 2 SVGs
  useEffect(() => {
    const interval2 = setInterval(() => {
      setFade2(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex2((prevIndex) => (prevIndex + 1) % svgGroup2.length); // Move to the next SVG
        setFade2(true); // Start fade-in
      }, 500); // Match the fade-out duration
    }, 5000); // Change SVG every 5 seconds

    return () => clearInterval(interval2); // Clean up interval on unmount
  }, [svgGroup2.length]);

  // Cycle through Group 3 SVGs
  useEffect(() => {
    const interval3 = setInterval(() => {
      setFade3(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex3((prevIndex) => (prevIndex + 1) % svgGroup3.length); // Move to the next SVG
        setFade3(true); // Start fade-in
      }, 500); // Match the fade-out duration
    }, 4000); // Change SVG every 4 seconds

    return () => clearInterval(interval3); // Clean up interval on unmount
  }, [svgGroup3.length]);

  // Cycle through Group 4 SVGs
  useEffect(() => {
    const interval4 = setInterval(() => {
      setFade4(false); // Start fade-out
      setTimeout(() => {
        setCurrentIndex4((prevIndex) => (prevIndex + 1) % svgGroup4.length); // Move to the next SVG
        setFade4(true); // Start fade-in
      }, 500); // Match the fade-out duration
    }, 6000); // Change SVG every 6 seconds

    return () => clearInterval(interval4); // Clean up interval on unmount
  }, [svgGroup4.length]);

  const { Component: SelectedSVG0 } = svgGroup0[0]; // Always show Rings
  const { Component: SelectedSVG1 } = svgGroup1[currentIndex1];
  const { Component: SelectedSVG2 } = svgGroup2[currentIndex2];
  const { Component: SelectedSVG3 } = svgGroup3[currentIndex3];
  const { Component: SelectedSVG4 } = svgGroup4[currentIndex4];

  return (
    <div className="container">
        <div>
           {SelectedSVG0 && <SelectedSVG0 />}
       </div>

      {/* Group 1: Combat & Narrative */}
        <div
          style={{
            opacity: fade1 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out", // Fade effect
          }}
        >
          {SelectedSVG1 && <SelectedSVG1 />}
      </div>

      {/* Group 2: Honorable & Infamous */}
        <div
          style={{
            opacity: fade3 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out", // Fade effect
          }}
        >
          {SelectedSVG3 && <SelectedSVG3 />}
      </div>

      {/* Group 3: Light & Heavy */}
        <div
          style={{
            opacity: fade4 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out", // Fade effect
          }}
        >
          {SelectedSVG4 && <SelectedSVG4 />}
        </div>

      {/* Group 4: Attack & Others */}
        <div
          style={{
            opacity: fade2 ? 1 : 0,
            transition: "opacity 0.5s ease-in-out", // Fade effect
          }}
        >
          {SelectedSVG2 && <SelectedSVG2 />}
      </div>
    </div>
  );
};

export default ExaminationArea;