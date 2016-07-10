	simpleCart({
  checkout: {
    type: "PayPal" ,
    email: "sales@dermamor.com",
      currency: "GBP" // set the currency to pounds sterling
  },
  cartStyle: 'table',
                        cartColumns: [{
                            attr: "name",
                            label: "Name"
                        }, 
                        {
                            attr: "price",
                            label: "Price",
                            view: 'currency'
                        }, 
                        { 	attr: "quantity" ,
                        	label: "Quantity" } ,
                        {
                            view: "remove",
                            text: "Remove",
                            label: false
                        }]
  });

$(".btn").on('click', function(){
  
  checkCart()

});
// simpleCart.grandTotal()
//simpleCart.total();

function checkCart(){
  var sum = simpleCart.quantity();
  $("#dLabel").html('<span class="glyphicon glyphicon-shopping-cart"></span> Cart '+ sum +' items <span class="caret"></span>')

    if (simpleCart.items().length == 0) {
     $("#dLabel").html('<span class="glyphicon glyphicon-shopping-cart"></span> Cart Empty<span class="caret"></span>');

    }else{
        $("#dLabel").html('<span class="glyphicon glyphicon-shopping-cart"></span> Cart '+ sum +' items <span class="caret"></span>')
    }
    
  
}



