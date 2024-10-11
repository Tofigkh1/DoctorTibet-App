import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodePage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const url = 'https://youtube-clone-pre.vercel.app/';
    if (canvasRef.current) {
      const options = {
        width: 115,
        height: 115,
        // color: {
        //   dark: '#26d6a1',
        //   light: '#FFFFFF' 
        // }
      };
      QRCode.toCanvas(canvasRef.current, url, options, function (error: Error | null) {
        if (error) {
          console.error(error);
        } else {
          console.log('QR Code generated successfully');
        }
      });
    }
  }, []);

  return (
    <div className='ml-5'>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default QRCodePage;
