import * as React from "react";
import { useEffect, useState } from "react";

const host = "http://localhost:3000"

export default function Hand({ auth, deck }) {

    const [macro, setMacro] = useState(1);

    const handleSelectChange = (event) => {
        setMacro(Number(event.target.value));
    };

    const boxStyle = {
        background: "#dadada",
        margin: 10,
        display: "flex",
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "96vw",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 50,
        width: "100%"
    };

    const cardStyle = {
        width: "10%",
        height: "50px",
        backgroundColor: "white",
        overflow: "auto",
        border: "1px solid black",
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div style={boxStyle}>
            <select
            style={{ top: 10, position: "absolute", left: 100 }}
            value={macro}
            onChange={handleSelectChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
            <div style={cardStyle}>Hand</div>
        </div>
    )
}