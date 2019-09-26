import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Home} from '../pages/Home/Home';
import {About} from '../pages/About/About';
import {Routes} from './routes';
import {Subscription} from '../pages/Subscription/Subscription';
import {TodoList} from '../pages/TodoList/TodoList';
import {Movies} from '../pages/Movies/Movies';

const stackNav = createStackNavigator(
  {
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
  },
  {initialRouteName: Routes.Home},
);

export const AppContainer = createAppContainer(stackNav);
