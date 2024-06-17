import React, { useState, useEffect, useRef } from 'react';
import SignaturePad from 'react-signature-canvas';
import '../styles/signature.css';

const Signature = () => {
    const [sign, setSign] = useState(null);
    const [color, setColor] = useState('black');
    const [documentType, setDocumentType] = useState('jpg');
    const canvasRef = useRef(null);
    const colors = ['Black', 'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Grey'];
    const documentForm = ['jpg', 'pdf', 'svg'];

    const adjustSizes = () => {
        const canvas = canvasRef.current.querySelector("canvas");
        const canvasContainer = canvasRef.current;

        if (canvas && canvasContainer) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvasContainer.offsetWidth * ratio;
            canvas.height = canvasContainer.offsetHeight * ratio;
            canvas.getContext("2d").scale(ratio, ratio);
        }
    };

    const jpgFunction = () => {
        const data = sign.toDataURL("image/jpeg");
        console.log(data);
    };
    const pdfFunction = () => {
        const data = sign.toDataURL("image/pdf");
        console.log(data);
    }
    const svgFunction = () => {
        const data = sign.toDataURL("image/svg+xml");
        console.log(data);
    }

    const saveSignature = () => {
        if (sign.isEmpty()) {
            alert("Please provide a signature first.");
        } else {
            const data = sign.toDataURL();
            console.log(data);
            alert("Signature saved successfully.");
        }
    };

    const newCanvas = () => {
        sign.clear();
    };

    useEffect(() => {
        adjustSizes();

        window.addEventListener("resize", adjustSizes);

        return () => {
            window.removeEventListener("resize", adjustSizes);
        };
    }, []);

    return (
        <div className='main-container'>
            <h1>Signature Pad <i className="fa-solid fa-signature"></i><i className="fa-solid fa-pencil"></i></h1>
            <div className='divcanvas' ref={canvasRef}>
                <SignaturePad
                    penColor={color}
                    canvasProps={{ className: 'sigCanvas' }}
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
                    <select onChange={(e) => setDocumentType(e.target.value)} value={documentType}>
                        {documentForm.map((document, index) => (
                            <option key={index} value={document}>
                                {document}
                            </option>
                        ))}
                    </select>
                    <button onClick={() => { sign.clear() }}>Clear <i className="fa-solid fa-trash"></i></button>
                    <button onClick={saveSignature}>Save <i className="fa-solid fa-download"></i></button>
                    <button onClick={newCanvas}>New Canvas <i className="fa-solid fa-pencil"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Signature;
