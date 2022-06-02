import ChefMenuDetail from 'src/screens/Home/ChefMenuDetail';
import ChefProfile from 'src/screens/Home/ChefProfile';
import Home from 'src/screens/Home/Home';

export const HomeRoutes = {
  HOME: {
    name: 'HOME',
    displayName: 'Home',
    component: Home,
  },
  CHEF_PROFILE: {
    name: 'CHEF_PROFILE',
    displayName: 'ChefProfile',
    component: ChefProfile,
  },
  CHEF_MENU_DETAIL: {
    name: 'CHEF_MENU_DETAIL',
    displayName: 'ChefMenuDetail',
    component: ChefMenuDetail,
  },
};
