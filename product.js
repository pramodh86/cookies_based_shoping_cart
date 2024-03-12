
//Get product details and bind data with async await method

async function getProductDetails() {
    try {





        let response = await fetch("https://fakestoreapi.com/products");
        let products = await response.json();
        console.log(products);
        let index = 1;
        let allItems = "";
        let productItems = "";
        document.querySelector(".loading").computedStyleMap.display = "none";


        products.forEach(product => {


            // To get correct alinment  get the first item data separatly
            if (index === 1) {
                productItems += `
            <div class="item margin-from-bottom">    
            <div class="item-img">
            <img src="${product.image}" alt="" />
            </div>
            <div class="item-text">
            <h2>${product.title}</h2>
            <h3>${product.price} / lb</h3>
            <h4>${product.description}</h4>
        </div>
        </div>
        `;



                // Get other item data after first item data
            } else {

                allItems += `
                <div id="otheritem" class="item margin-from-left margin-from-bottom">
                <div class="item-img">
                <img src="${product.image}" alt="" />

            </div>

            <div class="item-text">
                <h2>${product.title}</h2>
                <h3>${product.price} / lb</h3>
                <h4>${product.description}</h4>
                <button class="btn-add-cart" onClick="cart(${product.id},'${product.title}',${product.price},'${product.image}')">Add to cart</button>
            </div>
            </div>
            `;





            }
            index++;



        });
        //Bind first item data
        document.querySelector("#container").innerHTML = productItems;

        // Bind other item data      
        document.querySelector("#container").innerHTML = allItems;



    }
    catch (err) {

        console.log(`Somthing wrong has happended with the API: ${err}`);

    }


}

// calling data feching and data binding function
getProductDetails();

let cartItems = [];

//below function executes when add cart buton clicks
function cart(id, title, price, image) {

    let item = {};
    item.id = id;
    item.title = title;
    item.price = price;
    item.image = image;
    item.totalPrice = price.toFixed(2);
    item.numbers = 1;

    // check items is already added to the cart 
    if (!cartItems.includes(item.id)) {
        // if not item adds to cart        

        cartItems.push(item);

    }

    // check cookie is already exists 

    let cookieStatus = checkCookie("cookieItems");
    console.log(cookieStatus);
    if (cookieStatus) {
        // if exits update the cookie
         let oldListOfItemsInTheCart = getCookieValue("cookieItems");
         oldListOfItemsInTheCart.push(item);
         console.log(oldListOfItemsInTheCart);
         let jsonOldListOfItemsInTheCart = JSON.stringify(oldListOfItemsInTheCart);
         setCookie("cookieItems", jsonOldListOfItemsInTheCart, 30);
         let currentItemsInCart = getCookieValue("cookieItems");
         console.log(currentItemsInCart);
         //then update the cart amount button
         let amountBuketItems = document.querySelector("#id-bucket-item-amount");
         amountBuketItems.textContent = currentItemsInCart.length;
        // console.log("cookieItems cookie exists");
    } else {
        // if not set the cookie  
        let jsonArrayOfCartItems = JSON.stringify(cartItems);
        setCookie("cookieItems", jsonArrayOfCartItems, 30);
        console.log("cookie set");
        // update cart item amount in cart button       
        let amountBuketItems = document.querySelector("#id-bucket-item-amount");
        amountBuketItems.textContent = cartItems.length;



    }




    //console.log(id);
}

// Function to check if a specific cookie exists
function checkCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return true;
        }
    }
    return false;
}

// Function to set a cookie
function setCookie(cookieName, cookieValue, expirationDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

//read item array from the cookies
function getCookieValue(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            const cookieValue = cookie.substring(name.length, cookie.length);
            try {
                return JSON.parse(cookieValue); // Parse the cookie value as JSON
            } catch (error) {
                console.error("Error parsing cookie value:", error);
                return null; // Return null if there's an error parsing the JSON
            }
        }
    }
    return null; // Return null if the cookie is not found
}


//update cart item amount button when page loads
function updateBacketCount() {

    // check cookie is already set 
    let cookieStatus = checkCookie("cookieItems");
    if (cookieStatus) {
        // if set update the cart item count button
        let cartItemArray = getCookieValue("cookieItems");
        console.log(cartItemArray);

        let btnCartItemCount = document.querySelector("#id-bucket-item-amount");
        btnCartItemCount.textContent = cartItemArray.length;


    }

}




