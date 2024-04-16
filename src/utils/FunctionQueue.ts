export default class FunctionQueue {
    queue: Function[];
    processing: boolean;
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    // Method to add functions to the queue
    enqueue(func: Function) {
        this.queue.push(func);
        this.next();
    }

    // Method to execute the next function
    next() {
        if (this.processing || this.queue.length === 0) {
            return;
        }
        const func = this.queue.shift(); // Get the first function from the queue
        
        if (!func){
            return
        }

        this.processing = true; // Set processing flag to true
        new Promise((resolve, reject) => {
            func(resolve, reject); // Execute the function with resolve and reject functions
        }).then(() => {
            this.processing = false; // Reset processing flag when done
            this.next(); // Check for next function in the queue
        }).catch(error => {
            console.error('Function execution failed:', error);
            this.processing = false; // Reset processing flag on error
            this.next(); // Continue to the next function
        });
    }
}
