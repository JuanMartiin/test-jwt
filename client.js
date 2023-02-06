fetch('http://localhost:3001/login', {
    method: 'post'
})
   .then(response=>{
    return response.json();

   })
   .then(response=>{
    let token = response.data.token;
    fetch('http://localhost:3001/request', {
        method: 'get',
        headers: {
            'Authorization' : "Bearer " + token
        }
        
    })
    .then(response=>{
        console.log(response);
        return response.json();
    
       })
    .then(response=>{
        console.log(response);
    })
   })
