/**
 * Thread.js v0.32 ( https://github.com/MMilan0107/ThreadJS )
 * @author milan107
 * @license https://gnu.org/licenses GPL version 3 or later
 */
;const Thread = { };

(function(){
     'use strict';
 
     if (typeof Worker === 'undefined') throw 'Worker is not supported in your browser.'
 
     Thread.Open = function(x){
 
         if((x+'').toLowerCase() === 'maxcpu') x = navigator.hardwareConcurrency
         if(typeof x !== 'number' || x <= 0) throw 'Thread amount invalid.'
 
         x |= 0
         var c = '__worker';
         Thread.return=function(){};
 
         for(let i = 1; i < x + 1; i++){
             Thread[c+i] = {
                run: function(f){

                    if(this.hasOwnProperty('__work')){
                        (window.URL||window.webkitURL).revokeObjectURL(this.__url)
                        this.__work.terminate()
                    }

                    this.__url = (window.URL||window.webkitURL).createObjectURL(new Blob(['onmessage='+f.toString()+'\nvar Thread={return:(e)=>postMessage(e)};Object.freeze(Thread)'],{type:'text/javascript'}))
                    this.__work = new Worker(this.__url)
                    this.__work.postMessage(0)

                    return new Promise( (resolve,reject)=>{
                        this.__work.onmessage = function(e){
                            resolve(e.data)
                        }
                        this.__work.onerror = function(e){
                            reject('Worker('+i+')'+' Error')
                        }
                    } )
                },
                close: function(){
                    try{
                        Thread[c+i].__work.terminate()
                    } catch(e){}

                    (window.URL||window.webkitURL).revokeObjectURL(Thread[c+i].__url)
                    delete Thread[c+i]
                }
             }
         }
         Thread.Worker = function(e){
             return Thread[c+e]
         }
         Thread.Close = function(e){

            if(typeof e !== 'string' && typeof e !== 'object') throw 'Invalid parameter.'

            if((e+'').toLowerCase() === 'all'){

                for(let t = 1; t < x + 1; t++){
                    try{
                        Thread[c+t].close()
                    } catch (e){}
                }

            } else{
                e.forEach(el =>{
                    Thread[c+Number(el)].close()
                })
            }
        }
     }
})()
