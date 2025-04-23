import * as React from "react";
import { useEffect, useState } from "react";
import { fetchCharDeck, removeFromDeck, addToDeck } from ".";
import { tableStyles } from "./Styles/TableStyles";

export default function Deck({ auth, char, deck, setDeck, setSelectedManeuver }) {
  const [localDeck, setLocalDeck] = useState([]); // Local deck state for unauthenticated users
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDiscipline, setFilterDiscipline] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterToll, setFilterToll] = useState("");
  const [filterYield, setFilterYield] = useState("");
  const [filterWeight, setFilterWeight] = useState("");
  const [filterParadigm, setFilterParadigm] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to toggle filters
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null }); // Sorting state
  const [isDragging, setIsDragging] = useState(false); // State to track if a card is being dragged over the deck area

  const deckToRender = auth.id ? deck : localDeck; // Use the appropriate deck based on authentication

  useEffect(() => {
    if (auth.id && char.id) {
      // Fetch the deck from the database for authenticated users
      fetchCharDeck(auth, char, setDeck);
    } else {
      // Clear the database-backed deck for unauthenticated users
      setDeck([]);
    }
  }, [auth, char]);

  useEffect(() => {
    if (!auth.id) {
      const savedLocalDeck = JSON.parse(localStorage.getItem("localDeck")) || [];
      setLocalDeck(savedLocalDeck);
    }
  }, [auth]);

  useEffect(() => {
    if (!auth.id) {
      localStorage.setItem("localDeck", JSON.stringify(localDeck));
    }
  }, [localDeck]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (auth.id && (!char || !char.id)) {
      return;
    }
    setIsDragging(false); // Hide the drop area after dropping
    const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));

    if (auth.id) {
      // Add to the database-backed deck for authenticated users
      addToDeck(auth, char, setDeck, data.id);
    } else {
      // Add to the local deck for unauthenticated users
      setLocalDeck((prevLocalDeck) => {
        // Avoid duplicates in the local deck
        if (!prevLocalDeck.some((maneuver) => maneuver.id === data.id)) {
          return [...prevLocalDeck, data];
        }
        return prevLocalDeck;
      });
    }
  };

  const handleRemove = (maneuverId) => {
    if (auth.id) {
      // Remove from the database-backed deck for authenticated users
      removeFromDeck(auth, char, setDeck, maneuverId);
    } else {
      // Remove from the local deck for unauthenticated users
      setLocalDeck((prevLocalDeck) =>
        prevLocalDeck.filter((maneuver) => maneuver.id !== maneuverId)
      );
    }
  };

  // Filtered and searched data
  const filteredDeck = deckToRender
    .filter((maneuver) => {
      const matchesSearch =
        maneuver.maneuver_name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDiscipline =
        !filterDiscipline || maneuver.discipline === filterDiscipline;
      const matchesType = !filterType || maneuver.maneuver_type === filterType;
      const matchesToll = !filterToll || maneuver.toll === filterToll;
      const matchesYield = !filterYield || maneuver.yield === filterYield;
      const matchesWeight = !filterWeight || maneuver.weight === filterWeight;
      const matchesParadigm =
        !filterParadigm || maneuver.paradigm === filterParadigm;

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

  const handleRowClick = (maneuver) => {
    setSelectedManeuver(maneuver);
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
    ...tableStyles.container,
    maxWidth: "30vw",
    position: "absolute",
    right: "50%",
    top: "40%",
    transform: "translate(-60%, -50%)",
    height: "33vw",
    overflow: "auto",
  };

  const dropAreaStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Semi-transparent black
    display: isDragging ? "block" : "none", // Show only when dragging
    zIndex: 1,
  };

  return (
    <div
      style={boxStyle}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        // Only trigger if leaving the main container
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragging(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling
        setIsDragging(false);
        const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
        handleDrop(e);
      }}
    >
      {/* Drop Area Overlay */}
      <div style={dropAreaStyle}></div>
      {/* Search Bar */}
      <div style={tableStyles.filters}>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={tableStyles.searchInput}
        />

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          style={tableStyles.button}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Filters */}
        {showFilters && (
          <div style={tableStyles.filterContainer}>
            <select
              value={filterDiscipline}
              onChange={(e) => setFilterDiscipline(e.target.value)}
              style={tableStyles.select}
            >
              <option value="">All Disciplines</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.discipline))].map(
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
              style={tableStyles.select}
            >
              <option value="">All Types</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.maneuver_type))].map(
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
              style={tableStyles.select}
            >
              <option value="">All Tolls</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.toll))].map(
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
              style={tableStyles.select}
            >
              <option value="">All Yields</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.yield))].map(
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
              style={tableStyles.select}
            >
              <option value="">All Weights</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.weight))].map(
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
              style={tableStyles.select}
            >
              <option value="">All Paradigms</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.paradigm))].map(
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
      <div style={tableStyles.tableContainer}>
        <table style={tableStyles.table}>
          <thead style={tableStyles.tableHeader}>
            <tr>
              <th style={tableStyles.headerCell}>
                <button
                  style={{...tableStyles.headerButton, cursor: "default"}}
                  disabled
                >
                  Delete
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("maneuver_name")}
                  style={tableStyles.headerButton}
                >
                  Name{getSortArrow("maneuver_name")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("discipline")}
                  style={tableStyles.headerButton}
                >
                  Discipline{getSortArrow("discipline")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("maneuver_type")}
                  style={tableStyles.headerButton}
                >
                  Type{getSortArrow("maneuver_type")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("toll")}
                  style={tableStyles.headerButton}
                >
                  Toll{getSortArrow("toll")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("yield")}
                  style={tableStyles.headerButton}
                >
                  Yield{getSortArrow("yield")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("weight")}
                  style={tableStyles.headerButton}
                >
                  Weight{getSortArrow("weight")}
                </button>
              </th>
              <th style={tableStyles.headerCell}>
                <button
                  onClick={() => handleSort("paradigm")}
                  style={tableStyles.headerButton}
                >
                  Paradigm{getSortArrow("paradigm")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDeck.map((maneuver, index) => (
              <tr
                key={index}
                style={tableStyles.row}
                draggable
                onClick={() => handleRowClick(maneuver)}
                onDragStart={(e) => {
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
                  );
                }}
              >
                <td style={tableStyles.cell}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event from bubbling up to the row
                      handleRemove(maneuver.id);
                    }}
                    style={{ ...tableStyles.button, padding: "4px 8px" }}
                  >
                    Remove
                  </button>
                </td>
                <td style={tableStyles.cell}>{maneuver.maneuver_name}</td>
                <td style={tableStyles.cell}>{maneuver.discipline}</td>
                <td style={tableStyles.cell}>{maneuver.maneuver_type}</td>
                <td style={tableStyles.cell}>{maneuver.toll}</td>
                <td style={tableStyles.cell}>{maneuver.yield}</td>
                <td style={tableStyles.cell}>{maneuver.weight}</td>
                <td style={tableStyles.cell}>{maneuver.paradigm}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
