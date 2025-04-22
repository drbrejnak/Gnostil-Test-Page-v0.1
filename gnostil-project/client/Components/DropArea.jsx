import React from 'react'
import { useState } from 'react'

const DropArea = ({onDrop, index}) => {
    const [showDrop, setShowDrop] = useState(false)

    const areaStyle = {
        width: "100px",
        height: "100%",
        margin: "0 5px",
        overflow: "auto",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "all 0.2s ease-in-out",
        backgroundColor: showDrop ? "rgba(255, 255, 255, 0.2)" : "transparent",
        borderRadius: "4px",
    }

    const hideDrop = {
        margin: "0 5px",
        width: "10px",
        height: "100%",
        opacity: 0
    }

return (
    <section
        onDragEnter={(e) => {
            if (e.dataTransfer.types.includes("text/plain")) {
                setShowDrop(true);
            }
        }}
        onDragLeave={() => setShowDrop(false)}
        onDrop={(e) => {
            if (e.dataTransfer.types.includes("text/plain")) {
                const data = JSON.parse(e.dataTransfer.getData("text/plain"));
                onDrop(data); // Pass the dragged data to the parent
                setShowDrop(false);
            } else if(e.dataTransfer.types.includes("application/x-maneuver")){
                const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
                    onDrop(data); // Pass the dragged data to the parent
                    setShowDrop(false);
            }
        }}
        style={showDrop ? areaStyle : hideDrop}
    >
        +
    </section>
)
}

export default DropArea