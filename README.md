# rachelchhay.github.io
Project 1

https://rachelchhay.github.io/

Languages/Technologies used:

Most of the items on my page are in my HTML. The timer, new menu items, customer order, orders ready, and Next Round button are appended to the page with jQuery as the game goes along. The Next Round button and timer show up for Round 2 and 3. The Next Round button is turned off during Round 2 and removed during Round 3 because that's the last round. 

I used CSS to style my page with color, background, and hover/active effects. I went for a 50's retro diner theme. I used Google Fonts for all my fonts. I sited my sources for the speech bubbles, the green buttons, and the modal. I modified the code that I found on those sites. 

For the audio, I downloaded sound clips online and used Audacity to cut the length of the sound. I used LAME to convert the audio to an MP3 file format to export them into my code. 

Approach Taken:

I got the inspiration from Cooking Fever. Customers come in with orders, you move food around to cook the food, and then drag it to the customers. The whole round is timed and each customer has it's own timer. If you don't return food in a timely manner, the customer gets mad and leaves. The more customers you get through, the more coins and XP you get to move to the next round. You have a chance to buy/upgrade kitchen appliances. 

I scaled down my game A LOT. So the customer order pops up. It's a random number of order items, which increases with each round. The player clicks on the menu items and that food item pops up into the orders ready speech bubble. It's like the player has made the food and it's done. You like the "Order Up" button to "give" the food to the customer and your coins and XP will increase if the customer is happy. I used 2 arrays, one for the customer order and one for what the player has clicked. If the arrays match, the customer is happy (happiness=true) and will +1 to coins, +2 to XP, and -1 to customers left. If the customer is unhappy (happiness=false), coins and XP are deducted and customers left stays the same. I have a "Next Customer" button so you can control when the next order comes in. Once you get 4 coins, you go into round 2 if you want to continue. There's a "Next Round" button for when you're ready to start.

In round 2, a timer is added. 3 new menu items are also added. If you can't get 9 total coins in the time given, you lose. The timer starts blinking at 10s, so you know the time is almost up. I used the .toggleClass() jQuery method to make my timer blink. This round is harder because there are 5 customers (there were 4 in Round 1), and their orders are larger (but still a random amount). Once you've reached 9 coins, you can go on to round 3. 

In round 3, there's still a timer and 3 more menu items are added. There's 6 customers, and you have to get 15 coins to win the game. This round is the hardest. I had to add time to this round because it was too hard. 

The "directions" button open up a modal that explains the game to the user. They can click this at any time. 

Unsolved Problems:

- I need a way to where you can click on an item in Orders Ready to remove it in case you mess up. Possibly a way to restart a round if you mess up.
- When appending the timer, a blank bubble pops up for about a second before the text does.
- I made a function to turn off the Next Customer button, so the player can't just keep pressing it if they don't have enough coins left. The function kept breaking my game on Sunday night, so I left it in but I didn't call it anywhere. 
  Possible logic:
  if(player.customersLeft === 0 && player.coins === 4)
  else if(player.customersLeft === 0 && player.coins === 9)
  else if (player.customersLeft === 0 && player.coins === 15)
  else {nextOff()}
  
- I didn't know how to make it to where you click outside of the modal to make it go away. I wasn't sure how to select window in jQuery.
  
Possible Additions:

- Need more functionality for the XP. Maybe you can gain more time if you have a certain amount of XP. 
- I could shuffle the menu items each round using the Fisher-Yates shuffle.
- I could have an actual customer animated it when the speech bubble text changes.
- I can add animation effects to the speech bubble texts.
- Audio added for when timer hits 10s.

