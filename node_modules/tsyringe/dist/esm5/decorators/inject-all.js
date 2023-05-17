import { defineInjectionTokenMetadata } from "../reflection-helpers";
function injectAll(token) {
    var data = { token: token, multiple: true };
    return defineInjectionTokenMetadata(data);
}
export default injectAll;
