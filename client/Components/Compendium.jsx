import * as React from "react";
import { useEffect, useState } from "react";
import { tableStyles } from "./Styles/TableStyles";
import { getManeuvers, removeFromHand, removeFromDeck } from ".";

export default function Compendium({ setSelectedManeuver, auth, char, setCards, setDeck, localCards, setLocalCards, localDeck, setLocalDeck, deck, cards }) {
  const [compendium, setCompendium] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDiscipline, setFilterDiscipline] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterToll, setFilterToll] = useState("");
  const [filterYield, setFilterYield] = useState("");
  const [filterWeight, setFilterWeight] = useState("");
  const [filterParadigm, setFilterParadigm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    getManeuvers(setCompendium);
  }, []);

  // Filtered and searched data
  const filteredCompendium = compendium
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
        if (prevConfig.direction === "ascending") {
          return { key, direction: "descending" };
        } else if (prevConfig.direction === "descending") {
          return { key: null, direction: null };
        }
      }
      return { key, direction: "ascending" };
    });
  };

  // Get the arrow icon for the current sort state
  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") return " ▲";
      if (sortConfig.direction === "descending") return " ▼";
    }
    return "";
  };

  const handleRowClick = (maneuver) => {
    setSelectedManeuver(maneuver);
  };

  const dropAreaStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 99, 71, 0.2)",
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
        if (e.dataTransfer.types.includes("application/x-card") ||
            e.dataTransfer.types.includes("application/x-maneuver")) {
          e.preventDefault();
          e.stopPropagation();
          setIsDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsDragging(false);
        }
      }}
      onDrop={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        try {
            if (e.dataTransfer.types.includes("application/x-card")) {
                const card = JSON.parse(e.dataTransfer.getData("application/x-card"));
                if (auth?.id && char?.id) {
                    await removeFromHand(
                        auth,
                        char,
                        setCards,
                        card.id,
                        card.discipline === "Technique"
                    );
                } else {
                    setLocalCards(prevCards => prevCards.filter(c => c.id !== card.id));
                }
            }
            else if (e.dataTransfer.types.includes("application/x-maneuver")) {
                const maneuver = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));
                if (auth?.id && char?.id) {
                    const success = await removeFromDeck(
                        auth,
                        char,
                        setDeck,
                        maneuver.id,
                        maneuver.discipline === "Technique"
                    );

                    if (success) {
                        const isInHand = cards.some(card => card.id === maneuver.id);
                        if (isInHand) {
                            await removeFromHand(
                                auth,
                                char,
                                setCards,
                                maneuver.id,
                                maneuver.discipline === "Technique"
                            );
                        }
                    }
                } else {
                    setLocalDeck(prevDeck => prevDeck.filter(card => card.id !== maneuver.id));
                    setLocalCards(prevCards => prevCards.filter(card => card.id !== maneuver.id));
                }
            }
        } catch (error) {
            console.error("Error processing dropped card:", error);
        }
      }}
    >
      {/* Drop Area Overlay */}
      <div style={dropAreaStyle} />

      {/* Add Title */}
      <h2 style={{
        position: 'absolute',
        left: '0.5em',
        color: 'white',
        margin: '5px 5px',
        padding: 0,
        fontSize: '1.1em',
        fontWeight: 'normal',
        textAlign: 'right',
      }}>
        Compendium
      </h2>

      <div style={{
        ...tableStyles.filters,
        paddingTop: '2em',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          flex: '1 1 auto',
          minWidth: '200px'
        }}>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              ...tableStyles.searchInput,
              flex: '1 1 auto'
            }}
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              ...tableStyles.button,
              whiteSpace: 'nowrap'
            }}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Filters container remains unchanged */}
        {showFilters && (
          <div style={tableStyles.filterContainer}>
            <select
              value={filterDiscipline}
              onChange={(e) => setFilterDiscipline(e.target.value)}
              style={tableStyles.select}
            >
              <option value="">All Disciplines</option>
              {[...new Set(compendium.map((maneuver) => maneuver.discipline))]
                .sort((a, b) => a.localeCompare(b))
                .map((discipline, index) => (
                  <option key={index} value={discipline}>
                    {discipline}
                  </option>
                ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={tableStyles.select}
            >
              <option value="">All Types</option>
              {[...new Set(compendium.map((maneuver) => maneuver.maneuver_type))]
                .sort((a, b) => a.localeCompare(b))
                .map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
            </select>

            <select
              value={filterToll}
              onChange={(e) => setFilterToll(Number(e.target.value) || "")}
              style={tableStyles.select}
            >
              <option value="">All Tolls</option>
              {[...new Set(compendium.map((maneuver) => maneuver.toll))]
                .filter(toll => toll !== null)
                .sort((a, b) => a - b)
                .map((toll, index) => (
                  <option key={index} value={toll}>
                    {toll}
                  </option>
                ))}
            </select>

            <select
              value={filterYield}
              onChange={(e) => setFilterYield(Number(e.target.value) || "")}
              style={tableStyles.select}
            >
              <option value="">All Yields</option>
              {[...new Set(compendium.map((maneuver) => maneuver.yield))]
                .filter(yieldValue => yieldValue !== null)
                .sort((a, b) => a - b)
                .map((yieldValue, index) => (
                  <option key={index} value={yieldValue}>
                    {yieldValue}
                  </option>
                ))}
            </select>

            <select
              value={filterWeight}
              onChange={(e) => setFilterWeight(e.target.value)}
              style={tableStyles.select}
            >
              <option value="">All Weights</option>
              {[...new Set(compendium.map((maneuver) => maneuver.weight))]
                .filter(yieldValue => yieldValue !== null)
                .sort((a, b) => Number(a) - Number(b))
                .map((weight, index) => (
                  <option key={index} value={weight}>
                    {weight}
                  </option>
                ))}
            </select>

            <select
              value={filterParadigm}
              onChange={(e) => setFilterParadigm(e.target.value)}
              style={tableStyles.select}
            >
              <option value="">All Paradigms</option>
              {[...new Set(compendium.map((maneuver) => maneuver.paradigm))]
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
            {filteredCompendium.map((maneuver, index) => (
              <tr
                key={index}
                style={tableStyles.row}
                draggable={true}
                onClick={(e) => {
                  e.stopPropagation();
                  handleRowClick(maneuver);
                }}
                onDragStart={(e) => {
                  e.stopPropagation();
                  const dt = e.dataTransfer;

                  const maneuverData = {
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
                  };

                  dt.setData('application/x-maneuver', JSON.stringify(maneuverData));
                }}
                onDragEnd={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
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