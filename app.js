// windows onload
$(() => {

  // Remove current customer order
  // Loop through customer

// Array of food on menu
const menu = ["hamburger", "sandwich", "pizza", "coffee", "milkshake", "cupcake", "pie", "hot dog", "fries", "salad", "soda", "cake", "ice cream"];


// customer object========================================
const customer = {
  happiness: false,
  orderArr: [],
  randomFood(num) {
    for(let i = 0; i < num; i++) {
      const newFood = menu[Math.floor(Math.random() * menu.length)];
      this.orderArr.push(newFood);
    }
  },
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
      this.happiness = false;
      $('.customer li').remove();
    } else {
      player.coins--;
      player.xp--;
      $('#coins').text('Coins: ' + player.coins);
      $('#xp').text('XP: ' + player.xp);
      $('#customers-left').text('Customers Left: ' + player.customersLeft);
      $('.customer li').remove();
    }
  }
};



// player object========================================
const player = {
  coins: 0,
  xp: 0,
  customersLeft: 5,
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

// start game function ======================================
const start = () => {
  customer.randomFood(1);
  customer.customerOrder();
}

// customer.randomFood(Math.floor(Math.random() * (13 - 1)) + 1);

start();

$('#menu li').addClass('menu-items');

// click events =============================================

$('.menu-items').on('click', (e) => {
  const menuText = $(e.currentTarget).text().toLowerCase();
  player.orderCompletedArr.push(menuText);
  console.log(player.orderCompletedArr);
});

// order finished button

$('#order-up').on('click', (e) => {
  player.checkOrder();
  console.log(customer.happiness);
  customer.payForOrder();
  console.log("Player coins: " + player.coins);
  console.log("Player xp: " + player.xp);
  console.log("Customers left: " + player.customersLeft);
});

$('#next').on('click', (e) => {
  start();
})




// windows onload end
})
