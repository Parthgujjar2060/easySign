import React, { useState, useEffect } from 'react';
import SignaturePad from 'react-signature-canvas';
import '../styles/signature.css';

const Signature = () => {
    const [sign, setSign] = useState(null);
    const [color, setColor] = useState('black');
    const colors = ['Black', 'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Grey'];


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
        <div className='main-container'>
            <h1>Signature Pad <i class="fa-solid fa-signature"></i><i class="fa-solid fa-pencil"></i></h1>
            <div className='divcanvas'>
                <SignaturePad
                    penColor={color}
                    canvasProps={{ width: 650, height: 250, className: 'sigCanvas' }}
                    ref={(data) => setSign(data)}
                />

                <div className='btn-container'>
                    <select onChange={(e) => setColor(e.target.value)} value={color}>
                        {colors.map((color, index) => (
                            <option key={index} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>

                    <button onClick={() => { sign.clear() }}> Clear <i class="fa-solid fa-trash"></i></button>
                    <button onClick={saveSignature} > Save <i class="fa-solid fa-download"></i></button>
                    <button onClick={newCanvas}> New canvas <i class="fa-solid fa-pencil"></i></button>
                </div>
            </div>
            <br />

        </div>
    );
};

export default Signature;
