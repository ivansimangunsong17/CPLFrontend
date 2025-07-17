import React from "react";
import { ClipLoader } from "react-spinners";

const LoadingScreen = ({ text }) => {
    return (
        <div style={styles.overlay} aria-busy="true">
            <div style={styles.box}>
                <ClipLoader size={50} color="#2563eb" />
                {text && <p style={styles.text}>{text}</p>}
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        backdropFilter: "blur(2px)",
    },
    text: {
        marginTop: "1rem",
        color: "#374151",
        fontSize: "1rem",
        fontWeight: "500",
    },
};

export default LoadingScreen;
