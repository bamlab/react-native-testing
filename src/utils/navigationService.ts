import { NavigationActions } from 'react-navigation';
import { NavigationContainerComponent } from 'react-navigation';

let _navigator: NavigationContainerComponent | null;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent | null) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: object) {
  _navigator &&
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
}

function goBack() {
  _navigator && _navigator.dispatch(NavigationActions.back({ key: null }));
}

function setParams(key: string, params?: object) {
  _navigator &&
    _navigator.dispatch(
      NavigationActions.setParams({
        params,
        key,
      })
    );
}

export default {
  navigate,
  setParams,
  goBack,
  setTopLevelNavigator,
};
