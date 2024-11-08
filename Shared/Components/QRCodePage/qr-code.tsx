import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { useResize } from '../../Hooks/useResize';

const QRCodePage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let { isMobile } = useResize();
  useEffect(() => {
    const url = 'https://www.doctor-tibet.com/';
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

    <div>
   {!isMobile &&
       <div className='ml-5'>
       <canvas ref={canvasRef}></canvas>
     </div>
      }


      {isMobile &&
       <div className=' mt-3 z-50'>
       <canvas ref={canvasRef}></canvas>
     </div>
      }
    </div>
   
  );
};

export default QRCodePage;
