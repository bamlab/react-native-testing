import { renderWithNavigation } from '../../../utils/tests/helpers';
import { Routes } from '../../../navigation/routes';
import { fireEvent, waitForElement } from 'react-native-testing-library';
import { wording } from '../../../utils/wording';

describe('[Page] Home', () => {
  it('should navigate to about page without any trouble', async () => {
    const page = renderWithNavigation(Routes.Home);
    const AboutButton = page.getByText('About');
    fireEvent.press(AboutButton);
    const AboutTitle = await waitForElement(() => page.queryByText(wording.aboutTitle));
    expect(AboutTitle).toBeDefined();
  });
});
