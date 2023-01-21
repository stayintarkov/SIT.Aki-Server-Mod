export declare class LinkedList<T> {
    private head;
    private tail;
    add(t: T): void;
    addRange(list: T[]): void;
    getHead(): LinkedListNode<T>;
    getTail(): LinkedListNode<T>;
    isEmpty(): boolean;
    getSize(): number;
    removeFirst(): LinkedListNode<T>;
    removeLast(): LinkedListNode<T>;
    indexOf(func: (t: T) => boolean): number;
    contains(func: (t: T) => boolean): boolean;
    forEachNode(func: (t: LinkedListNode<T>) => void): void;
    forEachValue(func: (t: T) => void): void;
    findFirstNode(func: (t: LinkedListNode<T>) => boolean): LinkedListNode<T>;
    findFirstValue(func: (t: T) => boolean): T;
    toList(): T[];
}
export declare class LinkedListNode<T> {
    private previous;
    private value;
    private next;
    constructor(value: T, previous?: LinkedListNode<T>, next?: LinkedListNode<T>);
    getValue(): T;
    getNextNode(): LinkedListNode<T>;
    setNextNode(node: LinkedListNode<T>): void;
    getPreviousNode(): LinkedListNode<T>;
    setPreviousNode(node: LinkedListNode<T>): void;
}
