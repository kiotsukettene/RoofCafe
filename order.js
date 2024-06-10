// $(document).ready(function() {  
//     $('#cartModal').modal('show');
//   });

  function addToCart(itemId) {
    var itemName = document.getElementById('itemName' + itemId).innerText;
    var itemPrice = parseFloat(document.getElementById('itemPrice' + itemId).innerText.replace('₱', ''));
    var quantity = 1; // Set quantity to 1 by default
    var imageSource = document.getElementById('itemImage' + itemId).src;

    var item = {
        id: itemId,
        name: itemName,
        price: itemPrice,
        quantity: quantity,
        image: imageSource
    };

    var cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

    var existingItemIndex = cartItems.findIndex(function(cartItem) {
        return cartItem.id === itemId;
    });

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
    } else {
        cartItems.push(item);
    }

    sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    location.reload();
    alert("Added to cart");
   
}

function getImageSource(itemId) {
    var imageElement = document.getElementById('itemImage' + itemId);
    if (imageElement) {
        return imageElement.src;
    } else {
        return ''; 
    }
  }

function clearCartItems() {
    sessionStorage.removeItem('cartItems');
    alert("Order placed");
}


