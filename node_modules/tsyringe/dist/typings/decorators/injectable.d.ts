import constructor from "../types/constructor";
/**
 * Class decorator factory that allows the class' dependencies to be injected
 * at runtime.
 *
 * @return {Function} The class decorator
 */
declare function injectable<T>(): (target: constructor<T>) => void;
export default injectable;
