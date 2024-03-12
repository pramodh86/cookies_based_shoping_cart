
function updateBacketCount() {
    // check cookie is already set 
    let cookieStatus = checkCookie("cookieItems");
    if (cookieStatus) {
        // if set update the cart item count button
        let cartItemArray = getCookieValue("cookieItems");
       

        let btnCartItemCount = document.querySelector("#basket-cart-item-count-btn");
        btnCartItemCount.textContent = cartItemArray.length;

        let itemStructure = "";
        let numberOfItemsTextBoxId = "";
        let subTotal = 0;
        const shipping = 3.99;
        const tax = 27.44;
        for (let i = 0; i < cartItemArray.length; i++) {

            //calculate sub total 
            
            let convertedTotalPrice = Number(cartItemArray[i].totalPrice);
            
            subTotal = subTotal+convertedTotalPrice;
           
            
            
            
            
            //for keep correct margins data binds to first item separatly 
            if (i === 0) {

                
                numberOfItemsTextBoxId = "amount-textbox-id"+`${i}`;
                //console.log(numberOfItemsTextBoxId);

                itemStructure = `<div class="item">
            <div class="item-image-desc-wrapper">
                <div class="item-image">
                    <img src="${cartItemArray[i].image}" alt="" />
                </div>
                <div class="item-description">
                    <div>
                        <h3>${cartItemArray[i].title}</h3>
                        <h4>${cartItemArray[i].price} / <span>${cartItemArray[i].numbers}b</span></h4>
                    </div>
                    <div class="editable-amount">
                    <input type="text" class="input-item-number" id="${numberOfItemsTextBoxId}" placeholder="No's" >
                        <button class="add-number-btn" onClick="addAmountOfItems(${i},${cartItemArray[i].price},'${numberOfItemsTextBoxId}')">Add</button>

                    </div>

                </div>
            </div>
            <div class="price">
                <h3>${cartItemArray[i].totalPrice}</h3>
            </div>
            </div>`;

                

            }
            else {
                // add other itmes in the cart to cart page 
                numberOfItemsTextBoxId = "amount-textbox-id"+`${i}`;
                 itemStructure += `<div class="item margin-from-top">
            <div class="item-image-desc-wrapper">
           <div class="item-image">
               <img src="${cartItemArray[i].image}" alt="" />
           </div>
           <div class="item-description">
               <h3>${cartItemArray[i].title}</h3>
               <h4>${cartItemArray[i].price} / <span>${cartItemArray[i].numbers}b</span></h4>
               <div class="editable-amount">
               <input type="text" class="input-item-number" id="${numberOfItemsTextBoxId}" placeholder="No's" >
               <button class="add-number-btn" onClick="addAmountOfItems(${i},${cartItemArray[i].price},'${numberOfItemsTextBoxId}')">Add</button>

               </div>

           </div>
            </div>
            <div class="price">
           <h3>${cartItemArray[i].totalPrice}</h3>
            </div>


            </div>`;




            }



        }

                //bind items
                let domElementItemList = document.querySelector(".items");
                domElementItemList.innerHTML = itemStructure;

                //bind sub total
                let subtotalElement = document.querySelector("#id-sub-total");
                subtotalElement.textContent = subTotal.toFixed(2);
                
                // bind total 
                let total = shipping+tax+subTotal;
                let totalElement = document.querySelector("#id-total");
                totalElement.textContent = total.toFixed(2);


    }





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
                return JSON.parse(cookieValue); 
            } catch (error) {
                console.error("Error parsing cookie value:", error);
                return null; 
            }
        }
    }
    return null; 
}


//executes when editing number of items




function addAmountOfItems(itemIndex,price,inputFeildId){

let textFeildID = inputFeildId;
let numberOfItems = document.querySelector(`#${textFeildID}`).value;
let numberOfItemsConverted =1; 
let totalPrice = 0;
if(numberOfItems==="")  {
    totalPrice = numberOfItemsConverted*price;
    totalPrice = totalPrice.toFixed(2);
    
} else{
    
    numberOfItemsConverted=Number(numberOfItems);
    totalPrice = numberOfItemsConverted*price;
    totalPrice = totalPrice.toFixed(2);
} 


let listOfItems = getCookieValue("cookieItems");
let amountChangedItem = listOfItems[itemIndex];
amountChangedItem.totalPrice = totalPrice;
amountChangedItem.numbers = numberOfItemsConverted;

listOfItems[itemIndex] = amountChangedItem; 
let jsonArrayOfCartItems = JSON.stringify(listOfItems);
setCookie("cookieItems", jsonArrayOfCartItems, 30);
updateBacketCount();








}


// Function to set a cookie
function setCookie(cookieName, cookieValue, expirationDays) {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}


function clearCart(){


    console.log("This is from clear cart");
    clearCookie("cookieItems");
    location.reload();

}


//cookie clear
function clearCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
