import React, { useState, useEffect } from 'react';
import SignaturePad from 'react-signature-canvas';
import '../styles/signature.css';

const Signature = () => {
    const [sign, setSign] = useState(null);


    function adjustSizes() {
        const canvas = document.querySelector(".sigCanvas canvas");
        const canvasContainer = document.querySelector(".sigCanvas");

        const div = document.querySelector(".divcanvas");
        const divContainer = document.querySelector(".divcanvas");

        if (canvas && canvasContainer) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvasContainer.offsetWidth * ratio;
            canvas.height = canvasContainer.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
        }

        if (div && divContainer) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            div.style.width = divContainer.offsetWidth * ratio + "px";
        }
    }

    // Save the signature

    function saveSignature() {
        if (sign.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            const data = sign.toDataURL();
            console.log(data);
            alert("Signature saved successfully.");
        }
    }


    function newCanvas() {
        sign.clear();
    }
    

    useEffect(() => {
        adjustSizes();

        window.addEventListener("resize", adjustSizes);

        return () => {
            window.removeEventListener("resize", adjustSizes);
        };
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h1>Signature Pad</h1>
            <div style={{ border: "2px solid black", width: "30%", display: 'flex', justifyContent: 'center' }} className='divcanvas'>
                <SignaturePad
                    canvasProps={{ width: 400, height: 200, className: 'sigCanvas' }}
                    ref={(data) => setSign(data)}
                />
            </div>
            <br />
            <button onClick={() => { sign.clear() }}> Clear </button>
            <button onClick = {saveSignature} >Click to Save your sign</button>
            <button onClick = {newCanvas}>New canvas</button>
        </div>
    );
};

export default Signature;
