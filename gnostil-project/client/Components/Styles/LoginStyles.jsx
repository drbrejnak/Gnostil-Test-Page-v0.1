export const loginStyles = {
    loginOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.3)",     // More transparent background
        backdropFilter: "blur(12px)",              // Increased blur for glassmorphism
        WebkitBackdropFilter: "blur(12px)",        // Safari support
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    loginContainer: {
        backgroundColor: "rgba(26, 26, 26, 0.7)",  // More transparent container
        borderRadius: "12px",                      // Smoother corners
        boxShadow: `
            0 4px 24px -1px rgba(0, 0, 0, 0.3),
            0 0 1px 0 rgba(255, 255, 255, 0.1) inset,
            0 0 8px 0 rgba(255, 255, 255, 0.05)
        `,                                         // Multi-layered shadow for depth
        padding: "30px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backdropFilter: "blur(8px)",              // Container blur
        WebkitBackdropFilter: "blur(8px)",        // Safari support
        border: "1px solid rgba(255, 255, 255, 0.1)", // Subtle border
    },
    loginForm: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    loginInput: {
        backgroundColor: "rgba(37, 37, 37, 0.7)", // More transparent inputs
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "6px",
        padding: "10px 14px",
        fontSize: "14px",
        width: "100%",
        boxSizing: "border-box",
        backdropFilter: "blur(4px)",             // Input field blur
        WebkitBackdropFilter: "blur(4px)",       // Safari support
        transition: "all 0.2s ease",
        "&:focus": {
            outline: "none",
            borderColor: "rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgba(37, 37, 37, 0.9)",
        },
        "&::placeholder": {
            color: "rgba(255, 255, 255, 0.5)",
        },
    },
    loginButton: {
        backgroundColor: "rgba(51, 51, 51, 0.9)",
        color: "white",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "6px",
        height: "32px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        "&:hover:not(:disabled)": {
            backgroundColor: "rgba(68, 68, 68, 0.9)",
            transform: "translateY(-1px)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        },
        "&:disabled": {
            backgroundColor: "rgba(26, 26, 26, 0.5)",
            color: "rgba(255, 255, 255, 0.3)",
            cursor: "not-allowed",
        },
    },
    loginButtonContainer: {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'row', // Changed from column
        alignItems: 'center', // Changed from flex-end
        gap: '10px', // Added gap for spacing
    },
    logoutButton: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        color: "rgba(51, 51, 51, 0.9)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "6px",
        height: "32px",
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: "500",
        transition: "all 0.2s ease",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        '&:hover': {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            transform: 'translateY(-1px)',
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
        }
    },
}