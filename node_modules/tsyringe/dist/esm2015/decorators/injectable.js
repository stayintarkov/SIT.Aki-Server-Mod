import { getParamInfo } from "../reflection-helpers";
import { typeInfo } from "../dependency-container";
function injectable() {
    return function (target) {
        typeInfo.set(target, getParamInfo(target));
    };
}
export default injectable;
