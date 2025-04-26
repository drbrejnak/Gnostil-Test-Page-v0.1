import * as React from "react";
import { useEffect, useState } from "react";
import { fetchCharDeck, removeFromDeck, addToDeck, addToHand, removeFromHand } from ".";
import { tableStyles } from "./Styles/TableStyles";

export default function Deck({ auth, char, deck, setDeck, setSelectedManeuver, setCards, localDeck, setLocalDeck, localCards, setLocalCards }) {;
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
  const [checkedManeuvers, setCheckedManeuvers] = useState(new Set());

  const deckToRender = auth.id ? deck : localDeck;

  useEffect(() => {
    if (auth.id && char.id) {
      fetchCharDeck(auth, char, setDeck);
    } else {
      setDeck([]);
    }
  }, [auth, char]);

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (auth.id && !char.id) return;

    const data = JSON.parse(e.dataTransfer.getData("application/x-maneuver"));

    if (auth.id) {
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

  const handleRemove = async (maneuverId, maneuver) => {
    if (auth.id) {
        const isTechnique = maneuver.discipline === "Technique";
        const success = await removeFromDeck(
            auth,
            char,
            setDeck,
            maneuverId,
            isTechnique
        );
        if (success) {
            await removeFromHand(
                auth,
                char,
                setCards,
                maneuverId,
                isTechnique
            );
        }
    } else {
        setLocalDeck((prevDeck) => prevDeck.filter((card) => card.id !== maneuverId));
        setLocalCards((prevCards) => prevCards.filter((card) => card.id !== maneuverId));
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
        const maneuver = deckToRender.find(m => m.id === maneuverId);
        const isTechnique = maneuver?.discipline === "Technique";

        if (auth.id) {
            const success = await removeFromDeck(
                auth,
                char,
                setDeck,
                maneuverId,
                isTechnique
            );
            if (success) {
                await removeFromHand(
                    auth,
                    char,
                    setCards,
                    maneuverId,
                    isTechnique
                );
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
    setCheckedManeuvers(new Set());
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

  const handleRowClick = (maneuver) => {
    setSelectedManeuver(maneuver);
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") return " ▲";
      if (sortConfig.direction === "descending") return " ▼";
    }
    return "";
  };

  const dropAreaStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
      style={{
        ...tableStyles.container,
        cursor: auth.id && !char.id ? 'not-allowed' : 'default'
      }}
      onDragOver={(e) => {
        if (auth.id && !char.id) return;
        if (e.dataTransfer.types.includes("application/x-maneuver")) {
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

      {/* Add Title */}
      <h2 style={{
        position: 'absolute',
        right: '0.5em',
        color: 'white',
        margin: '5px 5px',
        padding: 0,
        fontSize: '1.1em',
        fontWeight: 'normal',
        textAlign: 'right',
      }}>
        {auth.id && char?.char_name ? `${char.char_name}'s Deck` : 'Character Deck'}
      </h2>

      {/* Search Bar */}
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
              onChange={(e) => setFilterToll(Number(e.target.value) || "")}
              style={tableStyles.select}
            >
              <option value="">All Tolls</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.toll))]
                .filter(toll => toll !== null)
                .sort((a, b) => a - b)
                .map((toll, index) => (
                  <option key={index} value={toll}>
                    {toll}
                  </option>
                ))}
            </select>

            {/* Yield filter */}
            <select
              value={filterYield}
              onChange={(e) => setFilterYield(Number(e.target.value) || "")}
              style={tableStyles.select}
            >
              <option value="">All Yields</option>
              {[...new Set(filteredDeck.map((maneuver) => maneuver.yield))]
                .filter(yieldValue => yieldValue !== null)
                .sort((a, b) => a - b)
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
                .filter(yieldValue => yieldValue !== null)
                .sort((a, b) => Number(a) - Number(b))  
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
                      is_technique: maneuver.is_technique,
                      component_maneuvers: maneuver.component_maneuvers,
                      inputs: maneuver.inputs
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
