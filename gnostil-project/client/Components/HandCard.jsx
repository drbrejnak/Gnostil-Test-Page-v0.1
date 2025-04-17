import React from 'react'
import "../src/App.css";
import Rings from "../Maneuver_Properties/Rings";
import Combat from "../Maneuver_Properties/Combat";
import Narrative from "../Maneuver_Properties/Narrative";
import Honorable from "../Maneuver_Properties/Honorable";
import Infamous from "../Maneuver_Properties/Infamous";
import Light from "../Maneuver_Properties/Light";
import Heavy from "../Maneuver_Properties/Heavy";
import Attack from '../Maneuver_Properties/Attack';
import Aura from '../Maneuver_Properties/Aura';
import Inciting from '../Maneuver_Properties/Inciting';
import Modify from '../Maneuver_Properties/Modify';
import Reaction from '../Maneuver_Properties/Reaction';

function Card({ card, index, setActiveCard }) {
    console.log(card)

    const cardStyle = {
        minWidth: "100px",
        maxWidth: "100px",
        height: "100%",
        backgroundColor: "white",
        overflow: "hidden",
        border: "2px solid black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "grab",
        padding: "5px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const maneuverNameStyle = {
        fontSize: "16px",
        marginBottom: "5px",
        textAlign: "center",
    };

    const svgContainerStyle = {
        width: "105%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "black",
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
            </div>
        </div>
    </div>
);
}

export default Card