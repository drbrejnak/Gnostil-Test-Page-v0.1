export const tableStyles = {
    table: {
      width: "100%",
      borderCollapse: "collapse",
      color: "white",
      backgroundColor: "#1a1a1a",
    },
    tableHeader: {
      position: "sticky",
      top: 0,
      backgroundColor: "#252525",
      zIndex: 1,
    },
    headerCell: {
      padding: "8px",
      borderBottom: "2px solid #333",
      fontSize: "13px",
      whiteSpace: "nowrap", // Prevent header text wrapping
    },
    headerButton: {
      background: "none",
      border: "none",
      fontSize: "13px",
      fontWeight: "bold",
      cursor: "pointer",
      padding: "4px",
      width: "100%",
      textAlign: "center",
      color: "white",
    },
    row: {
      transition: "background-color 0.2s ease",
      cursor: "grab",
      "&:hover": {
        backgroundColor: "#252525",
      },
    },
    cell: {
      padding: "6px 8px",
      borderBottom: "1px solid #333",
      fontSize: "12px",
      whiteSpace: "nowrap", // Prevent cell content wrapping
    },
    container: {
      position: "relative", // Add this to make it the positioning context
      backgroundColor: "#1a1a1a",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      minWidth: 0, // Allow container to shrink
      maxWidth: "100%", // Prevent container from exceeding parent width
    },
    tableContainer: {
      position: "relative",
      overflow: "auto",
      scrollbarColor: "#333 #1a1a1a",
      flex: 1,
      width: "100%",
      minWidth: 0, // Allow container to shrink
      maxWidth: "100%", // Prevent container from exceeding parent width
      "&::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#1a1a1a",
        borderRadius: "4px",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#333",
        borderRadius: "4px",
      },
      "& table": {
        flex: "1 1 auto",
        margin: 0,
      }
    },
    filters: {
      padding: "15px",
      backgroundColor: "#252525",
      borderBottom: "1px solid #333",
      overflow: "hidden",
    },
    filterContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "8px",
      padding: "8px 0 0",
      width: "100%",
    },
    select: {
      backgroundColor: "#1a1a1a",
      color: "white",
      border: "1px solid #333",
      borderRadius: "4px",
      padding: "6px",
      margin: "0",
      cursor: "pointer",
      fontSize: "12px",
      width: "100%",
      minWidth: "100px",
    },
    searchInput: {
      backgroundColor: "#1a1a1a",
      color: "white",
      border: "1px solid #333",
      borderRadius: "4px",
      padding: "6px",
      width: "calc(100% - 12px)",
      fontSize: "12px",
      boxSizing: "border-box",
      marginBottom: "8px",
    },
    button: {
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "6px 10px",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
      fontSize: "12px",
      "&:hover": {
        backgroundColor: "#444",
      },
    },
  };