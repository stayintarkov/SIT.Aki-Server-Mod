import { defineInjectionTokenMetadata } from "../reflection-helpers";
function inject(token) {
    return defineInjectionTokenMetadata(token);
}
export default inject;
