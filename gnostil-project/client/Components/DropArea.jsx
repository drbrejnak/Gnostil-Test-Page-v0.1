import React from 'react'
import { useState } from 'react'

const DropArea = () => {
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
        width: "10px",
        height: "50px",
        opacity: 0
    }

return (
    <section
        onDragEnter={() => setShowDrop(true)}
        onDragLeave={() => setShowDrop(false)}
        style={showDrop ? areaStyle : hideDrop }
    >
        +
    </section>
    )
}

export default DropArea