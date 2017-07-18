// windows onload
$(() => {


// const foodArray = ["cake", "blueberry", "strawberry", "cupcake", "vanilla frosting", "chocolate frosting", "coffee", "smoothie", "hamburger", "hot dog", "ketchup", "lettuce"];





const customer1 = {
  happiness: false,
  orderArr: ["blueberry", "cake", "coffee"],
  payForOrder() {
    if(this.happiness === true) {
      player.coins++;
      player.xp++;
    }
  }
};

const player = {
  coins: 0,
  xp: 0,
  orderCompletedArr: [],
  checkOrder() {
    // check if two arrays match
    if(this.orderCompletedArr.length === customer1.orderArr.length) {
      for(let i = 0; i < customer1.orderArr.length; i++) {
         if(customer1.orderArr[i] !== this.orderCompletedArr[i]) {
           customer1.happiness = false;
           console.log("arrays don't match");
           return false; //ends loop
         }
      }
      customer1.happiness = true;
      console.log("Items match");
    } else {
      customer1.happiness = false;
      console.log("Arrays are different lengths");
    }

  }


};

// If orderCompletedArr equals orderArr, customer's happiness=True






$('li').addClass('menu-items');

$('.menu-items').on('click', (e) => {
  const menuText = $(e.currentTarget).text().toLowerCase();
  player.orderCompletedArr.push(menuText);
  console.log(player.orderCompletedArr);
});

// order finished button

$('button').on('click', (e) => {
  player.checkOrder();
  console.log(customer1.happiness);
});






// windows onload end
})
