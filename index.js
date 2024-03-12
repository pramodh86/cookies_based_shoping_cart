
function updateBacketCount(){
// check cookie is already set 
let cookieStatus = checkCookie("cookieItems");
if(cookieStatus){
// if set update the cart item count button
let cartItemArray = getCookieValue("cookieItems");
console.log(cartItemArray);

let btnCartItemCount  = document.querySelector("#index-cart-item-count-btn");
btnCartItemCount.textContent = cartItemArray.length;





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
          return JSON.parse(cookieValue); // Parse the cookie value as JSON
        } catch (error) {
          console.error("Error parsing cookie value:", error);
          return null; // Return null if there's an error parsing the JSON
        }
      }
    }
    return null; // Return null if the cookie is not found
  }
  