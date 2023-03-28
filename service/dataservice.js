const jwt=require("jsonwebtoken")


userDetails = {
    1000: { Username: "lulu", acno: 1000, password: "abc121", balance: 0, transaction: [] },
    1001: { Username: "anu", acno: 1001, password: "abc122", balance: 0, transaction: [] },
    1002: { Username: "amal", acno: 1002, password: "abc123", balance: 0, transaction: [] },
    1003: { Username: "shaf", acno: 1003, password: "abc124", balance: 0, transaction: [] },
    1004: { Username: "ish", acno: 1004, password: "abc125", balance: 0, transaction: [] }
}

register = (acno, uname, psw) => {

    if (acno in userDetails) {
        return {

            status: false,
            message: "user already present",
            statusCode: 404
        }
    }

    else {
        userDetails[acno] = { Username: uname, acno, password: psw, balance: 0, transaction: [] }
        return {
            status: true,
            message: "registered",
            statusCode: 200
        }
    }
}
 login=(acno,psw)=>{
    if(acno in userDetails)
    {
        if (psw==userDetails[acno]["password"])
        {
            currentUser=userDetails[acno]["Username"]
            currentAcno=acno

            //token create
             const token =jwt.sign({acno},"superkey123") 
             


            return{
                status:true,
                message:"login success",
                statusCode:200,
                currentUser,
                currentAcno,
                token
            }
        }
            else
            {
                return{
                    status:false,
                    message:"incorrect password",
                    statusCode:404
            }
        }

    }

    else{
        return{
            status:false,
            message:"not registered yet",
            statusCode:404
    }
}
 }
                 


//deposit

deposit=(acno,psw,amnt)=>{

var amount=parseInt(amnt)

    if(acno in userDetails)
     {
    if(psw==userDetails[acno]["password"]) 
    {
userDetails[acno]["balance"]+=amount
// add transaction data
 userDetails[acno]["transaction"].push({Type:"Credit",Amount:amount})
 return{
    status:true,
    message:`your ac has been credited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
    statusCode:200
 }
    }
    else
    {
        return{
            status:false,
            message:"incorrect password",
            statusCode:404
    }
    }
}
     else{
        return{
            status:false,
            message:"incorrect acno",
            statusCode:404
    }
     }
}

// //withdraw patch
 

withdraw=(acno,psw,amnt)=>{

    var amount=parseInt(amnt)
    
        if(acno in userDetails)
         {
        if(psw==userDetails[acno]["password"]) 
        {
            if(amount<=userDetails[acno]["balance"])
            {
                userDetails[acno]["balance"]-=amount
                // add transaction data
                 userDetails[acno]["transaction"].push({Type:"debit",Amount:amnt})
                 return{
                    status:true,
                    message:`your ac has been debited with amount ${amount} and the balance is ${userDetails[acno]["balance"]}`,
                    statusCode:200
                 }
            }

            else
           {
            return{
                status:false,
                message:"insufficient balance",
                statusCode:404
              }
           }
    
        }

        else
        {
         return{
             status:false,
             message:"incorrect password",
             statusCode:404
           }
        }
        
    }
    else
    {
     return{
         status:false,
         message:"incorrect acno",
         statusCode:404
       }
    }
         
 }
    
     
    
    // //transaction get
    
    
    getTransaction=(acno)=>{
        return {
            status:true,
            transaction:userDetails[acno].transaction,
            statusCode: 200
    
        }
    }
    
    // //delete delete
    
    // //resolve api
    
    
    
    module.exports = {
        register,login, deposit,withdraw,getTransaction
    }