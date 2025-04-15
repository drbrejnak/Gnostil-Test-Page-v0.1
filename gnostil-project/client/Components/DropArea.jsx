import React from 'react'
import { useState } from 'react'

const DropArea = ({onDrop, index}) => {
    const [showDrop, setShowDrop] = useState(false)

    const areaStyle = {
        width: "100px",
        height: "50px",
        overflow: "auto",
        border: "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "all 0.2s ease-in-out"
    }

    const hideDrop = {
        width: "25px",
        height: "50px",
        opacity: 0
    }

return (
    <section
        onDragEnter={(e) => {
            if (e.dataTransfer.types.includes("text/plain") || e.dataTransfer.types.includes("application/x-maneuver")) {
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
        {index}
    </section>
)
}

export default DropArea