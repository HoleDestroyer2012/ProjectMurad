import users from '../database/usersDb.json' assert {type: 'json'};
import products from '../database/productsDb.json' assert {type: 'json'};

const login = document.getElementById('login');
const password = document.getElementById('password');
const ButtonLogin = document.getElementById('button-login');
const startlogin = document.getElementById('account');
const cartButton = document.getElementById('cart');
const loginDiv = document.getElementById('login-page');
const state = document.getElementById('state');
const buttonreg = document.getElementById('reg');
const regForm = document.getElementById('regForm');
const loginReg = document.getElementById('loginReg');
const passwordReg = document.getElementById('passwordReg');
const notreg = document.getElementById('notreg');
const buttonReg = document.getElementById('button-reg');
const namereg = document.getElementById('Regname');
const backreg = document.getElementById('galyotmena');

class user{
    constructor(name, cart){
        this.name = name;
        this.cart = cart;
    }
}
let loginPage ='';
var currentAccount;

const funcLogin = function(e){
    e.preventDefault();
    loginPage = '';
    document.querySelector(".main").setAttribute("id", `overlay`);
    //loginDiv.innerHTML = '<p class="close">&times</p>' + loginDiv.innerHTML;
    loginDiv.removeAttribute("hidden", '');
    const close = document.getElementById("close1");
    close.addEventListener("click", () =>{
        loginDiv.setAttribute("hidden", "")
        document.querySelector(".main").removeAttribute("id", `overlay`);
        document.getElementById('passError').setAttribute('hidden', '');
    }
    );

    // document.querySelector('.main').addEventListener('click', ()=>{
    //     loginDiv.setAttribute("hidden", "")
    //     document.querySelector(".main").removeAttribute("id", `overlay`);
    // });
}

const funcState = function(e){
    e.preventDefault();
    document.querySelector(".main").setAttribute("id", `overlay`);
    state.removeAttribute("hidden");
    const close = document.getElementById("close2");
    close.addEventListener("click", () =>{
        state.setAttribute("hidden", " ")
        document.querySelector(".main").removeAttribute("id", `overlay`);
    }
    );
    document.getElementById('name').innerHTML = `Имя: ${window.currentAccount.name}`;
}

ButtonLogin.addEventListener('click', (e)=>{
    console.log('1');
    e.preventDefault();

//     let xhr = new XMLHttpRequest();
// const url = 'http://localhost:8000/submit'; // URL, на который отправляем запрос
// const data = { 
//   name: 'John', 
//   email: 'john@example.com' 
// }; // данные, которые нужно отправить

// xhr.open('POST', url, true); // настройки запроса: метод, URL, асинхронность
// xhr.setRequestHeader('Content-Type', 'application/json'); // устанавливаем заголовок Content-Type

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const response = JSON.parse(xhr.responseText);
//     console.log(response); // выводим ответ сервера в консоль
//   }
// };

// const jsonData = JSON.stringify(data); // преобразуем объект с данными в JSON
// xhr.send(jsonData); // отправляем запрос



    if(users.find(account => account.nickname === login.value)){
        window.currentAccount = users.find(account => account.nickname === login.value);
    }
    else{
        document.getElementById('passError').removeAttribute('hidden');
    }
    console.log(window.currentAccount);
    if (window.currentAccount){
        console.log('11111');
        if (window.currentAccount.password === password.value){
            let name = window.currentAccount.name;
            let cart = window.currentAccount.cart
            window.window.currentAccount = new user(name, cart);
            loginDiv.setAttribute("hidden", '')
            document.querySelector(".main").removeAttribute("id", `overlay`);
            document.getElementById('cart').removeAttribute('hidden');
            console.log(window.currentAccount);
            startlogin.removeEventListener('click', funcLogin);
            startlogin.addEventListener('click', funcState);
        }
        else{
            document.getElementById('passError').removeAttribute('hidden');
        }
    }
}
);

startlogin.addEventListener('click', funcLogin);

buttonreg.addEventListener('click', (e)=>{
    e.preventDefault();
    notreg.setAttribute('hidden', '');
    regForm.removeAttribute('hidden');
});

backreg.addEventListener('click', (e)=>{
    e.preventDefault();
    regForm.setAttribute('hidden', '');
    notreg.removeAttribute('hidden');
});

buttonReg.addEventListener('click', (e) =>{
    e.preventDefault();
    if(passwordReg.value != '' && loginReg.value != '' && namereg.value != ''){
        console.log('11111');
            let name = namereg.value;
            let cart = [];
            window.currentAccount = new user(name, cart);
            loginDiv.setAttribute("hidden", '')
            document.querySelector(".main").removeAttribute("id", `overlay`);
            document.getElementById('cart').removeAttribute('hidden');
            console.log(window.currentAccount);
            startlogin.removeEventListener('click', funcLogin);
            startlogin.addEventListener('click', funcState);
    }
});


var buttonsPlus = [];
const cart = document.getElementById('cart');

const count = (arr, element) => {
    console.log(arr);
    console.log(element);
    const kol = arr.filter(e => {
        if (e == element){
            return true;
        }
        return false;
    }).length;
    return kol;
}

cart.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector(".main").setAttribute("id", `overlay`);
    document.getElementById('incart').removeAttribute("hidden");

    let SetCart = window.currentAccount.cart.filter((v, i, self) => {
        return i == self.indexOf(v);
    });

    SetCart.forEach(element => {

        let product = products.find(products => products.id == element);
        let kol = count(window.currentAccount.cart, product.id)
        let price = +kol * (+product.price);
        allprice+=price;
        document.getElementById('incart1').innerHTML += `<div class="product-in-cart"> <div class="left-block-in-cart"><img class="img-in-product-cart" src ='${product.png_url}'> </div><div class="right-block-in-cart"> <div class="add-item"><button hidden class='minus' id='minus-${product.id}'>-</button> <p class='kol'>quantity of goods: ${kol}</p> <button hidden class='plus' id='plus-${product.id}'>+</button> </div> <div class="text-under-button"> <p class="total-price-for-item">Totel price for this item : </p> <p class='price'>${price} &#8381</p> </div> </div>  </div>`;
        let buttonsPlus = document.querySelectorAll('.plus');
        console.log(cart);


    });
    let close = document.getElementById("close3"); 
    close.addEventListener("click", () =>{
        document.getElementById('incart1').innerHTML = '';
        document.getElementById('incart').setAttribute("hidden", " ")
        document.querySelector(".main").removeAttribute("id", `overlay`);
    }
    );

    document.getElementById('incart1').innerHTML += `<div class="total-price"> <p class="total-price-text">Total price is : ${allprice} &#8381</p>  </div>`;
});




const addproduct = document.querySelector('.add-in-cart');
addproduct.addEventListener('click', (e)=>{
        e.preventDefault();
        const idProduct = addproduct.id.split('-')[1];
        window.currentAccount.cart.push(idProduct);
});


var allprice = 0;
async function Plus (element){
    let product = products.find(products => products.id == element);
    let kol = count(window.currentAccount.cart, product.id)
    let price = +kol * (+product.price);
    allprice += price;
    document.getElementById('incart1').innerHTML += `<div> <img src ='${product.png_url}' style='width:100px'> <div> <button class='minus' id='minus-${product.id}'>-</button> <p class='kol'>${kol}</p> <button class='plus' id='plus-${product.id}' >+</button> </div> <p class='price'>${price}</p> </div>`;
    let buttonsPlus;  
    buttonsPlus=document.getElementById(`plus-${product.id}`);

    await buttonsPlus.addEventListener('click', () => {
            console.log('1112');
        })
    }
    