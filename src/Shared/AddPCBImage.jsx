import React, { useState, useRef, useEffect } from 'react';

const AddPCBImage = ({ image, onImageUpload }) => {
    const [uploadImage, setUploadImage] = useState(false);
    const [pcbImage, setPcbImage] = useState();

    const handleImageChange = (event) => {
        const input = event.target;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // fixed width
                    const fixedWidth = 400;
                    const aspectRatio = img.height / img.width;
                    const fixedHeight = fixedWidth * aspectRatio;

                    canvas.width = fixedWidth;
                    canvas.height = fixedHeight;
                    ctx.drawImage(img, 0, 0, fixedWidth, fixedHeight);

                    const base64 = canvas.toDataURL('image/jpeg', 0.8);

                    // console.log(base64);
                    setPcbImage(base64);
                    onImageUpload(image, base64);
                };
            };

            reader.readAsDataURL(file);
        }
    };

    //#region capture image
    const [startVideo, setStartVideo] = useState(false);
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState(false);
    const [stream, setStream] = useState(null);

    // List of available cameras
    const [cameras, setCameras] = useState([]);
    const [selectedCamera, setSelectedCamera] = useState(null);

    // Get a list of available cameras
    useEffect(() => {
        const getCameras = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            setCameras(videoDevices);
            if (videoDevices.length > 0) {
                setSelectedCamera(videoDevices[0].deviceId); //Select the first camera by default.
            }
        };
        getCameras();
    }, []);

    // Turn on the specified camera
    const startCamera = async () => {
        try {
            const constraints = {
                video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined }
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStream(stream);
        } catch (err) {
            console.error('Error accessing the camera:', err);
        }
    };

    // Turn off the camera
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    // takePhoto
    const takePhoto = () => {
        const video = videoRef.current;
        const photo = photoRef.current;

        if (!photo) {
            console.error('Canvas element is not available.');
            return;
        }

        const ctx = photo.getContext('2d');
        photo.width = video.videoWidth;
        photo.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, photo.width, photo.height);

        const base64Url = photo.toDataURL('image/jpeg');
        setPcbImage(base64Url);
        setHasPhoto(true);
        onImageUpload(image, base64Url);
        stopCamera();
    };


    useEffect(() => {
        if (startVideo) {
            startCamera();
        }

        return () => {
            stopCamera();
        };
    }, [startVideo, selectedCamera]);
    //#endregion

    return (
        <div className='bg-second dark:bg-second-dark p-2 sm:p-4 w-full sm:w-fit flex flex-col gap-2 fixed_direction'>
            <div className='w-full sm:w-[400px] h-[500px] bg-black dark:bg-white'>
                {uploadImage ? (
                    <img src={pcbImage} alt="Uploaded PCB" className='' loading="lazy"/>
                ) : (
                    <div className='bg-black dark:bg-white w-full h-full'>
                        {startVideo && (
                            <div>
                                <video
                                    ref={videoRef}
                                    style={{ width: '100%', maxWidth: '500px', display: hasPhoto ? 'none' : 'block' }}
                                ></video>
                                <canvas
                                    ref={photoRef}
                                    style={{ display: 'none', width: '100%', maxWidth: '500px' }}
                                ></canvas>
                                {hasPhoto && (
                                    <div>
                                        <img
                                            src={pcbImage}
                                            alt="Captured"
                                            style={{ width: '100%', maxWidth: '500px' }}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className={`flex items-center  ${startVideo ? 'justify-center' : 'justify-between'}`}>
                {!uploadImage && !startVideo && (
                    <div
                        onClick={() => setStartVideo(true)}
                        className={`relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100 ${startVideo ? 'hidden' : 'visible'}`}
                    >
                        <svg fill="#000000" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 74.207 74.207" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path> <path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path> </g> </g></svg>
                    </div>
                )}
                {startVideo && (
                    <>
                        <button type='button' onClick={takePhoto} className='relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100'>
                            <svg fill="#000000" width="40px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 74.207 74.207" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M57.746,14.658h-2.757l-1.021-3.363c-0.965-3.178-3.844-5.313-7.164-5.313H28.801c-3.321,0-6.201,2.135-7.165,5.313 l-1.021,3.363h-4.153C7.385,14.658,0,22.043,0,31.121v20.642c0,9.077,7.385,16.462,16.462,16.462h41.283 c9.077,0,16.462-7.385,16.462-16.462V31.121C74.208,22.043,66.823,14.658,57.746,14.658z M68.208,51.762 c0,5.769-4.693,10.462-10.462,10.462H16.462C10.693,62.223,6,57.53,6,51.762V31.121c0-5.769,4.693-10.462,10.462-10.462h8.603 l2.313-7.621c0.192-0.631,0.764-1.055,1.423-1.055h18.003c0.659,0,1.23,0.424,1.423,1.057l2.314,7.619h7.204 c5.769,0,10.462,4.693,10.462,10.462L68.208,51.762L68.208,51.762z"></path> <path d="M37.228,25.406c-8.844,0-16.04,7.195-16.04,16.04c0,8.844,7.195,16.039,16.04,16.039s16.041-7.195,16.041-16.039 C53.269,32.601,46.073,25.406,37.228,25.406z M37.228,51.486c-5.536,0-10.04-4.504-10.04-10.039c0-5.536,4.504-10.04,10.04-10.04 c5.537,0,10.041,4.504,10.041,10.04C47.269,46.982,42.765,51.486,37.228,51.486z"></path> </g> </g></svg>

                        </button>
                        <select
                            value={selectedCamera}
                            onChange={(e) => setSelectedCamera(e.target.value)}
                            className='ml-2 p-2 bg-second dark:bg-second-dark text-black text-[12px] dark:text-black rounded'
                        >
                            {cameras.map((camera) => (
                                <option key={camera.deviceId} value={camera.deviceId}>
                                    {camera.label || `Camera ${camera.deviceId}`}
                                </option>
                            ))}
                        </select>
                    </>
                )}
                {!startVideo && (
                    <div className='relative p-3 bg-second dark:bg-second-dark rounded-full scale-[.8] sm:scale-100'>
                        <svg viewBox="0 0 24 24" fill="none" width="40px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path> </g></svg>
                        <input
                            type='file'
                            accept='image/*'
                            name={image}
                            onClick={() => setUploadImage(true)}
                            onChange={handleImageChange}
                            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddPCBImage;