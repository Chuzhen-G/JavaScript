/* 
  Parallelism(Don't need assign different time in each missions)
    -Computer missions being execute at the same time
  Two code model
    Synchronous
      -It means after current works execute complete, then execute the next work 
      Execute B after A
    Asynchronous(Common asynchronous. timer, ajax)
      -It means works don't wait for each other execute at the same time
      Execute B and A in same time

*/
console.log('Mission1: .... Synchronous')
console.log('Mission2: .... Synchronous')

// first Synchronous, then Asynchronous
// using timer can set in different time to return function or codes,(which is somehow similar to asynchronous)
setTimeout(()=>{
  console.log('Mission3:....Asynchronous')
},1000)
// Since from concept doing synchronous at first then asynchronous, it makes the problem if some of our
// synchronous result are depend for the asynchronous result, then we can only put it in the same asynchronous place after 
// that mission.
/* 
 The using of promise is to solve the problem of nested the asynchronous, (asynchronous inside asynchronous.....),
 it can change the generally nested write format to a kind of format "looks like synchronous"(IMPORTANT for readiability)

*/

/* 
  Promise only will accept one formal parameter, and this parameter is a function,
    -In this function it contain two more parameters
      parameter:(these parameter can be realize when send message to service, if it is success it will return certain information
      to allow execute rest of codes, but if it is failed, then it may return a false information, and can't be use in the 
      rest of codes)(Besides those two state, it also will have a state call pending, which is wait a long time still not gather information)
      (fullfilles state and rejected state)
        1.resolve - the tool use when it success
        2.reject - the tool use when it failed
*/
// Promise is mainly using when the next function require for the data from previous function, which is function 2 execute after function1, function 3
// execute after function 2......
console.log('Mission4: .... Synchronous')
const p1 = new Promise((resolve, reject)=>{
  resolve('The data gather after missions')
  // reject('failure1 information')
})
console.log(p1)
/* 
  The data in the then means transform the success data information
  (It will be gather the information that in the resolve to going to next step)

  call the resolve will trigger the 'then' we have set(data is the information in resolve)
  call the reject will trigger the 'catch' we have set(err is the information in reject)
*/
/* 
  calling multiple then can archieve asynchorous in synchorous, if the rest of information in asynchorous waiting for the result of 
  previous execute, (we can using .then in the then to continue doing next work)(because we return the next asynchorous function in
  our first asynchorous function in then, so it store the function call at the then, then it means when never call next time "then" 
  it will doing the next asynchorous function)

*/
/* 
  'then' have two parameters, parameter is execute when there is success, the data is transform to the then and wantting to add the next
  step. There is also have second parameter dealing with reject, it will shows when the data does not been transfrom successsful
*/
p1.then(data =>{
  console.log(data)

  return new Promise((resolve, reject)=>{
  resolve('The data2 gather after missions')
  // reject('failure2 information')
  })
}, err=>{
  // if no return at here, it will default return a successful promise object which makes the rest of then does not doing anything
  console.log('this is second parameter execute when u failed')
  // two ways at here to solve the problem, first adding the return new promise object that indicates reject, which is false means
  // not success transform data, second is adding throw to throw an err that catched by .catch
  throw new Error('mission failed')
}).then(data =>{
  console.log(data)},
  err=>{
  console.log('this is second parameter execute when second missions u failed')
})
.catch(err =>{
  console.log(err)
})

// Async is a lexical that handling the asynchorous(It is a operation that simplify the asynchorous, but it can't completely replace promise)
// It needs using with keyword(await)(It mainly is like a format)
/* 
  Step1: prepare a function that will return promise object
*/
function asyncTask(){
  return new Promise((resolve, reject)=>{
    // Some key codes....
    const isSuccess =true
    if(isSuccess){
      resolve('Mission2:... The successful handling results')
    }else{
      reject('Mission2:... The failure handling results')
    }
  })
}

// Step2: Adding async to the function who using await
async function main(){
  console.log('mission 1')
  // The benefit of using this: It will be like the synchrouns function to handling, which will not get time delay, it will directly be use.
  // Promise is like a promise, to return a future function(so it will working like ssynchrouns)
  const data = await asyncTask()
  // This data can using in the further using(more asyncTask)
  console.log(data)
  console.log('mission 2')
}
main()