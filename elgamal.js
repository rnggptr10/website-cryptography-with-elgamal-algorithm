// ===========================
//          Variable
// ===========================
var c1 = BigInt;
var c1X = BigInt;
var c1x_mod_invers;
var publicKey = BigInt;
var p = BigInt;
var g;
var x;
var k;
var arr = [];
var arrC2 = [];
var arrC3 = [];
var label = "encryption";

// Test
console.log(label);
var p = document.getElementsByName('label_text').innerText = 'cipher';
console.log(p);

// ===========================
//      Change Label
// ===========================
function changeLabel(){
    label = document.getElementById("label").value;
    console.log(label);

    if(label == "encryption"){
        document.getElementById("c1_input").style.display = "none";
        document.getElementById("plaintext-label").style.display = "block";
        document.getElementById("ciphertext-label").style.display = "none";
        document.getElementById("ciphertext_number_get").style.display = "block";
        document.getElementById("title-dec").style.display = "none";
        document.getElementById("title-enc").style.display = "block";
    } else{
        document.getElementById("c1_input").style.display = "block";
        document.getElementById("ciphertext_number_get").style.display = "none";
        document.getElementById("ciphertext-label").style.display = "block";
        document.getElementById("plaintext-label").style.display = "none";
        document.getElementById("title-dec").style.display = "block";
        document.getElementById("title-enc").style.display = "none";
        document.getElementById("pt").style.display = "block";
        document.getElementById("ct").style.display = "none";
    }
}

// ===========================
//            GCD
// ===========================
function gcdExtended(a, b){
    // Base Case
    if (a == 0)
    {
        x = 0;
        y = 1;
        return b;
    }
      
    // To store results of recursive call   
    let gcd = gcdExtended(b % a, a);
    let x1 = x;
    let y1 = y;
 
    // Update x and y using results of recursive
    // call
    x = y1 - Math.floor(b / a) * x1;
    y = x1;
  
    return gcd;
}

function modInverse(a, m)
{
    let g = gcdExtended(a, m);
    if (g != 1){
        document.write("Inverse doesn't exist");
    }
    else{
        // m is added to handle negative x
        let res = (x % m + m) % m;
        return res;
    }
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
        alert("Bilangan " + p + " bukan bilangan prima !");
    }
}

function ruleofGenerator(g,p){
    if(g < p){
        return false;
    }else{
        alert("g yang bernilai " + g + " harus lebih kecil dari g !");
    }
}

function ruleofPrivateKey(x,p){
    if(x >= 1 && x <= (p-1)){
        return true;
    }else{
        alert();
    }
}

function ruleofK(k,p){
    if(k >= 1 && k <= (p-1)){
        return true;
    }else{
        alert("K tidak memenuhi syarat !");
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

    // Check Value Input
    isPrima(parseInt(p));
    ruleofGenerator(parseInt(g), parseInt(p));
    ruleofK(parseInt(k), parseInt(p));
    ruleofPrivateKey(parseInt(x), parseInt(p));
    
    // Test Encryption
    if(label == "encryption"){
        encript();
        
        // Calculate C1
        c1 = (g**k)%p;

        // Set value By Id
        document.getElementById("keypublic").value = publicKey;
        document.getElementById("c1").value = c1;
    }else{    
        c1 = document.getElementById('c1_input_dec').value;
        document.getElementById("c1").style = "display:block"
        document.getElementById("keypublic").value = publicKey;
        c1X = (c1**x)%p;
        document.getElementById("c1").value = c1X;

        decript();
    }
}

// ===========================
// Change Alphabet to Lower Case
// ===========================
function alphabetToLower(text){
    var lowerCase = text.toLowerCase();
    
    // Test & Return
    console.log('Lower Case : ', lowerCase);
    return lowerCase;
}

// ===========================
//         Encryption
// ===========================
function encript(){
    var plaintext = document.getElementById("plaintext").value;
    let lenghtPlaintext = plaintext.length;

    // toLowerCase
    plaintext = alphabetToLower(plaintext);
    
    // Change Char to Ascii Code
    for(let i = 0; i < lenghtPlaintext; i++){
        // mengubah char ke number ascii
        console.log(plaintext[i]);
        console.log(plaintext.charCodeAt(i)-97);
        arr.push(plaintext.charCodeAt(i)-97);
    }

    // Test Console
    console.log("Plaintext : ", plaintext);
    console.log(arr);
    console.log(c1);
    console.log(publicKey);

    // Calculate C2 from Plaintext at Array 'arr'
    for(let i = 0; i < arr.length; i++){
        arrC2.push(arr[i]*(publicKey**k)%p);
    }

    // Manipulasi arrC3

    // Change Number 'ASCII' to Alphabet
    for(let i = 0; i < arr.length; i++){
        arrC3.push(String.fromCharCode(arrC2[i]+97));
    }

    // Test Console 
    console.log(arrC2);
    console.log(arrC3);

    // Get Value Ciphertext
    document.getElementById("ciphertext_number").value = arrC2;
    document.getElementById("ciphertext_alphabet").value = arrC3.join('');
}

// ===========================
//         Decryption
// ===========================
function decript(){
    var ciphertext = document.getElementById("ciphertext-val").value;
    let lenghtCiphertext = ciphertext.length;

    ciphertext = alphabetToLower(ciphertext);

    // Change Char to Ascii Code
    for(let i = 0; i < lenghtCiphertext; i++){
        // mengubah char ke number ascii
        console.log(ciphertext[i]);
        console.log(ciphertext.charCodeAt(i)-97);
        arr.push(ciphertext.charCodeAt(i)-97);
    }

    // Test Console
    console.log(arr);
    console.log(c1X);
    console.log(publicKey);
    console.log("p :",p);
    console.log("Invers Mod :",modInverse(parseInt(c1X), parseInt(p)));

    // Set c1x_mod_invers
    c1x_mod_invers = modInverse(parseInt(c1X), parseInt(p));

    // Calculate C2 from ciphertext at Array 'arr'
    for(let i = 0; i < arr.length; i++){
        arrC2.push((arr[i]*c1x_mod_invers)%p);
    }

    // Change Number 'ASCII' to Alphabet
    for(let i = 0; i < arr.length; i++){
        arrC3.push(String.fromCharCode(arrC2[i]+97));
    }

    // Test Console
    console.log(arrC2);
    console.log(arrC3);

    // Get Value Ciphertext
    document.getElementById("ciphertext_number").value = arrC2;
    document.getElementById("ciphertext_alphabet").value = arrC3.join('');
}

// ===========================
//        Clear Input
// ===========================
function clearForm(){ 
    document.getElementById("input").reset(); //gajadi soalnya tetep ke simpen yg sebelumnya
    document.getElementById("output").reset();
}