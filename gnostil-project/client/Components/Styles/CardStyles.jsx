export const cardStyles = {
    container: {
        position: 'relative', // Change from absolute to relative
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        padding: '15px',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr 1fr', // Header, Properties, Description, Ability
        gap: '15px',
        height: '100%', // Take full height of parent container
        width: '100%', // Take full width of parent container
        boxSizing: 'border-box',
    },
    header: {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
    },
    title: {
        fontSize: '1.2rem', // Use rem instead of vw
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    subtitle: {
        fontSize: '1rem', // Use rem instead of vw
        color: '#888',
    },
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '12px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '0.9rem', // Use rem instead of vw
        alignSelf: 'stretch',
    },
    property: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    propertyLabel: {
        fontSize: '0.8rem', // Use rem instead of vw
        color: '#888',
    },
    propertyValue: {
        fontSize: '0.9rem', // Use rem instead of vw
        color: '#fff',
    },
    wording: {
        padding: '12px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '0.8rem', // Use rem instead of vw
        overflow: 'auto',
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