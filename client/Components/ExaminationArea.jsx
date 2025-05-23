import React, { useState, useEffect } from "react";
import "../src/App.css";

import { Attack, Aura, Combat, Heavy, Honorable, Inciting, Infamous, Light, Modify, Narrative, Reaction, Rings } from "../Maneuver_Properties/PropertyIndex.js";
import { Aiontropier, Elementalist, Euclidinst, FleethandJaeger, FleshShaper, Gloommantle, GeistCalled, Ironhanded, Metapsychiral, NoblesNail, ParagonPopuli, Shieldbearer, WildWhisperer, YieldlessGoliath } from '../Maneuver_Disciplines/DisciplineIndex.js';

export const getActiveProperties = (hexagonStates) => {
  const properties = new Set();
  const maneuvers = Object.values(hexagonStates).filter(m => m !== null);

  if (maneuvers.length > 0) {
    properties.add("Combat");

    maneuvers.forEach(maneuver => {
      if (maneuver.discipline) {
        properties.add(maneuver.discipline);
      }
    });

    const typeHierarchy = ["Attack", "Inciting", "Aura", "Modify", "Reaction"];
    let highestPriorityType = null;

    maneuvers.forEach(maneuver => {
      if (maneuver.maneuver_type) {
        const currentIndex = typeHierarchy.indexOf(maneuver.maneuver_type);
        const highestIndex = highestPriorityType ? typeHierarchy.indexOf(highestPriorityType) : -1;

        if (currentIndex !== -1 && (highestPriorityType === null || currentIndex < highestIndex)) {
          highestPriorityType = maneuver.maneuver_type;
        }
      }
    });

    if (highestPriorityType) {
      properties.add(highestPriorityType);
    }

    const weightCounts = {
      Light: 0,
      Heavy: 0
    };

    maneuvers.forEach(m => {
      if (m.weight === "Light") weightCounts.Light++;
      if (m.weight === "Heavy") weightCounts.Heavy++;
    });

    if (weightCounts.Light <= weightCounts.Heavy) {
      properties.add("Heavy");
    } else {
      properties.add("Light");
    }

    const paradigmCounts = {
      Honorable: 0,
      Infamous: 0
    };

    maneuvers.forEach(m => {
      if (m.paradigm === "Honorable") paradigmCounts.Honorable++;
      if (m.paradigm === "Infamous") paradigmCounts.Infamous++;
    });

    if (paradigmCounts.Honorable >= paradigmCounts.Infamous) {
      properties.add("Honorable");
    } else {
      properties.add("Infamous");
    }
  }

  return properties;
};

const ExaminationArea = ({ setSelectedManeuver, hexagonStates }) => {

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

  // Group 5: Disciplines
  const svgGroup5 = [
    { name: "Elementalist", Component: Elementalist },
    { name: "Metapsychiral", Component: Metapsychiral },
    { name: "Wild Whisperer", Component: WildWhisperer },
    { name: "Geist Caller", Component: GeistCalled },
    { name: "Flesh Shaper", Component: FleshShaper },
    { name: "Gloommantle", Component: Gloommantle },
    { name: "Fleethand Jaeger", Component: FleethandJaeger },
    { name: "Ironhanded", Component: Ironhanded },
    { name: "Shieldbearer", Component: Shieldbearer },
    { name: "Euclidinst", Component: Euclidinst },
    { name: "Paragon Populi", Component: ParagonPopuli },
    { name: "Noble's Nail", Component: NoblesNail },
    { name: "Yieldless Goliath", Component: YieldlessGoliath },
    { name: "Aiontropier", Component: Aiontropier },
  ];

  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [fade1, setFade1] = useState(true);

  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [fade2, setFade2] = useState(true);

  const [currentIndex3, setCurrentIndex3] = useState(0);
  const [fade3, setFade3] = useState(true);

  const [currentIndex4, setCurrentIndex4] = useState(0);
  const [fade4, setFade4] = useState(true);

  const [currentIndex5, setCurrentIndex5] = useState(0);
  const [fade5, setFade5] = useState(true);

  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setFade1(false);
      setTimeout(() => {
        setCurrentIndex1((prevIndex) => (prevIndex + 1) % svgGroup1.length);
        setFade1(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval1);
  }, [svgGroup1.length]);

  useEffect(() => {
    const interval2 = setInterval(() => {
      setFade2(false);
      setTimeout(() => {
        setCurrentIndex2((prevIndex) => (prevIndex + 1) % svgGroup2.length);
        setFade2(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval2);
  }, [svgGroup2.length]);

  useEffect(() => {
    const interval3 = setInterval(() => {
      setFade3(false);
      setTimeout(() => {
        setCurrentIndex3((prevIndex) => (prevIndex + 1) % svgGroup3.length);
        setFade3(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval3);
  }, [svgGroup3.length]);

  useEffect(() => {
    const interval4 = setInterval(() => {
      setFade4(false);
      setTimeout(() => {
        setCurrentIndex4((prevIndex) => (prevIndex + 1) % svgGroup4.length);
        setFade4(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval4);
  }, [svgGroup4.length]);

  useEffect(() => {
    const interval5 = setInterval(() => {
      setFade5(false);
      setTimeout(() => {
        setCurrentIndex5((prevIndex) => (prevIndex + 1) % svgGroup5.length);
        setFade5(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval5);
  }, [svgGroup5.length]);

  const { Component: SelectedSVG0 } = svgGroup0[0];
  const { Component: SelectedSVG5 } = svgGroup5[currentIndex5];

  const hasManeuvers = Object.values(hexagonStates).some(state => state !== null);
  const activeProperties = hasManeuvers ? getActiveProperties(hexagonStates) : null;

  const renderSVG = (group, currentIndex, fade) => {
    if (!hasManeuvers) {
      const { Component } = group[currentIndex];
      return Component && (
        <div style={{
          opacity: fade ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}>
          <Component />
        </div>
      );
    } else {
      return group.map(({ name, Component }) => {
        if (activeProperties.has(name)) {
          return (
            <div key={name} style={{ opacity: 1 }}>
              <Component />
            </div>
          );
        }
        return null;
      });
    }
  };

  return (
    <div
      className="container"
      style={{
        ...(isDragging ? {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transition: 'background-color 0.2s ease',
        } : {})
      }}
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("application/x-maneuver") ||
            e.dataTransfer.types.includes("application/x-card")) {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragging(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const maneuverData = e.dataTransfer.getData("application/x-maneuver") ||
                           e.dataTransfer.getData("application/x-card");

        if (maneuverData) {
          const maneuver = JSON.parse(maneuverData);
          setSelectedManeuver(maneuver);
        }
      }}
    >
      <div>
        {SelectedSVG0 && <SelectedSVG0 />}
      </div>

      {renderSVG(svgGroup1, currentIndex1, fade1)}
      {renderSVG(svgGroup2, currentIndex2, fade2)}
      {renderSVG(svgGroup3, currentIndex3, fade3)}
      {renderSVG(svgGroup4, currentIndex4, fade4)}

      {/* Group 5: Disciplines */}
      <div style={{ width: "100%", height: "100%" }}>
        {hasManeuvers ? (
          svgGroup5.map(({ name, Component }) => {
            if (activeProperties?.has(name)) {
              return <Component key={name} className="iris-once" />;
            }
            return null;
          })
        ) : (
          SelectedSVG5 && <SelectedSVG5 className="iris" />
        )}
      </div>
    </div>
  );
};

export default ExaminationArea;