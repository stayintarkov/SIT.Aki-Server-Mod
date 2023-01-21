import type constructor from "./constructor";
import { InjectionToken } from "tsyringe";
declare function singleton<T>(token?: InjectionToken<T>): (target: constructor<T>) => void;
export default singleton;
