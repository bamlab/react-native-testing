export enum LoadingActionTypes {
  SHOW_LOADER = 'LOADER/SHOW',
  HIDE_LOADER = 'LOADER/HIDE',
}

export enum LoaderName {
  Movies = 'Movies',
}

export type TLoadingState = {[name in LoaderName]?: boolean};

export interface ILoadingProps {
  isLoading?: boolean;
}
