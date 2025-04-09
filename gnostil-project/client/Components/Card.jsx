import React from 'react'

function Card({ name, index, setActiveCard }) {

    const cardStyle = {
        minWidth: "100px",
        height: "50px",
        backgroundColor: "white",
        overflow: "auto",
        border: "1px solid black",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "grab"
    }

    const handleDragStart = () => {
        // e.dataTransfer.setData("text", name)
        setActiveCard(index)
    }

  return (
    <div
    style={cardStyle}
    draggable
    key={index}
    onDragStart={handleDragStart}
    onDragEnd={() => setActiveCard(null)}
    >
    {name}
    </div>
  )
}

export default Card