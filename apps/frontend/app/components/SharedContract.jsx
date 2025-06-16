import React from "react";

const SharedContract = ({ file }) => {
    const handleShare = () => {
        const subject = encodeURIComponent("Te comparto un contrato");
        const body = encodeURIComponent(
            `Hola,\n\nTe comparto este contrato:\n\n${file.webViewLink}`
        );
        window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`,
            "_blank"
        );
    };

    return (
        <button className="boton-compartir" onClick={handleShare}>
            Compartir
        </button>
    );
};

export default SharedContract;