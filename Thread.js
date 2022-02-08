/**
 * Thread.js v0.1 ( https://github.com/MMilan0107/ThreadJS )
 * @author milan107
 * @license https://gnu.org/licenses GPL version 3 or later
 */
;const Thread = { };

(function(){
     'use strict';
 
     if (typeof Worker === 'undefined') throw Error('Worker is not supported in your browser.')
 
     Thread.Allocate = function(x){
 
         if(typeof x === 'string' && x.toLowerCase() === 'maxcpu') x = navigator.hardwareConcurrency
         if(typeof x !== 'number' || x <= 0) throw Error('Thread amount must be a positive integer.')
         if(typeof Thread.worker1 !== 'undefined') throw Error('You can only allocate once.')
 
         x |= 0
         var c = 'worker';
         Thread.return=()=>{};
 
         for(let i = 1; i < x + 1; i++){
             Thread[c+i] = {
                run: function(f){

                    if(typeof Thread[c+i].__url !== 'undefined'){
                        URL.revokeObjectURL(Thread[c+i].__url)
                        Thread[c+i].__work.terminate()
                    }
                    Thread[c+i].__url = (window.URL||window.webkitURL).createObjectURL(new Blob(['onmessage='+f.toString()+'\nvar Thread={return:(e)=>postMessage(e)};Object.freeze(Thread)'],{type:'text/javascript'}))
                    Thread[c+i].__work = new Worker(Thread[c+i].__url)
                    Thread[c+i].__work.postMessage(0)

                    return new Promise( (resolve,reject)=>{
                        Thread[c+i].__work.onmessage = function(e){
                            resolve(e.data)
                        }
                        Thread[c+i].__work.onerror = function(e){
                            console.log(c+i+' failed:')
                        }
                    } )
                },
                close: ()=>{
                    try{
                        Thread[c+i].__work.terminate()
                    } catch(error){}

                    URL.revokeObjectURL(Thread[c+i].__url)
                    delete Thread[c+i]
                }
             }
         }
         Thread.Closeall = ()=>{
            for(let t = 1; t < x + 1; t++){
                Thread['worker'+t].close()
            }
        }
     }
})()