import React from 'react'
import "../src/App.css";
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
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: "grab",
        padding: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    };

    const maneuverNameStyle = {
        fontSize: "16px",
        marginBottom: "5px",
        textAlign: "center",
    };

    const svgContainerStyle = {
        width: "100%",
        height: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "black",
      };

    const svgStyle = {
    width: "100%",
    height: "100%",
    };

    const renderSVG = () => {
        switch (card.maneuver_type) {
          case "Attack Maneuver":
            return <Attack style={svgStyle} />;
          case "Aura Maneuver":
            return <Aura />;
          case "Inciting Maneuver":
            return <Inciting />;
          case "Modify Maneuver":
            return <Modify />;
          case "Reaction Maneuver":
            return <Reaction />;
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
                {renderSVG()}
            </div>
        </div>
    </div>
);
}

export default Card