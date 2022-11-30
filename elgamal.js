// ===========================
//          Variable
// ===========================
var c1 = BigInt;
var publicKey = BigInt;
var p;
var g;
var x;
var k;
var arr = [];
var arrC2 = [];
var label = document.getElementById("label").value;
console.log(label);

// ===========================
//      Change Label
// ===========================
function changeLabel(){
    console.log(label);
}


// ===========================
//     For Generate Key
// ===========================
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
    p = document.getElementById("p").value;     // prima number
    g = document.getElementById("g").value;     // generator number
    x = document.getElementById("x").value;     // private key
    k = document.getElementById("k").value;     //


    // Calculate publicKey
    publicKey = (g**x)%p;

    // Calculate C1
    c1 = (g**k)%p;

    // Set value By Id
    document.getElementById("keypublic").value = publicKey;
    document.getElementById("c1").value = c1;
    
    // Test Encryption
    encript();
}

// ===========================
//         Encryption
// ===========================
function encript(){
    var plaintext = document.getElementById("plaintext").value;
    let lenghtPlaintext = plaintext.length;

    // Change Char to Ascii Code
    for(let i = 0; i < lenghtPlaintext; i++){
        // mengubah char ke number ascii
        console.log(plaintext[i]);
        console.log(plaintext.charCodeAt(i)-97);
        arr.push(plaintext.charCodeAt(i)-97);
    }

    // Test Console
    console.log(arr);
    console.log(c1);
    console.log(publicKey);

    // Calculate C2 from Plaintext at Array 'arr'
    for(let i = 0; i < arr.length; i++){
        arrC2.push(arr[i]*(publicKey**k)%p);
    }

    // Test Console 
    console.log(arrC2);

    document.getElementById("ciphertext").value = arrC2;
}

// ===========================
//         Decryption
// ===========================
function decript(){

}