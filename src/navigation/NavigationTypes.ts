import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  StackNavigationOptions,
  TransitionSpecs,
} from '@react-navigation/stack';

// satisfy typescript needs
export const getKeyValue = (key: string) => (obj: Record<string, any>) =>
  obj[key];

export type LoginNavigationRoutes = {
  GET_STARTED: undefined;
  SIGN_UP: undefined;
  ENTER_OTP: {
    confirm: FirebaseAuthTypes.ConfirmationResult;
    sign_up?: {
      notInDB: boolean;
      userInformation: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
      };
    };
  };
  SET_PASSWORD: {email: string};
  ALLERGIES: undefined;
  CUISINES: {allergies: string[]};
  SIGN_IN: undefined;
};

export type LoginRoutesNames = {
  GET_STARTED: 'GET_STARTED';
  SIGN_UP: 'SIGN_UP';
  ENTER_OTP: 'ENTER_OTP';
  SET_PASSWORD: 'SET_PASSWORD';
  ALLERGIES: 'ALLERGIES';
  CUISINES: 'CUISINES';
  SIGN_IN: 'SIGN_IN';
};

// vertical navigation
export const verticalAnimation: StackNavigationOptions = {
  gestureDirection: 'vertical',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerShown: false,
  headerStyleInterpolator: HeaderStyleInterpolators.forSlideUp,
  cardStyleInterpolator: ({current, layouts}: StackCardInterpolationProps) => {
    return {
      cardStyle: {
        transform: [
          {
            translateY: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.height, 0],
            }),
          },
        ],
      },
    };
  },
};
