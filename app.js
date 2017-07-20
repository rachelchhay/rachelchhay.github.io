// windows onload
$(() => {


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
      player.xp+=2;
      player.customersLeft--;
      $('#coins').text('Coins: ' + player.coins);
      $('#xp').text('XP: ' + player.xp);
      $('#customers-left').text('Customers Left: ' + player.customersLeft);
      // reset customer properties
      this.happiness = false;
      $('.customer li').remove();
    } else {
      player.coins--;
      player.xp-=2;
      $('#coins').text('Coins: ' + player.coins);
      $('#xp').text('XP: ' + player.xp);
      $('#customers-left').text('Customers Left: ' + player.customersLeft);
      // reset customer properties
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
         if(customer.orderArr[i].toLowerCase() !== this.orderCompletedArr[i]) {
           customer.happiness = false;
           console.log("arrays don't match");
           console.log(this.orderCompletedArr);
           console.log(customer.orderArr);
           return false; //ends loop
         }
      }
      customer.happiness = true;
      console.log("Items match");
    } else {
      customer.happiness = false;
      console.log("Arrays are different lengths");
      console.log(this.orderCompletedArr);
      console.log(customer.orderArr);

    }

  }


};

// player can't click Next Customer below 0
const nextOff = () => {
  if(player.customersLeft < 0) {
    $('#next').off('click');
  }
};


// start game round 1 ======================================

const start = () => {
    customer.randomFood(1);
    // customer.randomFood(Math.floor(Math.random() * (5 - 3)) + 3);

  customer.customerOrder();
}
start();

// round class ========================================

class Rounds {
  addMenuItem (str1, str2, str3) {
    menu.push(str1, str2, str3);
    $('#menu').append($('<li>').addClass('menu-items').text(str1).on('click', (e) => {
      const menuText = $(e.currentTarget).text().toLowerCase();
      player.orderCompletedArr.push(menuText);
      console.log(player.orderCompletedArr);
    }));
    $('#menu').append($('<li>').addClass('menu-items').text(str2).on('click', (e) => {
      const menuText = $(e.currentTarget).text().toLowerCase();
      player.orderCompletedArr.push(menuText);
      console.log(player.orderCompletedArr);
    }));
    $('#menu').append($('<li>').addClass('menu-items').text(str3).on('click', (e) => {
      const menuText = $(e.currentTarget).text().toLowerCase();
      player.orderCompletedArr.push(menuText);
      console.log(player.orderCompletedArr);
    }));
  }
  changeCustomersLeft (num) {
    player.customersLeft = num;
    $('#customers-left').text('Customers Left: ' + player.customersLeft);
  }
  changeRandomFood (randomFunction) {
    customer.randomFood(randomFunction);
    customer.customerOrder();
  }
};

const secondRound = new Rounds();




// click events =============================================
$('#menu li').addClass('menu-items');

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
  customer.orderArr = [];
  player.orderCompletedArr = [];
  start();
  nextOff();

  if(player.coins === 2) {
    const round2 = prompt("You have enough coins to go on to level 2! Would you like to keep going?", "yes/no");
    if(round2 === "yes" || round2 === "Yes" || round2 === "y") {
      alert("Click the Next Round button");

      $('.customer li').remove();

      $('body').append($('<button>').text("Next Round").attr('id', 'next-round'));

      $('#next-round').on('click', (e) => {
        console.log("clicked next round");
        secondRound.addMenuItem("Waffles", "Fried Chicken", "Spaghetti");
        secondRound.changeCustomersLeft(8);
        secondRound.changeRandomFood(Math.floor(Math.random() * (7 - 3)) + 3);
      });

    }
  }
});




// Math.random argument isn't changing






// windows onload end
})
