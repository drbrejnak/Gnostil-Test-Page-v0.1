export const cardStyles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '40%',
        height: '33vw',
        width: '30vw',
        transform: "translate(-50%, -50%)",
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        padding: '15px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: 'auto 1fr 1fr 1fr', // Header, Properties, Description, Ability
        gap: '15px',
    },
    header: {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
    },
    title: {
        fontSize: '2vw',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    subtitle: {
        fontSize: '1.2vw',
        color: '#888',
    },
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '1.1vw',
        alignSelf: 'stretch', // Fill the grid cell height
    },
    property: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    propertyLabel: {
        fontSize: '1vw',
        color: '#888',
    },
    propertyValue: {
        fontSize: '1.1vw',
        color: '#fff',
    },
    wording: {
        padding: '12px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '1vw',           // Match other font sizes for consistency
        overflow: 'auto',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        scrollbarColor: "#333 #1a1a1a",
        "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
        },
        "&::-webkit-scrollbar-track": {
            background: "#1a1a1a",
            borderRadius: "4px",
            marginBottom: "0",
        },
        "&::-webkit-scrollbar-thumb": {
            background: "#333",
            borderRadius: "4px",
            "&:hover": {
                background: "#444",
            },
        },
    },
};