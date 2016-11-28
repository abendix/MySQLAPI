var mysql   = require("mysql");
var os = require("os");

function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes = function(router,connection,md5) {
    var self = this;
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    });

    router.get("/customers",function(req,res){
        var query = "SELECT * FROM ??";
        var table = ["Customers"];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query \n" + err});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.get("/customers/:customer_id",function(req,res){
        var query = "SELECT * FROM ?? WHERE ??=?";
        var table = ["Customers","Customer_Id",req.params.customer_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Success", "Users" : rows});
            }
        });
    });

    router.post("/customers",function(req,res){
        var query = "INSERT INTO ??(??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?)";
        var table = ["customers","First_Name","Surname","Address_Line_1","Address_Line_2","Suburb","State","Postcode","Country",req.body.First_Name,req.body.Surname,req.body.Address_Line_1,req.body.Address_Line_2,req.body.Surburb,req.body.State,req.body.Postcode,req.body.Country];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query \n" + err});
            } else {	
                res.json({"Error" : false, "Message" : "User Added !"});
            }
        });
    });
	
    router.put("/customers",function(req,res){
        var query = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
        var table = ["user_login","user_password",md5(req.body.password),"user_email",req.body.email];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Updated the password for email "+req.body.email});
            }
        });
    });

    router.delete("/customers/:customer_id",function(req,res){
        var query = "DELETE from ?? WHERE ??=?";
        var table = ["customers","Customer_Id",req.params.customer_id];
        query = mysql.format(query,table);
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Error" : true, "Message" : "Error executing MySQL query"});
            } else {
                res.json({"Error" : false, "Message" : "Deleted the user with id "+req.params.customer_id});
            }
        });
    });
}

module.exports = REST_ROUTER;
