export class AbortedError extends Error {
    constructor(message = 'aborted') {
        super(message); // (1)
        this.name = 'AbortedError'; // (2)
    }
}
