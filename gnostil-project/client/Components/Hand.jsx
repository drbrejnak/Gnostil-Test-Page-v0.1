import * as React from "react";
import { useEffect, useState } from "react";
import '../src/App.css'
import Card from "./Card";
import DropArea from "./DropArea";

const host = "http://localhost:3000"

export default function Hand({ auth, deck, cards, setCards, setActiveCard }) {

    const [macro, setMacro] = useState(1);

    const handleSelectChange = (event) => {
        setMacro(Number(event.target.value));
    };

    const boxStyle = {
        backgroundColor: "#dadada",
        margin: 10,
        display: "flex",
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "96vw",
        justifyContent: "center",
        alignItems: "flex-end",
        position: "absolute",
        bottom: 50,
        width: "100%",
        height: "100px"
    };
    // localStorage.clear();
    return (
        <div
            style={{ ...boxStyle, display: "flex", flexDirection: "row", alignItems: "center" }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.types.includes("application/x-name")) {
                  const data = e.dataTransfer.getData("application/x-name");
                  setCards((prevCards) => [...prevCards, data]);
              }
            }}
        >
        <select
        style={{ top: 10, position: "absolute", left: 100 }}
        value={macro}
        onChange={handleSelectChange}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
        </select>
            {cards.map((card, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Card index={index} name={card} setActiveCard={setActiveCard} />
                    <DropArea />
                </div>
            ))}
        </div>
    );
}