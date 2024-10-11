import UploadSvg from "../Svg/Upload";
import Uploadsvg2 from '../../../public/camera.png'
import style_form from "../Client/Form/form.module.css";
import CustomButton from "../../Components/Client/Button2/button";
import ImageUploading, { ImageType } from "react-images-uploading";
import { useEffect, useState } from "react"; 
import { storage, db } from "../../../server/configs/firebase"; // Firebase depolamayı içe aktarın
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Gerekli Firebase depolama fonksiyonlarını içe aktarın
import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore"; // Firestore fonksiyonlarını içe aktarın
import Image from "next/image";

interface UploadImageProps {
    setImageList: (images: any) => void;
    IMG?: string; // IMG prop'u artık string veya undefined olabilir
    userPage: boolean;
  }

 const UploadImage: React.FC<UploadImageProps>=({ setImageList, IMG = undefined, userPage = false }) => {
    const [images, setImages] = useState<ImageType[]>([]);
    const [fileToUpload, setFileToUpload] = useState<File | null>(null); // Yüklenecek dosya için state ekleyin
    const [downloadURL, setDownloadURL] = useState(''); // İndirme URL'sini saklamak için state ekleyin
    const maxNumber = 1;

    useEffect(() => {
        fetchLatestImage();
    }, []);

    const fetchLatestImage = async () => {
        const q = query(collection(db, "images"), orderBy("timestamp", "desc"), limit(1));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setDownloadURL(doc.data().url);
        });
    };

    const onChange = (imageList: ImageType[], addUpdateIndex?: number[]) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
        setImageList(imageList);
    
        if (imageList.length > 0) {
          setFileToUpload(imageList[0].file || null);
        }
      };

    const uploadImageToFirebase = async () => {
        if (!fileToUpload) return;
        const storageRef = ref(storage, `images/${fileToUpload.name}`);
        try {
            await uploadBytes(storageRef, fileToUpload);
            const url = await getDownloadURL(storageRef);
            setDownloadURL(url);
            console.log('Dosya şu adreste mevcut:', url);
            await addDoc(collection(db, "images"), {
                url: url,
                timestamp: new Date(),
            });
        } catch (error) {
            console.error('Yükleme başarısız', error);
        }
    };

    return (
        <ImageUploading
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            
        >
            {({
                  imageList,
                  onImageUpload,
                  onImageUpdate,
                  onImageRemove,
                  isDragging,
                  dragProps,
              }) => (
              
                <div className="upload__image-wrapper">
                    <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        {images.length === 0 &&
                        <>
                            <Image src={Uploadsvg2}  width={40} alt="upload" />
                          
                        </>}

                    </button>


                    <div className=" flex mt-12 gap-9">

                  
                    {imageList.map((image, index) => (
                        <div key={index} className={`${style_form.image_item} image-item`}>
                            <div className={`${style_form.image_item__btn_wrapper} image-item__btn-wrapper flex flex-row`}>
                                <CustomButton   className=" mt-9 w-28 h-11 rounded-full" icon={false} onAction={() => onImageRemove(index)} title='Cancel' color={'2'} type={'button'} size={'xs'} />
                                {/* <CustomButton className=" mt-9" icon={false} onAction={() => onImageUpdate(index)} title='Güncelle' color={'1'} type={'button'} size={'xs'} /> */}
                            </div>
                        </div>
                    ))}


                    {fileToUpload && (
                        <div className="flex flex-row">
                            <CustomButton 
                            className=" mt-9 h-11  w-28 rounded-full"
                                icon={false} 
                                onAction={uploadImageToFirebase} 
                                title='Save' 
                                color={'1'} 
                                type={'button'} 
                                size={'sm'} 
                            />
                        </div>
                    )}

</div>
                    {downloadURL && (
                        <div className="flex flex-row">
    
                        </div>
                    )}
                </div>
            )}
        </ImageUploading>
    )
}

export default UploadImage