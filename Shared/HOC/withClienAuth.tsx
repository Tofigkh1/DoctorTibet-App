import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../server/configs/firebase';
import Loading from '../Components/Loading/Loading';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store/store';

// WrappedComponent'in türünü fonksiyonel bileşenlere uygun hale getiriyoruz.
const withClientAuth = (WrappedComponent: React.ComponentType) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
      if (localStorage.getItem("user_info")) return;

      let { email } = user;
      console.log(email, user);
      
      if (email.length === 0) {
        router.replace('/login-register');
      } else {
        setLoading(false);
      }
    }, [router, user]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withClientAuth;
