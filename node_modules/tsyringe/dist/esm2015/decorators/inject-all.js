import { defineInjectionTokenMetadata } from "../reflection-helpers";
function injectAll(token) {
    const data = { token, multiple: true };
    return defineInjectionTokenMetadata(data);
}
export default injectAll;
