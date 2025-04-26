import React from 'react'
import "../src/App.css";
import { Attack, Aura, Combat, Heavy, Honorable, Inciting, Infamous, Light, Modify, Narrative, Reaction, Rings } from "../Maneuver_Properties/PropertyIndex.js";
import { Aiontropier, Elementalist, Euclidinst, FleethandJaeger, FleshShaper, Gloommantle, GeistCalled, Ironhanded, Metapsychiral, NoblesNail, ParagonPopuli, Shieldbearer, WildWhisperer, YieldlessGoliath } from '../Maneuver_Disciplines/DisciplineIndex.js';

const HandCard = ({ index, card, setActiveCard, setSelectedManeuver }) => {
  const cardStyle = {
    minWidth: "90px",
    maxWidth: "90px",
    height: "calc(100% - 20px)",
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
    border: "1px solid #333",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "grab",
    padding: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    boxSizing: "border-box",
    margin: "10px 0",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    },
  };

  const maneuverNameStyle = {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "2px",
      textAlign: "center",
      color: "white",
      padding: "2px 4px",
      width: "100%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
  };

  const svgContainerStyle = {
      width: "100%",
      height: "calc(100% - 24px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      backgroundColor: "black",
      borderRadius: "4px",
      position: "relative",
      aspectRatio: "1 / 1",
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
            return null;
        }
    };

    const renderWeightSVG = () => {
        if (card.weight <= 5) {
            return <Light animate={0} />;
        } else {
            return <Heavy animate={0} />;
        }
    };

    const renderTypeSVG = () => {
        switch (card.maneuver_type) {
          case "Attack":
            return <Attack animate={0} />;
          case "Aura":
            return <Aura animate={0} />;
          case "Inciting":
            return <Inciting animate={0} />;
          case "Modify":
            return <Modify animate={0} />;
          case "Reaction":
            return <Reaction animate={0} />;
          default:
            return null;
        }
    };

    const renderDisciplineSVG = () => {
        if (card.discipline === "Technique" && card.original_disciplines) {
            const disciplines = JSON.parse(card.original_disciplines);

            return disciplines.map(discipline => {
                const disciplineMap = [
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
                    { name: "Aiontropier", Component: Aiontropier }
                ];

                const disciplineComponent = disciplineMap.find(d => d.name === discipline);
                if (disciplineComponent) {
                    const { Component } = disciplineComponent;
                    return <Component key={discipline} animate={0} />;
                }
                return null;
            });
        }

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
            case "Geist Called":
                return <GeistCalled animate={0} />;
            case "Ironhanded":
                return <Ironhanded animate={0} />;
            case "Metapsychiral":
                return <Metapsychiral animate={0} />;
            case "Noble’s Nail":
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
                return null;
        }
    }

    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/x-card", JSON.stringify(card))
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
        onClick={() => setSelectedManeuver(card)}
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

export default HandCard