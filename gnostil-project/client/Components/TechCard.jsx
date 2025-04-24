import React, { useState } from 'react';
import '../src/App.css';
import { cardStyles } from './Styles/CardStyles';
import { tableStyles } from './Styles/TableStyles';
import { techniqueMessageStyles } from './Styles/TechOverlayStyles';

const TechCard = ({ techniqueName, activeProperties, maneuvers, setTechnique, localDeck, setLocalDeck, auth, char, setDeck, deck }) => {
  const [name, setName] = useState(techniqueName || '');
  const [description, setDescription] = useState('');

  // Calculate combined stats
  const totalToll = maneuvers.reduce((sum, m) => sum + (m.toll || 0), 0);
  const totalYield = maneuvers.reduce((sum, m) => sum + (m.yield || 0), 0);

  const handleAddToDeck = () => {
    // Validate required name field
    if (!name.trim()) {
      alert('Please enter a technique name.');
      return;
    }

    // Check for duplicate names in the appropriate deck
    const deckToCheck = auth?.id ? deck : localDeck;
    const isDuplicate = deckToCheck.some(card => card.maneuver_name.toLowerCase() === name.trim().toLowerCase());

    if (isDuplicate) {
      alert('A card with this name already exists in the deck.');
      return;
    }

    // Create technique object
    const technique = {
      id: `tech-${Date.now()}`,
      maneuver_name: name,
      description: description,
      discipline: Array.from(activeProperties).find(prop => maneuvers[0].discipline === prop),
      maneuver_type: Array.from(activeProperties).find(prop =>
        ["Attack", "Inciting", "Aura", "Modify", "Reaction"].includes(prop)
      ),
      toll: totalToll,
      yield: totalYield,
      weight: Array.from(activeProperties).find(prop => ["Light", "Heavy"].includes(prop)),
      paradigm: Array.from(activeProperties).find(prop => ["Honorable", "Infamous"].includes(prop)),
      is_technique: true,
      component_maneuvers: maneuvers
    };

    // Add to appropriate deck based on auth status
    if (auth?.id) {
      // Add to server deck
      addToDeck(auth, char, setDeck, technique.id);
    } else {
      // Add to local deck
      setLocalDeck(prev => [...prev, technique]);
    }

    // Close the TechCard
    setTechnique(null);
  };

  return (
    <div style={cardStyles.container}>

      {/* Header Section */}
      <div style={cardStyles.header}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Technique Name"
          style={{
            ...tableStyles.select,
            cursor: 'text',
            backgroundColor: "rgba(26, 26, 26, 0.9)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            transition: "all 0.2s ease",
            padding: "8px 12px",
            width: '80%',
          }}
          required
        />
      </div>

      {/* Properties Grid */}
      <div style={cardStyles.propertyGrid}>
        <div style={cardStyles.property}>
          <span style={cardStyles.propertyLabel}>Type</span>
          <span style={cardStyles.propertyValue}>
            {Array.from(activeProperties)
              .find(prop => ["Attack", "Inciting", "Aura", "Modify", "Reaction"].includes(prop))}
          </span>
        </div>
        <div style={cardStyles.property}>
          <span style={cardStyles.propertyLabel}>
            {totalToll === 0
              ? "Yield"
              : totalYield === 0
              ? "Toll"
              : "Toll/Yield"}
          </span>
          <span style={cardStyles.propertyValue}>
            {totalToll === 0
              ? totalYield
              : totalYield === 0
              ? totalToll
              : `${totalToll} / ${totalYield}`}
          </span>
        </div>
        <div style={cardStyles.property}>
          <span style={cardStyles.propertyLabel}>Weight</span>
          <span style={cardStyles.propertyValue}>
            {Array.from(activeProperties)
              .find(prop => ["Light", "Heavy"].includes(prop))}
          </span>
        </div>
        <div style={cardStyles.property}>
          <span style={cardStyles.propertyLabel}>Paradigm</span>
          <span style={cardStyles.propertyValue}>
            {Array.from(activeProperties)
              .find(prop => ["Honorable", "Infamous"].includes(prop))}
          </span>
        </div>
      </div>

      {/* Combined Abilities Section */}
      <div style={cardStyles.wording}>
        <div style={cardStyles.propertyLabel}>Combined Abilities</div>
        {maneuvers.map((m, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {m.maneuver_name}:
            </div>
            <div>
              {m.ability}
            </div>
          </div>
        ))}
      </div>

      {/* Description Section */}
      <div style={{
        ...cardStyles.wording,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <div style={cardStyles.propertyLabel}>Description</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="(Optional)"
          style={{
            cursor: 'text',
            backgroundColor: '#252525',
            color: 'white',
            border: "1px solid #333",
            borderRadius: "4px",
            padding: "6px",
            margin: "8px 0",
            resize: 'vertical',
            fontSize: "12px",
            width: '90%',
            minWidth: "100px",
            minHeight: "60px"
          }}
        />
      </div>

      {/* Buttons Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        gap: '2vh',
      }}>
        <button
          style={techniqueMessageStyles.button}
          onClick={handleAddToDeck}
        >
          Add to Deck
        </button>
        <button
          style={techniqueMessageStyles.button}
          onClick={() => setTechnique(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TechCard;