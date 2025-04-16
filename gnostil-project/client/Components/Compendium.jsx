import * as React from "react";
import { useEffect, useState } from "react";

export default function Compendium() {
  const [compendium, setCompendium] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDiscipline, setFilterDiscipline] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterToll, setFilterToll] = useState("");
  const [filterYield, setFilterYield] = useState("");
  const [filterWeight, setFilterWeight] = useState("");
  const [filterParadigm, setFilterParadigm] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sorting state


  const getManeuvers = async () => {
    try {
      const response = await fetch("http://localhost:3000/maneuvers");
      const maneuvers = await response.json();
      setCompendium(maneuvers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getManeuvers();
  }, []);

  // Filtered and searched data
  const filteredCompendium = compendium
    .filter((maneuver) => {
      const matchesSearch =
        maneuver.maneuver_name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesDiscipline =
        !filterDiscipline || maneuver.discipline === filterDiscipline;
      const matchesType = !filterType || maneuver.maneuver_type === filterType;
      const matchesToll = !filterToll || maneuver.toll === filterToll;
      const matchesYield = !filterYield || maneuver.yield === filterYield;
      const matchesWeight = !filterWeight || maneuver.weight === filterWeight;
      const matchesParadigm = !filterParadigm || maneuver.paradigm === filterParadigm;

      return (
        matchesSearch &&
        matchesDiscipline &&
        matchesType &&
        matchesToll &&
        matchesYield &&
        matchesWeight &&
        matchesParadigm
      );
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0; // No sorting
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (sortConfig.direction === "ascending") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else if (sortConfig.direction === "descending") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
      return 0; // Original order
    });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        // Cycle through sorting states: ascending → descending → original
        if (prevConfig.direction === "ascending") {
          return { key, direction: "descending" };
        } else if (prevConfig.direction === "descending") {
          return { key: null, direction: null }; // Original order
        }
      }
      return { key, direction: "ascending" }; // Default to ascending
    });
  };

  // Get the arrow icon for the current sort state
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") return " ▲";
      if (sortConfig.direction === "descending") return " ▼";
    }
    return ""; // No arrow for original order
  };

  const boxStyle = {
    width: "30vw",
    position: "absolute",
    left: "50%",
    top: "40%",
    transform: "translate(60%, -50%)",
    height: "33vw",
    backgroundColor: "white",
    overflow: "auto",
  };

  return (
    <div style={boxStyle}>
      {/* Search Bar */}
      <div style={{ marginBottom: "10px", padding: "10px" }}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: "100%", padding: "5px", marginBottom: "10px" }}
        />

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={{ padding: "5px", marginBottom: "10px" }}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters */}
        {showFilters && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <select
              value={filterDiscipline}
              onChange={(e) => setFilterDiscipline(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Disciplines</option>
              {[...new Set(compendium.map((maneuver) => maneuver.discipline))].map(
                (discipline, index) => (
                  <option key={index} value={discipline}>
                    {discipline}
                  </option>
                )
              )}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Types</option>
              {[...new Set(compendium.map((maneuver) => maneuver.maneuver_type))].map(
                (type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>

            <select
              value={filterToll}
              onChange={(e) => setFilterToll(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Tolls</option>
              {[...new Set(compendium.map((maneuver) => maneuver.toll))].map(
                (toll, index) => (
                  <option key={index} value={toll}>
                    {toll}
                  </option>
                )
              )}
            </select>

            <select
              value={filterYield}
              onChange={(e) => setFilterYield(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Yields</option>
              {[...new Set(compendium.map((maneuver) => maneuver.yield))].map(
                (yieldValue, index) => (
                  <option key={index} value={yieldValue}>
                    {yieldValue}
                  </option>
                )
              )}
            </select>

            <select
              value={filterWeight}
              onChange={(e) => setFilterWeight(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Weights</option>
              {[...new Set(compendium.map((maneuver) => maneuver.weight))].map(
                (weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                )
              )}
            </select>

            <select
              value={filterParadigm}
              onChange={(e) => setFilterParadigm(e.target.value)}
              style={{ padding: "5px" }}
            >
              <option value="">All Paradigms</option>
              {[...new Set(compendium.map((maneuver) => maneuver.paradigm))].map(
                (paradigm, index) => (
                  <option key={index} value={paradigm}>
                    {paradigm}
                  </option>
                )
              )}
            </select>
          </div>
        )}
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
          <th>
              <button onClick={() => handleSort("maneuver_name")}>
                Name{getSortArrow("maneuver_name")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("discipline")}>
                Discipline{getSortArrow("discipline")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("maneuver_type")}>
                Type{getSortArrow("maneuver_type")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("toll")}>
                Toll{getSortArrow("toll")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("yield")}>
                Yield{getSortArrow("yield")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("weight")}>
                Weight{getSortArrow("weight")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("paradigm")}>
                Paradigm{getSortArrow("paradigm")}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCompendium.map((maneuver, index) => (
            <tr
              key={index}
              draggable
              onDragStart={(e) =>
                e.dataTransfer.setData(
                  "application/x-maneuver",
                  JSON.stringify({
                    id: maneuver.id,
                    maneuver_name: maneuver.maneuver_name,
                    discipline: maneuver.discipline,
                    maneuver_type: maneuver.maneuver_type,
                    description: maneuver.description,
                    ability: maneuver.ability,
                    toll: maneuver.toll,
                    yield: maneuver.yield,
                    weight: maneuver.weight,
                    paradigm: maneuver.paradigm,
                  })
                )
              }
            >
              <td>{maneuver.maneuver_name}</td>
              <td>{maneuver.discipline}</td>
              <td>{maneuver.maneuver_type}</td>
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