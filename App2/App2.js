var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'154890oO',
    database:'game1_app2'
});

connection.connect(function(err){
    if(err){
        console.log('Error Connecting ',err.stack);
        return;
    }
    console.log('Connected as id ',connection.threadId);
});
/*
connection.query('SELECT * FROM user',function(err,rows,fields){
    if(err) throw err;
    for(var i in rows){
        console.log('user :',rows[i].Name ,'score :',rows[i].Score);
    }
})*/
var value = {Name:'Koi',password:'123456',score:123}
connection.query('INSERT INTO user SET ?',value,function(err,result){
    if(err) throw err;
    console.log(result);
})

connection.end(function(err){
    console.log('Terminated Connection');
})

console.log('App2: test mysql running in the 90s');

