import React from 'react'
import "../src/App.css";
import { Attack, Aura, Combat, Heavy, Honorable, Inciting, Infamous, Light, Modify, Narrative, Reaction, Rings } from "../Maneuver_Properties/PropertyIndex.js";
import { Aiontropier, Elementalist, Euclidinst, FleethandJaeger, FleshShaper, Gloommantle, GeistCaller, Ironhanded, Metapsychiral, NoblesNail, ParagonPopuli, Shieldbearer, WildWhisperer, YieldlessGoliath } from '../Maneuver_Disciplines/DisciplineIndex.js';

function Card({ card, index, setActiveCard }) {
  const cardStyle = {
    minWidth: "90px",  // Reduced from 100px
    maxWidth: "90px",  // Reduced from 100px
    height: "140px",   // Fixed height for consistent card size
    backgroundColor: "#1a1a1a", // Match dark theme
    overflow: "hidden",
    border: "1px solid #333",   // Thinner border with theme color
    borderRadius: "8px",        // Rounded corners
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "grab",
    padding: "4px",             // Reduced padding
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
        transform: "translateY(-2px)",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
};

  const maneuverNameStyle = {
      fontSize: "16px",
      fontWeight: "bold",         // Make text more readable
      marginBottom: "2px",        // Reduced margin
      textAlign: "center",
      color: "white",             // Match theme
      padding: "2px 4px",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",   // Handle long names gracefully
  };

  const svgContainerStyle = {
      width: "100%",              // Fill available space
      height: "calc(100% - 20px)", // Account for name height
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "black",
      borderRadius: "4px",        // Slightly rounded corners
      position: "relative",       // For stacking SVGs
  };

    const renderCombatNarrativeSVG = () => {
        if (card.maneuver_type === "Party Narrative Maneuver") {
            return <Narrative />;
        } else {
            return <Combat />;
        }
    };

    const renderParadigmSVG = () => {
        switch (card.paradigm) {
          case "Honorable":
            return <Honorable animate={0} />;
          case "Infamous":
            return <Infamous animate={0} />;
          default:
            return null; // Return null if no matching type is found
        }
    };

    const renderWeightSVG = () => {
        if (card.weight === "X") {
            return <Light animate={0} />;
        } else {
            return <Heavy animate={0} />;
        }
    };

    const renderTypeSVG = () => {
        switch (card.maneuver_type) {
          case "Attack Maneuver":
            return <Attack animate={0} />;
          case "Aura Maneuver":
            return <Aura animate={0} />;
          case "Inciting Maneuver":
            return <Inciting animate={0} />;
          case "Modify Maneuver":
            return <Modify animate={0} />;
          case "Reaction Maneuver":
            return <Reaction animate={0} />;
          default:
            return null; // Return null if no matching type is found
        }
    };

    const renderDisciplineSVG = () => {
        switch (card.discipline) {
          case "Aiontropier":
            return <Aiontropier animate={0} />;
          case "Elementalist":
            return <Elementalist animate={0} />;
          case "Euclidinst":
            return <Euclidinst animate={0} />;
          case "Fleethand Jaeger":
            return <FleethandJaeger animate={0} />;
          case "Flesh Shaper":
            return <FleshShaper animate={0} />;
          case "Gloommantle":
            return <Gloommantle animate={0} />;
          case "Geist Caller":
            return <GeistCaller animate={0} />;
          case "Ironhanded":
            return <Ironhanded animate={0} />;
          case "Metapsychiral":
            return <Metapsychiral animate={0} />;
          case "Nobles Nail":
            return <NoblesNail animate={0} />;
          case "Paragon Populi":
            return <ParagonPopuli animate={0} />;
          case "Shieldbearer":
            return <Shieldbearer animate={0} />;
          case "Wild Whisperer":
            return <WildWhisperer animate={0} />;
          case "Yieldless Goliath":
            return <YieldlessGoliath animate={0} />;
          default:
            return null; // Return null if no matching type is found
        }
    }

    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify(card))
        setActiveCard(index)
    }

if (!card.maneuver_name || Object.keys(card).length === 0) {
    return null;
}

return (
    <div
        style={cardStyle}
        draggable
        key={index}
        onDragStart={handleDragStart}
        onDragEnd={() => setActiveCard(null)}
    >
        {/* Maneuver Name */}
        <div style={maneuverNameStyle}>{card.maneuver_name}</div>

        {/* SVG Image */}
        <div style={svgContainerStyle}>
            <div className='thumbnail'>
                <Rings />
                {renderCombatNarrativeSVG()}
                {renderParadigmSVG()}
                {renderWeightSVG()}
                {renderTypeSVG()}
                {renderDisciplineSVG()}
            </div>
        </div>
    </div>
);
}

export default Card