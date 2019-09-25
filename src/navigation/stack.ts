import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Home} from '../pages/Home/Home';
import {About} from '../pages/About/About';
import {Routes} from './routes';
import {Subscription} from '../pages/Subscription/Subscription';
import {TodoList} from '../pages/TodoList/TodoList';

const stackNav = createStackNavigator({
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
});

export const AppContainer = createAppContainer(stackNav);
