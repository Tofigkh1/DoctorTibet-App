import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearUser } from "../../../Redux/Featuries/User/userSlice";
import { useResize } from "../../../Hooks/useResize";
import styless from './navMedicine.module.css';
import { RootState } from "../../../Redux/Store/store"; // Import RootState

export default function NavMedicine() {
    const { push, pathname } = useRouter();
    const { isMobile } = useResize();
    const [accessToken, setAccessToken] = useState<string | null>(null); // Specify string | null type
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user); // Specify the RootState type
    const router = useRouter();
    const { id } = router.query;

    const isActive = (p: string) => {
        if (p.includes("[id]")) {
            return pathname.startsWith("/medicines/") ? "active" : "noactive";
        }
        return pathname === p ? "active" : "noactive";
    };

    useEffect(() => {
        const token = localStorage.getItem('user_info');
        setAccessToken(token); // Now token can be set since accessToken allows string | null
    }, [user]);

    return (
        <>
            <nav className={styless.nav_box}>
                <div className="flex gap-5">
                    <button 
                        onClick={() => push(`/medicines/${id}`)} 
                        className={`${styless.button} ${styless[isActive("/medicines/[id]")]}`}>
                        Buy Medicine
                    </button>
                    <button 
                        onClick={() => push('/contact-us')} 
                        className={`${styless.button} ${styless[isActive("/contact-us")]}`}>
                        Contact
                    </button>
                </div>
            </nav>
        </>
    );
}
