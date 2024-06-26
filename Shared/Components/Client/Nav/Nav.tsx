import { useRouter } from 'next/router'
import styless from './Nav.module.css'
import {useResize} from "../../../Hooks/useResize";
import { useEffect, useState } from 'react';

export default function Nav() {
    let {push, pathname} = useRouter();
    let {isMobile} = useResize();

    const [accessToken, setAccesToken] = useState(null);
}