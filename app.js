// windows onload
$(() => {

  $('#directions').on('click', (e) => {
    $('#buttonAudio')[0].play();
    $('.modal').fadeIn();
  });

  $('.close-modal').eq(0).on('click', (e) => {
    $('#buttonAudio')[0].play();
    $('.modal').fadeOut();
  });





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
      $('.player li').remove();
    } else {
      player.coins--;
      player.xp-=2;
      $('#coins').text('Coins: ' + player.coins);
      $('#xp').text('XP: ' + player.xp);
      $('#customers-left').text('Customers Left: ' + player.customersLeft);
      // reset customer properties
      $('.customer li').remove();
      $('.player li').remove();
    }
  }
};


// player object========================================
const player = {
  coins: 0,
  xp: 0,
  customersLeft: 4,
  orderCompletedArr: [],
  checkOrder() {
    // check if two arrays match
    if(this.orderCompletedArr.length === customer.orderArr.length) {
      for(let i = 0; i < customer.orderArr.length; i++) {
         if(customer.orderArr[i].toLowerCase() !== this.orderCompletedArr[i]) {
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

// player can't click Next Customer below 0
const nextOff = () => {
  $('#next').off('click');
};


// start game round 1 ======================================
let round = 0;
const start = () => {
  customer.randomFood((Math.floor(Math.random() * (4 - 2)) + 3) + round);

  customer.customerOrder();
}
start();

// round class ========================================

const newMenuItem = (str) => {
  $('#menu').append($('<li>').addClass('menu-items').text(str).on('click', (e) => {
    $('#buttonAudio')[0].play();
    const menuText = $(e.currentTarget).text().toLowerCase();
    player.orderCompletedArr.push(menuText);
    const orderReady = $('<li/>').html($(e.currentTarget).text());
    $('.player').append(orderReady);
  }));
}

class Rounds {
  addMenuItem (str1, str2, str3) {
    menu.push(str1, str2, str3);
    newMenuItem(str1);
    newMenuItem(str2);
    newMenuItem(str3);
  }
  changeCustomersLeft (num) {
    player.customersLeft = num;
    $('#customers-left').text('Customers Left: ' + player.customersLeft);
  }
};

const secondRound = new Rounds();
const thirdRound = new Rounds();

// Set Timer Function =======================================
let timeLeft = 90;
let startInterval;
const timer = () => {
  startInterval = setInterval( () => {
    $('#timer').text("Timer: " + timeLeft);
    if(timeLeft <= 10) {
      $('#timer').toggleClass('blink');
    };
    if(timeLeft === 0) {
      clearInterval(startInterval);
    };
    if(player.coins < 15 && timeLeft === 0) {
      setTimeout( function () {alert("You lose. You ran out of time.")}, 1000);
      setTimeout( function () {location.reload(true)}, 2000);
    };
    timeLeft--;
     }, 1000);

}


// click events =============================================
$('#menu li').addClass('menu-items');

$('.menu-items').on('click', (e) => {
  $('#buttonAudio')[0].play();
  const menuText = $(e.currentTarget).text().toLowerCase();
  player.orderCompletedArr.push(menuText);
  const orderReady = $('<li/>').html($(e.currentTarget).text());
  $('.player').append(orderReady);


});

$('#order-up').on('click', (e) => {
  $('#orderUpAudio')[0].play();
  player.checkOrder();
  customer.payForOrder();
  console.log(player.customersLeft);

  // win or lose the game
  if(player.coins <= 0 || player.xp <= 0) {
    setTimeout( function () {alert("You lose :(")}, 1000);
    setTimeout( function () {location.reload(true)}, 2000);
  } else if(player.coins === 18) {
    setTimeout( function () {alert("You win!")}, 1000);
    setTimeout( function () {location.reload(true)}, 2000);
  };


});

$('#next').on('click', (e) => {
    $('#buttonAudio')[0].play();
    customer.orderArr = [];
    player.orderCompletedArr = [];
    start();

  // ROUND 2 ====================================
    if(player.coins === 4) {
      round = 2;
      const round2 = prompt("You have enough coins to go on to level 2! Would you like to keep going?", "yes/no");
      if(round2 === "yes" || round2 === "Yes" || round2 === "y") {
        alert("Click the Next Round button. WARNING: You only have 90 seconds to get 9 coins in this round!");

        $('.customer li').remove();

        $('#game-status').append($('<li>').attr('id', 'timer'));

        $('.buttons').append($('<button>').html('<span>Next Round</span>').attr('id', 'next-round'));

        $('#next-round').on('click', (e) => {
          $('#buttonAudio')[0].play();
          timer();
          secondRound.addMenuItem("Waffles", "Tater Tots", "Spaghetti");
          secondRound.changeCustomersLeft(5);
          customer.customerOrder();

          $('#next-round').off('click');
        });
      } else{
        setTimeout( function () {alert("Come back when you want to play!")}, 1000);
        setTimeout( function () {location.reload(true)}, 2000);
      }

    };


  // ROUND 3 ====================================
    if(player.coins === 9) {
      clearInterval(startInterval);
      round = 3;
      const round2 = prompt("You have enough coins to go on to level 3! Would you like to keep going?", "yes/no");
      if(round2 === "yes" || round2 === "Yes" || round2 === "y") {
        alert("Click the Next Round button. WARNING: You only have 80 seconds to get 15 coins to win the game!");

        $('.customer li').remove();

        $('#next-round').on('click', (e) => {
          timeLeft = 80;
          timer();
          thirdRound.addMenuItem("Pancakes", "Corn Dog", "Cookies");
          thirdRound.changeCustomersLeft(6);
          customer.customerOrder();
          $('#next-round').remove();
        });
      } else{
        setTimeout( function () {alert("Come back when you want to play!")}, 1000);
        setTimeout( function () {location.reload(true)}, 2000);
      }
    }
});


// windows onload end
})
