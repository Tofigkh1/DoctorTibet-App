import UploadSvg from "../../../../public/camera.png";
import style_form from "../Form/form.module.css";
import CustomButton from "../downloadButton";
import ImageUploading, { ImageListType } from "react-images-uploading"; // import ImageListType
import { useEffect, useState } from "react"; 

interface DownloadImageProps {
    setImageList: (imageList: ImageListType) => void; // Define setImageList type
    IMG?: string | undefined;
    uerPage?: boolean;
}

export default function DownloadImage({
    setImageList,
    IMG = undefined,
    uerPage = false
}: DownloadImageProps) {
    const [images, setImages] = useState<ImageListType>([]); // Set the type of 'images'
    const maxNumber = 1;

    useEffect(() => {
        if (IMG) {
            setImages([{ data_url: IMG }]); // Set images properly if IMG is provided
        }
    }, [IMG]);

    const onChange = (imageList: ImageListType) => {
        // data for submit
        console.log(imageList);
        setImages(imageList);
        setImageList(imageList); // Call setImageList with proper imageList type
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
                        {images.length === 0 && (
                            <>
                                <img src={UploadSvg.src} alt="upload" style={{ color: uerPage ? "#6FCF97" : "#EC5CF8" }} />
                                <span>upload</span>
                            </>
                        )}
                    </button>
                    {imageList.map((image, index) => (
                        <div key={index} className={`${style_form.image_item} image-item`}>
                            <img src={IMG ? IMG : image['data_url']} alt="" width="100" />
                            <div className={`${style_form.image_item__btn_wrapper} image-item__btn-wrapper flex flex-row`}>
                                <CustomButton
                                    icon={false}
                                    onAction={() => onImageRemove(index)}
                                    title="Remove"
                                    color="2"
                                    type="button"
                                    size="xs"
                                />
                                <CustomButton
                                    icon={false}
                                    onAction={() => onImageUpdate(index)}
                                    title="Update"
                                    color="1"
                                    type="button"
                                    size="xs"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </ImageUploading>
    );
}
