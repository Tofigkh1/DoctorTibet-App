import PlusSvg from "../../../../public/camera.png";
import styles from './button.module.css';
import { Spinner } from '@chakra-ui/react';

interface CustomButtonProps {
    title?: any;
    size?: any;
    onAction?: any;
    type?: any;
    color?: any;
    icon?: any;
    innerText?: any;
    className?: any;
    loading?: boolean;
}

export default function CustomButton({
    title,
    size,
    onAction,
    type,
    color,
    icon,
    innerText,
    className,
    loading
}: CustomButtonProps) {
    let type_color = color === '1' ? 'type_submit' : 'type_cancel';

    return (
        <>
            <button
                type={type}
                onClick={onAction}
                className={`${styles[size]} ${className} ${styles.btn} ${styles[type_color]}`}
                disabled={loading}
            >
                {icon && <img src={PlusSvg.src} alt="icon" />} {/* PlusSvg as an img */}
                <span>{loading && <Spinner size="sm" />} {innerText} {title}</span>
            </button>
        </>
    );
}
