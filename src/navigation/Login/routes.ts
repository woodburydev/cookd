import Start from '@screens/Login/Start';
import OTP from '@screens/Login/OTP';
import Password from '@screens/Login/Password';
import Signup from '@screens/Login/Signup';
import Allergies from '@screens/Login/Allergies';
import Cuisines from 'src/screens/Login/Cuisines';
import Signin from 'src/screens/Login/Signin';

export const LoginRoutes = {
  GET_STARTED: {
    name: 'GET_STARTED',
    component: Start,
  },
  SIGN_UP: {
    name: 'SIGN_UP',
    component: Signup,
  },
  ENTER_OTP: {
    name: 'ENTER_OTP',
    component: OTP,
  },
  SET_PASSWORD: {
    name: 'SET_PASSWORD',
    component: Password,
  },
  ALLERGIES: {
    name: 'ALLERGIES',
    component: Allergies,
  },
  CUISINES: {
    name: 'CUISINES',
    component: Cuisines,
  },
  SIGN_IN: {
    name: 'SIGN_IN',
    component: Signin,
  },
};
