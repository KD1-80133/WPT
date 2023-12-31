
const express=require('express');
const app=express.Router();
const mysql=require('mysql');
const config=require('config');
const connectionDetails = {
        host: config.get("server"),
        database: config.get("database"),
        user: config.get("uname"),
        password: config.get("pwd")
    };


app.get("/",(request,response)=>
{
    var connection=mysql.createConnection(connectionDetails);
    var statement=`select * from products`;
    console.log(statement);
    connection.query(statement,(error,result)=>
    {
        if(error==null)
        {
            var resultInJSONString=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONString);
            response.end();
        }
        else
        {
            var errorINJSONString=JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorINJSONString);
            response.end();
        }
    });
});

app.post("/",(request,response)=>
{
    console.log("request body is recived is :")
    console.log(request.body);
    var connection=mysql.createConnection(connectionDetails);
    var statement=`INSERT INTO products (producttitle, price, stock) VALUES ('${request.body.producttitle}', ${request.body.price},${request.body.stock})`;
    console.log("query preapred is :")
    console.log(statement);
    connection.query(statement,(error,result)=>
    {
        if(error==null)
        {
            var resultInJSONString=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONString);
            response.end();
        }
        else
        {
            var errorINJSONString=JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorINJSONString);
            response.end();
        }
    })
});

app.put("/:productid",(request,response)=>
{
    console.log(request.params.productid);
    console.log("request body is recived is :")
    console.log(request.body);
    var connection=mysql.createConnection(connectionDetails);
    var statement=`UPDATE products SET producttitle='${request.body.producttitle}', price=${request.body.price}, stock=${request.body.stock} WHERE productid=${request.params.productid}`;
    console.log("query preapred is :")
    console.log(statement);
    connection.query(statement,(error,result)=>
    {
        if(error==null)
        {
            var resultInJSONString=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONString);
            response.end();
        }
        else
        {
            var errorINJSONString=JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorINJSONString);
            response.end();
        }
    })
});

app.delete("/:productid",(request,response)=>
{
    console.log("request prameters is recived is :")
    console.log(request.params.productid);
    
    var connection=mysql.createConnection(connectionDetails);
    var statement=`delete from products where productid=${request.params.productid}`;
    console.log("query preapred is :")
    console.log(statement);
    connection.query(statement,(error,result)=>
    {
        if(error==null)
        {
            var resultInJSONString=JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONString);
            response.end();
        }
        else
        {
            var errorINJSONString=JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorINJSONString);
            response.end();
        }
    })
});

module.exports=app;
