let getUser = (id, callback) => {
    let user ={
        id: id,
        name: 'Christopher' 
    };
    setTimeout(() => {
        callback(user);        
    }, 3000);
};

getUser(20, (user) =>{
    console.log(user);
});