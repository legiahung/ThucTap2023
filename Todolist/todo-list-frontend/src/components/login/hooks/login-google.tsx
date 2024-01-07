import {AxiosResponse} from 'axios';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

import useLoginHandler from '@/components/login/hooks/login-handler';
import {ROUTES} from '@/configs/routes.config';
import api from '@/data/api';
import {IAuthLogin, IAuthResponse} from '@/data/api/types/auth.type';
import {initFirebase} from '@/lib/firebase/initFirebase';

initFirebase();
const fireAuth = getAuth();

export default function useLoginGoogle() {
  const router = useRouter();
  const {loginSuccess} = useLoginHandler();

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });

  const signInWithGoogle = () => signInWithPopup(fireAuth, googleProvider);

  const onLoginSuccess = ({data: {accessToken, user}}: AxiosResponse<IAuthResponse, any>) =>
    loginSuccess({accessToken, user});

  const loginWithGmail = ({email, name}: IAuthLogin) => {
    if (router.asPath === ROUTES.LOGIN) {
      api.auth
        .login({email, name})
        .then(res => onLoginSuccess(res))
        .catch(() => {});
    } else {
      if (email) {
        api.todolist
          .sync({email, name})
          .then(res => onLoginSuccess(res))
          .catch(() => {});
      }
    }
  };

  const openGooglePopUp = () => {
    signInWithGoogle()
      .then(() => {})
      .catch(() => {});
    fireAuth.beforeAuthStateChanged(user => {
      if (user?.email && user?.displayName) loginWithGmail({name: user.displayName, email: user.email});
    });
  };

  useEffect(() => {
    initFirebase();
  }, []);

  return {openGooglePopUp};
}
