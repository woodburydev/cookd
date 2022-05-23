import Start from '@screens/Login/Start';
import OTP from '@screens/Login/OTP';
import Password from '@screens/Login/Password';
import Signup from '@screens/Login/Signup';
import Allergies from '@screens/Login/Allergies';
import Cuisines from 'src/screens/Login/Cuisines';
import PhoneNumber from 'src/screens/Login/PhoneNumber';
import Email from 'src/screens/Login/Email';
import FoundOut from 'src/screens/Login/FoundOut';
import Browse from 'src/screens/Login/GetStarted/Browse';
import Choose from 'src/screens/Login/GetStarted/Choose';
import Schedule from 'src/screens/Login/GetStarted/Schedule';

export const SignUpRoutes = {
  SIGN_UP: {
    name: 'SIGN_UP',
    component: Signup,
  },
  EMAIL: {
    name: 'EMAIL',
    component: Email,
  },
  SET_PASSWORD: {
    name: 'SET_PASSWORD',
    component: Password,
  },
  FOUND_OUT: {
    name: 'FOUND_OUT',
    component: FoundOut,
  },
  ALLERGIES: {
    name: 'ALLERGIES',
    component: Allergies,
  },
  CUISINES: {
    name: 'CUISINES',
    component: Cuisines,
  },
}

export const GetStartedRoutes = {
  BROWSE: {
    name: 'BROWSE',
    component: Browse,
  },
  CHOOSE: {
    name: 'CHOOSE',
    component: Choose,
  },
  SCHEDULE: {
    name: 'SCHEDULE',
    component: Schedule,
  },
}

export const LoginRoutes = {
  GET_STARTED: {
    name: 'GET_STARTED',
    component: Start,
  },
  PHONE_NUMBER: {
    name: 'PHONE_NUMBER',
    component: PhoneNumber,
  },
  ENTER_OTP: {
    name: 'ENTER_OTP',
    component: OTP,
  },
  ...SignUpRoutes,
  ...GetStartedRoutes
};

