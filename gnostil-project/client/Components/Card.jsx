import React from 'react'

function Card({ card, index, setActiveCard }) {

    const cardStyle = {
        minWidth: "100px",
        height: "50px",
        backgroundColor: "white",
        overflow: "auto",
        border: "1px solid black",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab"
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
    {card.maneuver_name}
    </div>
)
}

export default Card