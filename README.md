# ThreadJS
Easy multithreading in JavaScript.
Very lightweight, a little above a kilobyte minified.
## Setup
From a CDN provider:
```html
<script src="https://cdn.jsdelivr.net/gh/MMilan0107/ThreadJS@main/Thread-min.js"></script>
```
# Usage:
To get started, you have to open the amount of threads you want:
```javascript
/*
 @param {threads} Number
 Use 'maxcpu' to open the amount of physical cores available.
*/
Thread.Open(<threads>)
```
All the threads can be accessed trough **`Thread.Worker()`**
```javascript
Thread.Worker(2) // Refers to thread 2
```

To run code on a thread, use the **`.run()`** method:
```javascript
/*
 @param {code} Anonymous function containing the code
 @returns {Promise}
*/
Thread.Worker(2).run(<code>)
```
To return something to the main thread, use **`Thread.return()`** in the code.

## Thread closing
```javascript
Thread.Close([1, 3, 6]) // Closes thread 1, 3 and 6
Thread.Close('all') // Closes all threads
```

# Full Example
```javascript
Thread.Open(1)

Thread.Worker(1).run( ()=>{
   var x = 1;
   for(let i = 1; i < 100; i++){
      x *= i;
   }
   Thread.return(x)
} )
.then(console.log) // Logs value of x

Thread.Close([1])
```
