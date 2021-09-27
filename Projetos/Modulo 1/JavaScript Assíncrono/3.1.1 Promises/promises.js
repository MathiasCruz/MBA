const promise =  new Promise((resolve,reject)=>{
    if(Math.random() >0.5){
      resolve("sucesso");
    }
    else{
      reject("Erro");
    }
})

promise.then(console.log).catch(console.error);