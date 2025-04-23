import React from 'react'
import { useState } from 'react'

const DropArea = ({onDrop, index}) => {
    const [showDrop, setShowDrop] = useState(false)

    const areaStyle = {
        width: "100px",
        height: "calc(100% - 20px)", // Match HandCard height
        margin: "0 5px",
        overflow: "auto",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
        transition: "all 0.2s ease-in-out",
        backgroundColor: showDrop ? "rgba(255, 255, 255, 0.2)" : "transparent",
        borderRadius: "8px",
    }

    const hideDrop = {
        margin: "0 5px",
        width: "10px",
        height: "calc(100% - 20px)", // Match HandCard height
        opacity: 0
    }

    return (
        <section
            onDragEnter={(e) => {
                e.preventDefault();
                if (e.dataTransfer.types.includes("application/x-card")) {
                    setShowDrop(true);
                }
            }}
            onDragOver={(e) => {
                e.preventDefault();
                if (e.dataTransfer.types.includes("application/x-card")) {
                    setShowDrop(true);
                }
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setShowDrop(false);
                }
            }}
            onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.types.includes("application/x-card")) {
                    const data = JSON.parse(e.dataTransfer.getData("application/x-card"));
                    onDrop(data);
                    setShowDrop(false);
                } else if(e.dataTransfer.types.includes("application/x-maneuver")) {
                    const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
                    onDrop(data);
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