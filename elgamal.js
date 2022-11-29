// For Generate Key
function isPrima(p){
    let div = 0;
    for(let i = 1; i <= p; i++){
        if(p % i == 0){
            div++;
        }
    }
    if(div == 2){
        return true;    
    }else{
        return false;
    }
}

function ruleofGenerator(g,p){
    if(g < p){
        return false;
    }else{
        return true;
    }
}

function ruleofPrivateKey(x,p){
    if(x >= 1 && x <= (p-1)){
        return true;
    }else{
        return false;
    }
}

function ruleofK(k,p){
    if(k >= 1 && k <= (p-1)){
        return true;
    }else{
        return false;
    }
}

function generateKey(){
    // Get value from input
    var p = document.getElementById("p").value;     // prima number
    var g = document.getElementById("g").value;     // generator number
    var x = document.getElementById("x").value;     // private key
    var k = document.getElementById("k").value;     //

    // Check p is prima or not
    
    
    console.log("P : ",isPrima(p));
    // var statG = g < p;
    // console.log("G : ", g < p);
    console.log("X : ", ruleofPrivateKey(x,p));
    console.log("K : ", ruleofK(k,p));

    // Calculate Public Key
    if(isPrima(p) && ruleofPrivateKey(x,p) && ruleofK(k,p)){
        var publicKey = (g**x)%p;
    
        // Calculate C1
        var c1 = (g**k)%p;
    
        // Set value By Id
        document.getElementById("keypublic").value = publicKey;
        document.getElementById("c1").value = c1;
    }else{
        console.log('Key Tidak Sesuai Aturan')
    }


}

function encript(){
    var plaintext = document.getElementById("plaintext").value;
    
}

function decript(){

}