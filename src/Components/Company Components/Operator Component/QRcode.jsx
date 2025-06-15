import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRcode = ({ SN, onSNUpload }) => {
    const [QRCode, setQRCode] = useState('');
    const [QRImage, setQRImage] = useState(null);
    // const [takeQRbyImage, setTakeQRbyImage] = useState(true);

    const handleImageChange = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const imageSrc = e.target.result;
                setQRImage(imageSrc);
                analyzeQRCode(imageSrc);
            };
        }
    };

    const analyzeQRCode = (imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0, img.width, img.height);

            const imageData = ctx.getImageData(0, 0, img.width, img.height);

            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                setQRCode(code.data);
                onSNUpload(SN, code.data);
            } else {
                alert("QR Code not found in the image.");
            }
        };
    };

    const handleInputChange = (event) => {
        setQRCode(event.target.value);
        onSNUpload(SN, event.target.value);
    };

    return (
        <div className='bg-second dark:bg-second-dark p-2.5 w-full flex gap-1 flex-col sm:w-[400px]'>
            <div className={`bg-black dark:bg-white w-full h-52 flex justify-center items-center`}>
                {QRImage ? (
                    <img src={QRImage} className={`bg-white max-w-full max-h-full m-auto`} alt="Uploaded QR Code" />
                ) : (
                    <hr className={`bg-blue-700 w-[50%] h-0.5 m-auto`} />
                )}
            </div>

            <div className={`flex gap-1`}>
                <input
                    type="text"
                    value={QRCode}
                    onChange={handleInputChange}
                    className={`bg-white text-black dark:bg-black dark:text-white p-1.5 outline-0 border-0 w-full`}
                    placeholder="SN-1234-5678-9101"
                />

                <div className='relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100'>
                    <svg viewBox="0 0 24 24" fill="none" width="40px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>

                    <input
                        type='file'
                        accept='image/*'
                        onChange={handleImageChange}
                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                    />
                </div>
            </div>
        </div>
    );
};

export default QRcode;