// navigation.d.ts

import {LoginNavigationRoutes} from 'src/navigation/NavigationTypes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends LoginNavigationRoutes {}
  }
}
