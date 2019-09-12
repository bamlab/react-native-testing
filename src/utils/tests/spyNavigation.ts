import navigationService from '../navigationService';

export const spyNavigateService = jest.spyOn(navigationService, 'navigate');
export const spyGoBackService = jest.spyOn(navigationService, 'goBack');
