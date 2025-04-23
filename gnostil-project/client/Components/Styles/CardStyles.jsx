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
        gap: '5px',
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
        gridTemplateColumns: 'repeat(4, 1fr)', // Changed from 2 to 4 columns
        gap: '8px',
        padding: '8px 12px', // Reduced vertical padding
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '0.9rem',
        alignSelf: 'stretch',
        minHeight: 'fit-content', // Ensure it only takes needed space
    },
    property: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px', // Reduced gap
        alignItems: 'center', // Center align content
        textAlign: 'center', // Center align text
    },
    propertyLabel: {
        fontSize: '0.75rem', // Slightly smaller font
        color: '#888',
        textTransform: 'capitalize', // Capitalize property names
    },
    propertyValue: {
        fontSize: '0.85rem', // Slightly smaller font
        color: '#fff',
        fontWeight: '500', // Medium weight for better readability
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