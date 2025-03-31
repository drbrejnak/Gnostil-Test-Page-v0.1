import * as React from "react";
import { useEffect, useState } from "react";

export default function Compendium() {
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

  const getManeuvers = async () => {
    try {
      const response = await fetch("/maneuvers");
      const maneuvers = await response.json();
      console.log(maneuvers);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getManeuvers();
  }, []);

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
            <tr>
              <td>Alfreds Futterkiste</td>
              <td>Maria Anders</td>
              <td>Germany</td>
            </tr>
            <tr>
              <td>Centro comercial Moctezuma</td>
              <td>Francisco Chang</td>
              <td>Mexico</td>
            </tr>
            <tr>
              <td>Ernst Handel</td>
              <td>Roland Mendel</td>
              <td>Austria</td>
            </tr>
            <tr>
              <td>Island Trading</td>
              <td>Helen Bennett</td>
              <td>UK</td>
            </tr>
            <tr>
              <td>Laughing Bacchus Winecellars</td>
              <td>Yoshi Tannamuri</td>
              <td>Canada</td>
            </tr>
            <tr>
              <td>Magazzini Alimentari Riuniti</td>
              <td>Giovanni Rovelli</td>
              <td>Italy</td>
            </tr>
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