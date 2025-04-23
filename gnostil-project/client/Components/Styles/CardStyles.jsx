export const cardStyles = {
    container: {
        position: 'absolute',
        left: '50%',
        top: '40%',
        height: '33vw',  // Match Compendium height
        width: '30vw',   // Adjusted for better aspect ratio
        transform: "translate(-50%, -50%)",
        backgroundColor: '#1a1a1a',
        borderRadius: '15px',
        color: 'white',
        boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        padding: '15px',
        overflow: 'hidden', // Prevent content overflow
    },
    header: {
        borderBottom: '2px solid #333',
        paddingBottom: '10px',
        flex: '0 0 auto', // Prevent header from shrinking
    },
    title: {
        fontSize: '1.5vw',
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    subtitle: {
        fontSize: '1vw',
        color: '#888',
    },
    section: {
        marginBottom: '10px',
        flex: '1 1 auto', // Allow sections to grow and shrink
    },
    propertyGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        padding: '8px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '0.9vw',
    },
    property: {
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
    },
    propertyLabel: {
        fontSize: '0.8vw',
        color: '#888',
    },
    propertyValue: {
        fontSize: '0.9vw',
        color: '#fff',
    },
    wording: {
        padding: '10px',
        backgroundColor: '#252525',
        borderRadius: '8px',
        fontSize: '0.9vw',
        lineHeight: '1.4',
        maxHeight: '100%',
        overflow: 'auto', // Add scrolling if content is too long
    },
};