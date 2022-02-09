# ThreadJS
Easy multithreading in JavaScript.
Very lightweight, a little above a kilobyte minified.
## Setup
From a CDN provider:
```html
<script src="https://cdn.jsdelivr.net/gh/MMilan0107/ThreadJS@main/Thread-min.js"></script>
```
# Usage:
To get started, you have to allocate the amount of threads you want:
```javascript
/*
 @param {threads} Number
 Use 'maxcpu' to allocate all physical cores available.
*/
Thread.Allocate(<threads>)
```

You will now see the worker threads in the **`Thread`** object:

![](https://i.imgur.com/tFrBO9n.png)

To run code on a thread, use the **`.run()`** method:
```javascript
/*
 @param {code} Anonymous function containing the code
 @returns {Promise}
*/
Thread.worker1.run(<code>)
```
To return something to the main thread, use **`Thread.return()`** in the code.

## Thread closing
```javascript
Thread.worker2.close() // Closes thread 2
Thread.Closeall() // Closes all threads
```

# Full Example
```javascript
Thread.Allocate(1)

Thread.worker1.run( ()=>{
   var x = 1;
   for(let i = 1; i < 100; i++){
      x *= i;
   }
   Thread.return(x)
} )
.then(console.log) // Logs value of x

Thread.Closeall()
```
