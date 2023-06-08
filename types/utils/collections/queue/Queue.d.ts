export declare class Queue<T> {
    private elements;
    private head;
    private tail;
    constructor();
    enqueue(element: T): void;
    enqueueAll(elements: T[]): void;
    dequeue(): T;
    peek(): T;
    getLength(): number;
    isEmpty(): boolean;
}
