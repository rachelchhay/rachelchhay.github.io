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
  $('#next').off('click');
};


// start game round 1 ======================================
let round = 0;
const start = () => {
  customer.randomFood(1 + round);
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

};

const secondRound = new Rounds();
const thirdRound = new Rounds();

// Set Timer Function =======================================
let timeLeft = 10;
let startInterval;
const timer = () => {
  $('#game-status').append($('<li>').attr('id', 'timer'));
  startInterval = setInterval( () => {
    $('#timer').text("Timer: " + timeLeft);
    if(timeLeft <= 5) {
      $('#timer').toggleClass('blink');
    };
    if(timeLeft === 0) {
      clearInterval(startInterval);
    };
    if(player.coins < 18 && timeLeft === 0) {
      setTimeout( function () {alert("You lose. You ran out of time.")}, 1000);
      setTimeout( function () {location.reload(true)}, 2000);
    };
    timeLeft--;
     }, 1000);

}


// click events =============================================
$('#menu li').addClass('menu-items');

$('.menu-items').on('click', (e) => {
  const menuText = $(e.currentTarget).text().toLowerCase();
  player.orderCompletedArr.push(menuText);
  console.log(player.orderCompletedArr);
});

$('#order-up').on('click', (e) => {
  player.checkOrder();
  console.log(customer.happiness);
  customer.payForOrder();
  console.log("Player coins: " + player.coins);
  console.log("Player xp: " + player.xp);
  console.log("Customers left: " + player.customersLeft);

  // win or lose the game
  if(player.coins <= 0 || player.xp <= 0) {
    setTimeout( function () {alert("You lose :(")}, 1000);
    setTimeout( function () {location.reload(true)}, 2000);
  } else if(player.coins === 7) {
    setTimeout( function () {alert("You win!")}, 1000);
    setTimeout( function () {location.reload(true)}, 2000);
  };


});

$('#next').on('click', (e) => {
    customer.orderArr = [];
    player.orderCompletedArr = [];
    start();

    if(player.customersLeft <= 0) {
      nextOff();
    }

  // ROUND 2 ====================================
    if(player.coins === 2) {
      round = 2;
      const round2 = prompt("You have enough coins to go on to level 2! Would you like to keep going?", "yes/no");
      if(round2 === "yes" || round2 === "Yes" || round2 === "y") {
        alert("Click the Next Round button");

        $('.customer li').remove();

        $('.buttons').append($('<button>').html('<span>Next Round</span>').attr('id', 'next-round'));

        $('#next-round').on('click', (e) => {
          timer();
          console.log("clicked next round");
          secondRound.addMenuItem("Waffles", "Tater Tots", "Spaghetti");
          secondRound.changeCustomersLeft(6);
          customer.customerOrder();

          $('#next-round').off('click');
        });
      } else{
        setTimeout( function () {alert("Come back when you want to play!")}, 1000);
        setTimeout( function () {location.reload(true)}, 2000);
      }

    }

  // ROUND 3 ====================================
    if(player.coins === 5) {
      clearInterval(startInterval);
      round = 3;
      const round2 = prompt("You have enough coins to go on to level 3! Would you like to keep going?", "yes/no");
      if(round2 === "yes" || round2 === "Yes" || round2 === "y") {
        alert("Click the Next Round button");

        $('.customer li').remove();

        $('#next-round').on('click', (e) => {
          timeLeft = 50;
          timer();
          console.log("clicked next round");
          thirdRound.addMenuItem("Pancakes", "Corn Dog", "Cookies");
          thirdRound.changeCustomersLeft(7);
          customer.customerOrder();
          $('#next-round').off('click');
        });
      } else{
        setTimeout( function () {alert("Come back when you want to play!")}, 1000);
        setTimeout( function () {location.reload(true)}, 2000);
      }

    }


});

// NOT WORKING========>
// if(timeLeft <= 5) {
//   $('#timer').addClass('blink').toggleClass('blink');
// };


// windows onload end
})
