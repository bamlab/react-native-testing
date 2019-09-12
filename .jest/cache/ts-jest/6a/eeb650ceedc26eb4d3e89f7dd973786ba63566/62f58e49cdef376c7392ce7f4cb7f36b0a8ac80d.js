"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_testing_library_1 = require("react-native-testing-library");
const fetch_mock_1 = __importDefault(require("fetch-mock"));
require("jest-styled-components");
const Home_1 = require("../Home");
const helpers_1 = require("../../../utils/tests/helpers");
const config_1 = require("../../../api/config");
const wording_1 = require("../../../utils/wording");
describe('[Page] Home', () => {
    const props = helpers_1.getPropsWithNavigation();
    const mockPostSubscribe = (status) => {
        fetch_mock_1.default.post(config_1.EMAIL_API_ENDPOINT, status);
    };
    beforeEach(() => {
        fetch_mock_1.default.reset();
    });
    it('should display succesful message on successful subscription', async () => {
        // SETUP
        mockPostSubscribe(200);
        const page = helpers_1.renderPage(react_1.default.createElement(Home_1.Home, Object.assign({}, props)));
        // GIVEN
        const EmailInput = page.getByPlaceholder(wording_1.wording.emailPlaceholder);
        const ValidateButton = page.getByText(wording_1.wording.validateEmail);
        // WHEN
        react_native_testing_library_1.fireEvent.changeText(EmailInput, 'hello@bam.com');
        react_native_testing_library_1.fireEvent.press(ValidateButton);
        // THEN
        const SuccessMessage = await react_native_testing_library_1.waitForElement(() => page.queryByText(wording_1.wording.subscriptionSuccessful));
        expect(SuccessMessage).toBeTruthy();
    });
    it('should display error message on failed subscription', async () => {
        // SETUP
        mockPostSubscribe(400);
        const page = helpers_1.renderPage(react_1.default.createElement(Home_1.Home, Object.assign({}, props)));
        // GIVEN
        const EmailInput = page.getByPlaceholder(wording_1.wording.emailPlaceholder);
        const ValidateButton = page.getByText(wording_1.wording.validateEmail);
        // WHEN
        react_native_testing_library_1.fireEvent.changeText(EmailInput, 'hello@bamom');
        react_native_testing_library_1.fireEvent.press(ValidateButton);
        // THEN
        const ErrorMessage = await react_native_testing_library_1.waitForElement(() => page.queryByText(wording_1.wording.basicError));
        expect(ErrorMessage).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL21hdHRoaWV1L3Byb2plY3RzL1Rlc3RFeGFtcGxlcy9zcmMvcGFnZXMvSG9tZS9fX3Rlc3RzX18vSG9tZS50ZXN0LnRzeCIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtEQUEwQjtBQUMxQiwrRUFBeUU7QUFDekUsNERBQW1DO0FBQ25DLGtDQUFnQztBQUVoQyxrQ0FBK0I7QUFDL0IsMERBQWtGO0FBQ2xGLGdEQUF5RDtBQUN6RCxvREFBaUQ7QUFFakQsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7SUFDM0IsTUFBTSxLQUFLLEdBQUcsZ0NBQXNCLEVBQUUsQ0FBQztJQUN2QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBYyxFQUFFLEVBQUU7UUFDM0Msb0JBQVMsQ0FBQyxJQUFJLENBQUMsMkJBQWtCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsQ0FBQyxDQUFDO0lBRUYsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLG9CQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkRBQTZELEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDM0UsUUFBUTtRQUNSLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLG9CQUFVLENBQUMsOEJBQUMsV0FBSSxvQkFBSyxLQUFLLEVBQUksQ0FBQyxDQUFDO1FBQzdDLFFBQVE7UUFDUixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3RCxPQUFPO1FBQ1Asd0NBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ2xELHdDQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hDLE9BQU87UUFDUCxNQUFNLGNBQWMsR0FBRyxNQUFNLDZDQUFjLENBQUMsR0FBRyxFQUFFLENBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUNqRCxDQUFDO1FBQ0YsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ25FLFFBQVE7UUFDUixpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixNQUFNLElBQUksR0FBRyxvQkFBVSxDQUFDLDhCQUFDLFdBQUksb0JBQUssS0FBSyxFQUFJLENBQUMsQ0FBQztRQUM3QyxRQUFRO1FBQ1IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRSxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsT0FBTztRQUNQLHdDQUFTLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNoRCx3Q0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNoQyxPQUFPO1FBQ1AsTUFBTSxZQUFZLEdBQUcsTUFBTSw2Q0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIiwibmFtZXMiOltdLCJzb3VyY2VzIjpbIi9Vc2Vycy9tYXR0aGlldS9wcm9qZWN0cy9UZXN0RXhhbXBsZXMvc3JjL3BhZ2VzL0hvbWUvX190ZXN0c19fL0hvbWUudGVzdC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpcmVFdmVudCwgd2FpdEZvckVsZW1lbnQgfSBmcm9tICdyZWFjdC1uYXRpdmUtdGVzdGluZy1saWJyYXJ5JztcbmltcG9ydCBmZXRjaE1vY2sgZnJvbSAnZmV0Y2gtbW9jayc7XG5pbXBvcnQgJ2plc3Qtc3R5bGVkLWNvbXBvbmVudHMnO1xuXG5pbXBvcnQgeyBIb21lIH0gZnJvbSAnLi4vSG9tZSc7XG5pbXBvcnQgeyByZW5kZXJQYWdlLCBnZXRQcm9wc1dpdGhOYXZpZ2F0aW9uIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdGVzdHMvaGVscGVycyc7XG5pbXBvcnQgeyBFTUFJTF9BUElfRU5EUE9JTlQgfSBmcm9tICcuLi8uLi8uLi9hcGkvY29uZmlnJztcbmltcG9ydCB7IHdvcmRpbmcgfSBmcm9tICcuLi8uLi8uLi91dGlscy93b3JkaW5nJztcblxuZGVzY3JpYmUoJ1tQYWdlXSBIb21lJywgKCkgPT4ge1xuICBjb25zdCBwcm9wcyA9IGdldFByb3BzV2l0aE5hdmlnYXRpb24oKTtcbiAgY29uc3QgbW9ja1Bvc3RTdWJzY3JpYmUgPSAoc3RhdHVzOiBudW1iZXIpID0+IHtcbiAgICBmZXRjaE1vY2sucG9zdChFTUFJTF9BUElfRU5EUE9JTlQsIHN0YXR1cyk7XG4gIH07XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgZmV0Y2hNb2NrLnJlc2V0KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZGlzcGxheSBzdWNjZXNmdWwgbWVzc2FnZSBvbiBzdWNjZXNzZnVsIHN1YnNjcmlwdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAvLyBTRVRVUFxuICAgIG1vY2tQb3N0U3Vic2NyaWJlKDIwMCk7XG4gICAgY29uc3QgcGFnZSA9IHJlbmRlclBhZ2UoPEhvbWUgey4uLnByb3BzfSAvPik7XG4gICAgLy8gR0lWRU5cbiAgICBjb25zdCBFbWFpbElucHV0ID0gcGFnZS5nZXRCeVBsYWNlaG9sZGVyKHdvcmRpbmcuZW1haWxQbGFjZWhvbGRlcik7XG4gICAgY29uc3QgVmFsaWRhdGVCdXR0b24gPSBwYWdlLmdldEJ5VGV4dCh3b3JkaW5nLnZhbGlkYXRlRW1haWwpO1xuICAgIC8vIFdIRU5cbiAgICBmaXJlRXZlbnQuY2hhbmdlVGV4dChFbWFpbElucHV0LCAnaGVsbG9AYmFtLmNvbScpO1xuICAgIGZpcmVFdmVudC5wcmVzcyhWYWxpZGF0ZUJ1dHRvbik7XG4gICAgLy8gVEhFTlxuICAgIGNvbnN0IFN1Y2Nlc3NNZXNzYWdlID0gYXdhaXQgd2FpdEZvckVsZW1lbnQoKCkgPT5cbiAgICAgIHBhZ2UucXVlcnlCeVRleHQod29yZGluZy5zdWJzY3JpcHRpb25TdWNjZXNzZnVsKVxuICAgICk7XG4gICAgZXhwZWN0KFN1Y2Nlc3NNZXNzYWdlKS50b0JlVHJ1dGh5KCk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgZGlzcGxheSBlcnJvciBtZXNzYWdlIG9uIGZhaWxlZCBzdWJzY3JpcHRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gU0VUVVBcbiAgICBtb2NrUG9zdFN1YnNjcmliZSg0MDApO1xuICAgIGNvbnN0IHBhZ2UgPSByZW5kZXJQYWdlKDxIb21lIHsuLi5wcm9wc30gLz4pO1xuICAgIC8vIEdJVkVOXG4gICAgY29uc3QgRW1haWxJbnB1dCA9IHBhZ2UuZ2V0QnlQbGFjZWhvbGRlcih3b3JkaW5nLmVtYWlsUGxhY2Vob2xkZXIpO1xuICAgIGNvbnN0IFZhbGlkYXRlQnV0dG9uID0gcGFnZS5nZXRCeVRleHQod29yZGluZy52YWxpZGF0ZUVtYWlsKTtcbiAgICAvLyBXSEVOXG4gICAgZmlyZUV2ZW50LmNoYW5nZVRleHQoRW1haWxJbnB1dCwgJ2hlbGxvQGJhbW9tJyk7XG4gICAgZmlyZUV2ZW50LnByZXNzKFZhbGlkYXRlQnV0dG9uKTtcbiAgICAvLyBUSEVOXG4gICAgY29uc3QgRXJyb3JNZXNzYWdlID0gYXdhaXQgd2FpdEZvckVsZW1lbnQoKCkgPT4gcGFnZS5xdWVyeUJ5VGV4dCh3b3JkaW5nLmJhc2ljRXJyb3IpKTtcbiAgICBleHBlY3QoRXJyb3JNZXNzYWdlKS50b0JlVHJ1dGh5KCk7XG4gIH0pO1xufSk7XG4iXSwidmVyc2lvbiI6M30=