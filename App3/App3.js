
var express = require('express');
var app = express();
var mysql = require('mysql');
var username = 'Fary1';
var connection = mysql.createConnection({
    host: 'cherprang.cwgtar5fplob.ap-southeast-2.rds.amazonaws.com',
    user: 'root',
    password: '********',
    database: 'CherprangBNK48'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting ', err.stack);
        return;
    }
    console.log('Connected as id ', connection.threadId);
});
app.get('/users', function (req, res) {
    queryAllUser(function(err,result){
        res.end(result);
    })
   // res.end('hello');
});
app.get('/user/adduser',function (req, res){
        var name = req.query.name;
        var pass = req.query.pass;
    var user = [[name,pass]];
    AddUser(user,function(err,result){
            res.end(result);
    });
    res.end(name+pass);
})
app.get('/user/:name', function (req, res) {
   
    var name = req.params.name;

    console.log(name);
   
    queryUser(function(err,result){
        res.end(result);
    },name)
});
var server = app.listen(8081, function () {
    console.log('Sever : Running');
})

function AddUser(user,callback) {
    var sql = 'INSERT INTO Game1(Name,Password) value ?';

    connection.query(sql,[user],
     function (err) {
         var res = '[["success":"true"]]';

        if (err) throw err;
        res = '[["success":"false"]]';
        callback(null, null);
    })
}

function queryAllUser(callback) {
    var json = '';
    connection.query('SELECT * FROM Game1', function (err, rows, fields) {
        if (err) throw err;
        json = JSON.stringify(rows);
        callback(null, json);
    })
}

function queryUser(callback,name) {
    var json = '';
    connection.query('SELECT * FROM Game1 WHERE Name =?',name,
     function (err, rows, fields) {
        if (err) throw err;
        json = JSON.stringify(rows);
        callback(null, json);
    })
}