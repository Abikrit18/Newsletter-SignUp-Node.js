const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const request = require("request");
const response = require('express');
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
const firstName = req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;

const data={
    members:[{
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName
        }
    }]
};


const postData = JSON.stringify(data);
const url="https://us18.api.mailchimp.com/3.0/lists/7cd414f0c3";
const options={
    
    method: "POST",
    headers:{
    Authorization: 'auth bdc586391db6b0f769144d9d920980a4-us18'
    },
    body: postData
}

const request = https.request(url,options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    }
    else{
        res.sendFile(__dirname + "/failure.html");
    }
response.on("data", function(data){
    console.log(JSON.parse(data));
})
})
request.write(postData);
request.end();

});
app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
 console.log("Server is running on port 3000");
});

//a1f024121dadb540f026ffa3458edb65-us18
//bdc586391db6b0f769144d9d920980a4-us18
//7cd414f0c3