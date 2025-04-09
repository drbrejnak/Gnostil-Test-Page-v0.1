import * as React from "react";
import { useEffect, useState } from "react";

export default function Compendium() {

  const [compendium, setCompendium] = useState([]);

  const getManeuvers = async () => {
    try {
      const response = await fetch("http://localhost:3000/maneuvers");
      const maneuvers = await response.json();
      setCompendium(maneuvers);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getManeuvers();
  }, []);

  const boxStyle = {
    width: "30vw",
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(60%, -50%)",
    height: "33vw",
    backgroundColor: "white",
    overflow: "auto"
  }

  return (
      <div style={boxStyle}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Discipline</th>
              <th>Type</th>
              <th>Description</th>
              <th>Ability</th>
              <th>Toll</th>
              <th>Yield</th>
              <th>Weight</th>
              <th>Paradigm</th>
            </tr>
          </thead>
          <tbody>
            {compendium.map((maneuver, index) => (
              <tr key={index} draggable onDragStart={(e) => e.dataTransfer.setData("application/x-id", maneuver.id)}>
                <td>{maneuver.maneuver_name}</td>
                <td>{maneuver.discipline}</td>
                <td>{maneuver.maneuver_type}</td>
                <td>{maneuver.description}</td>
                <td>{maneuver.ability}</td>
                <td>{maneuver.toll}</td>
                <td>{maneuver.yield}</td>
                <td>{maneuver.weight}</td>
                <td>{maneuver.paradigm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}


    // <Box
    //   sx={{
    //     width: "30vw",
    //     width: "30vw",
    //     position: "absolute",
    //     left: "50%",
    //     top: "40%",
    //     transform: "translate(60%, -50%)",
    //     height: "33vw",
    //     backgroundColor: "white",
    //   }}
    // >
    //   <div style={{ position: "relative" }}>
    //     <div
    //       style={{
    //         display: "flex",
    //         flexDirection: "column",
    //         height: "33vw",
    //       }}
    //     >