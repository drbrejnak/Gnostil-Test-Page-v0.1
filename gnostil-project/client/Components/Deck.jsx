import * as React from "react";
import { useEffect, useState } from "react";
import { fetchCharDeck, removeFromDeck, addToDeck, addToHand, removeFromHand } from ".";
import { tableStyles } from "./Styles/TableStyles";

export default function Deck({ auth, char, deck, setDeck, setSelectedManeuver, setCards, localDeck, setLocalDeck, localCards, setLocalCards }) {; // Local deck state for unauthenticated users
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
  const [checkedManeuvers, setCheckedManeuvers] = useState(new Set());

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

  const handleDrop = async (e) => {
    e.preventDefault();
    if (auth.id && (!char || !char.id)) {
      return;
    }
    setIsDragging(false);

    const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));

    if (auth.id) {
      // Only add to deck via DB
      await addToDeck(auth, char, setDeck, data.id);
    } else {
      setLocalDeck((prevDeck) => {
        if (!prevDeck.some((card) => card.id === data.id)) {
          return [...prevDeck, data];
        }
        return prevDeck;
      });
    }
  };

  const handleRemove = async (maneuverId) => {
    if (auth.id) {
      // Remove from deck via DB
      const success = await removeFromDeck(auth, char, setDeck, maneuverId);
      if (success) {
        // Also remove from hand
        await removeFromHand(auth, char, setCards, maneuverId);
      }
    } else {
      // Remove from local deck
      setLocalDeck((prevDeck) => {
        // Also remove from local hand
        setLocalCards((prevCards) =>
          prevCards.filter((card) => card.id !== maneuverId)
        );
        return prevDeck.filter((card) => card.id !== maneuverId);
      });
    }
  };

  const handleCheck = (maneuverId) => {
    setCheckedManeuvers(prev => {
      const next = new Set(prev);
      if (next.has(maneuverId)) {
        next.delete(maneuverId);
      } else {
        next.add(maneuverId);
      }
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    for (const maneuverId of checkedManeuvers) {
      if (auth.id) {
        const success = await removeFromDeck(auth, char, setDeck, maneuverId);
        if (success) {
          await removeFromHand(auth, char, setCards, maneuverId);
        }
      } else {
        setLocalDeck(prevDeck =>
          prevDeck.filter(card => card.id !== maneuverId)
        );
        setLocalCards(prevCards =>
          prevCards.filter(card => card.id !== maneuverId)
        );
      }
    }
    setCheckedManeuvers(new Set()); // Clear selections after deletion
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
      if (!sortConfig.key) return 0;

      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      // Handle numeric sorting for toll and yield
      if (sortConfig.key === 'toll' || sortConfig.key === 'yield') {
        aValue = aValue !== null ? Number(aValue) : -Infinity;
        bValue = bValue !== null ? Number(bValue) : -Infinity;
      }

      if (sortConfig.direction === "ascending") {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else if (sortConfig.direction === "descending") {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
      return 0;
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

  const dropAreaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0, // Use right instead of width
    bottom: 0, // Use bottom instead of height
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    display: isDragging ? "flex" : "none",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "bold",
  };

  return (
    <div
      style={tableStyles.container}
      onDragOver={(e) => {
        // Only show drop area for application/x-maneuver data
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }
      }}
      onDragLeave={(e) => {
        // Only trigger if leaving the main container
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragging(false);
        }
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.types.includes("application/x-maneuver")) {
          JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
          handleDrop(e);
        }
      }}
    >
      {/* Drop Area Overlay */}
      <div style={dropAreaStyle} />
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
        {/* Discipline filter */}
        <select
          value={filterDiscipline}
          onChange={(e) => setFilterDiscipline(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Disciplines</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.discipline))]
            .sort((a, b) => a.localeCompare(b))
            .map((discipline, index) => (
              <option key={index} value={discipline}>
                {discipline}
              </option>
            ))}
        </select>

        {/* Type filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Types</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.maneuver_type))]
            .sort((a, b) => a.localeCompare(b))
            .map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
        </select>

        {/* Toll filter */}
        <select
          value={filterToll}
          onChange={(e) => setFilterToll(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Tolls</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.toll))]
            .filter(toll => toll !== null)
            .sort((a, b) => Number(a) - Number(b))
            .map((toll, index) => (
              <option key={index} value={toll}>
                {toll}
              </option>
            ))}
        </select>

        {/* Yield filter */}
        <select
          value={filterYield}
          onChange={(e) => setFilterYield(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Yields</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.yield))]
            .filter(yieldValue => yieldValue !== null)
            .sort((a, b) => Number(a) - Number(b))
            .map((yieldValue, index) => (
              <option key={index} value={yieldValue}>
                {yieldValue}
              </option>
            ))}
        </select>

        {/* Weight filter */}
        <select
          value={filterWeight}
          onChange={(e) => setFilterWeight(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Weights</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.weight))]
            .filter(yieldValue => yieldValue !== null)  // Remove null values
            .sort((a, b) => Number(a) - Number(b))  // Numerical sort
            .map((weight, index) => (
              <option key={index} value={weight}>
                {weight}
              </option>
            ))}
        </select>

        {/* Paradigm filter */}
        <select
          value={filterParadigm}
          onChange={(e) => setFilterParadigm(e.target.value)}
          style={tableStyles.select}
        >
          <option value="">All Paradigms</option>
          {[...new Set(filteredDeck.map((maneuver) => maneuver.paradigm))]
            .sort((a, b) => a.localeCompare(b))
            .map((paradigm, index) => (
              <option key={index} value={paradigm}>
                {paradigm}
              </option>
            ))}
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
                  onClick={handleDeleteSelected}
                  style={{
                    ...tableStyles.headerButton,
                    cursor: checkedManeuvers.size > 0 ? "pointer" : "default",
                    opacity: checkedManeuvers.size > 0 ? 1 : 0.5
                  }}
                  disabled={checkedManeuvers.size === 0}
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
                      original_disciplines: maneuver.original_disciplines,
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
                  <input
                    type="checkbox"
                    checked={checkedManeuvers.has(maneuver.id)}
                    onChange={() => handleCheck(maneuver.id)}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px'
                    }}
                  />
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
