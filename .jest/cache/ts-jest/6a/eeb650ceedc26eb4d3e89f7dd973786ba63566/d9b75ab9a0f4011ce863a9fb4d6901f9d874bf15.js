"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const wretch_1 = __importDefault(require("wretch"));
const config_1 = require("../config");
class SignUpApi {
    static subscribeNewsletter(subscribeNewsletterParams) {
        return wretch_1.default()
            .url(config_1.EMAIL_API_ENDPOINT)
            .post(subscribeNewsletterParams)
            .res();
    }
}
exports.SignUpApi = SignUpApi;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIjoiL1VzZXJzL21hdHRoaWV1L3Byb2plY3RzL1Rlc3RFeGFtcGxlcy9zcmMvYXBpL3NpZ251cC9pbmRleC50cyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUE0QjtBQUU1QixzQ0FBK0M7QUFNL0MsTUFBYSxTQUFTO0lBQ2IsTUFBTSxDQUFDLG1CQUFtQixDQUFDLHlCQUErQztRQUMvRSxPQUFPLGdCQUFNLEVBQUU7YUFDWixHQUFHLENBQUMsMkJBQWtCLENBQUM7YUFDdkIsSUFBSSxDQUFDLHlCQUF5QixDQUFDO2FBQy9CLEdBQUcsRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBUEQsOEJBT0MiLCJuYW1lcyI6W10sInNvdXJjZXMiOlsiL1VzZXJzL21hdHRoaWV1L3Byb2plY3RzL1Rlc3RFeGFtcGxlcy9zcmMvYXBpL3NpZ251cC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgd3JldGNoIGZyb20gJ3dyZXRjaCc7XG5cbmltcG9ydCB7IEVNQUlMX0FQSV9FTkRQT0lOVCB9IGZyb20gJy4uL2NvbmZpZyc7XG5cbmludGVyZmFjZSBJVmFsaWRhdGVFbWFpbFBhcmFtcyB7XG4gIGVtYWlsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBTaWduVXBBcGkge1xuICBwdWJsaWMgc3RhdGljIHN1YnNjcmliZU5ld3NsZXR0ZXIoc3Vic2NyaWJlTmV3c2xldHRlclBhcmFtczogSVZhbGlkYXRlRW1haWxQYXJhbXMpIHtcbiAgICByZXR1cm4gd3JldGNoKClcbiAgICAgIC51cmwoRU1BSUxfQVBJX0VORFBPSU5UKVxuICAgICAgLnBvc3Qoc3Vic2NyaWJlTmV3c2xldHRlclBhcmFtcylcbiAgICAgIC5yZXMoKTtcbiAgfVxufVxuIl0sInZlcnNpb24iOjN9