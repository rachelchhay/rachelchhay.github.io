// windows onload
$(() => {




const customer = {
  happiness: false,
  orderArr: ["blueberry", "cake", "coffee"],
  customerOrder() {
    for(let i = 0; i < this.orderArr.length; i++) {
      const order = $('<li/>').html(this.orderArr[i]);
      $('.customer').append(order);
    }
  },
  payForOrder() {
    if(this.happiness === true) {
      player.coins++;
      player.xp++;
      player.customersLeft--;
      $('#coins').text('Coins: ' + player.coins);
      $('#xp').text('XP: ' + player.xp);
      $('#customers-left').text('Customers Left: ' + player.customersLeft);
    }
  }
};

customer.customerOrder();

const player = {
  coins: 0,
  xp: 0,
  customersLeft: 1,
  orderCompletedArr: [],
  checkOrder() {
    // check if two arrays match
    if(this.orderCompletedArr.length === customer.orderArr.length) {
      for(let i = 0; i < customer.orderArr.length; i++) {
         if(customer.orderArr[i] !== this.orderCompletedArr[i]) {
           customer.happiness = false;
           console.log("arrays don't match");
           return false; //ends loop
         }
      }
      customer.happiness = true;
      console.log("Items match");
    } else {
      customer.happiness = false;
      console.log("Arrays are different lengths");
    }

  }


};







$('#menu li').addClass('menu-items');

$('.menu-items').on('click', (e) => {
  const menuText = $(e.currentTarget).text().toLowerCase();
  player.orderCompletedArr.push(menuText);
  console.log(player.orderCompletedArr);
});

// order finished button

$('button').on('click', (e) => {
  player.checkOrder();
  console.log(customer.happiness);
  customer.payForOrder();
  console.log("Player coins: " + player.coins);
  console.log("Player xp: " + player.xp);
  console.log("Customers left: " + player.customersLeft);
});






// windows onload end
})
