import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Home } from '../pages/Home/Home';
import { About } from '../pages/About/About';
import { Routes } from './routes';
import { Subscription } from '../pages/Subscription/Subscription';
import { TodoList } from '../pages/TodoList/TodoList';
import { Movies } from '../pages/Movies/Movies';
import { DisabledButton } from '../pages/DisabledButton/DisabledButton';

const routes = {
  [Routes.Home]: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
    },
  },
  [Routes.About]: {
    screen: About,
    navigationOptions: {
      title: 'About',
    },
  },
  [Routes.Subscription]: {
    screen: Subscription,
    navigationOptions: {
      title: 'Subscription',
    },
  },
  [Routes.TodoList]: {
    screen: TodoList,
    navigationOptions: {
      title: 'TodoList',
    },
  },
  [Routes.Movies]: {
    screen: Movies,
    navigationOptions: {
      title: 'Movies',
    },
  },
  [Routes.DisabledButton]: {
    screen: DisabledButton,
    navigationOptions: {
      title: 'DisabledButton',
    },
  },
};

export const createAppContainerWithInitialRoute = (initialRouteName: string) =>
  createAppContainer(createStackNavigator(routes, { initialRouteName }));

export const AppContainer = createAppContainerWithInitialRoute(Routes.Home);
