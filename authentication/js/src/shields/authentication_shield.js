
import { Shield, textResult, redirectResult, HTTP_STATUS_CODE } from "fortjs";
export class AuthenticationShield extends Shield {
    async protect() {
        if (await this.session.isExist('email')) {
            return null;
        }
        else {
            return textResult("Not authenticated", HTTP_STATUS_CODE.Unauthorized);
        }
    }

    // The above code can written as
    // async protect() {
    //     if (!await this.session.isExist('email')) {
    //         return redirectResult("/login");
    //     }
    // }
}