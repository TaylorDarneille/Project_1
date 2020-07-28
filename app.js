// variable
let movementDisplay;
let ctx
let game;
let killa;
let demon;
let bullet;
let demonBullet;
// empty array to push bullets to
let bullets = []
//empty array to push demons to
let demonArray = []
let demonArrayTwo = []
// empty array to push demonBullets
let demonBullets = []
let canvas = document.getElementById('game')
let gw = canvas.width; //800;
let gh = canvas.height; //400;
let timePassed = 0;
let timePassedTwo = 0;
let randX = Math.floor(Math.random() * (720));
let randY = Math.floor(Math.random() * (300));


setInterval(fireDemonBullet, 1000);

function time() {
    timePassed += 250;
    demonMovement();
}
// game time updated every 250ms
setInterval(time, 250);

function timeTwo() {
    timePassedTwo += 200;
    demonMovementTwo();
}
// game time updated every 200ms
setInterval(timeTwo, 200);

// Crawler Constructor function
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
  this.xDirection = true;
  this.yDirection = true;
  this.xDirectionTwo = true;
  this.yDirection = true;
  this.render = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  // created render method to pass in x and y of bullet, could be other objects.
  this.renderCoords = function(x, y){
    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);
  }
}

const detectHit = () => {
  // check for collision on x axis
  // if the killa's bottom value is > demon's top value
  // loop through bullet array to check if hitting target
//   console.log(bullets)
//   console.log(demonArray)
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < demonArray.length; j++){
            if (bullets[i].x + bullet.width > demonArray[j].x &&
                bullets[i].x < demonArray[j].x + demonArray[j].width &&
                bullets[i].y + bullet.height > demonArray[j].y &&
                bullets[i].y < demonArray[j].y + demonArray[j].height) {
                  demonArray[j].alive = false;
            }
        }
    }
    for (let i = 0; i < bullets.length; i++){
        for (let j = 0; j < demonArrayTwo.length; j++){
            if (bullets[i].x + bullet.width > demonArrayTwo[j].x &&
                bullets[i].x < demonArrayTwo[j].x + demonArrayTwo[j].width &&
                bullets[i].y + bullet.height > demonArrayTwo[j].y &&
                bullets[i].y < demonArrayTwo[j].y + demonArrayTwo[j].height) {
                  demonArrayTwo[j].alive = false;
            }
        }
    }  
 if (demon.x + demon.width > killa.x &&
    demon.x < killa.x + killa.width &&
    demon.y + demon.height > killa.y &&
    demon.y < killa.y + killa.height) {
      killa.alive = false;
    }
}

const gameLoop = () => {
  // clear the cavas
  ctx.clearRect(0, 0, game.width, game.height);
  // display the x, y coordinates of our killa onto the DOM
  movementDisplay.textContent = `X:${killa.x}\nY:${killa.y}`;
  // check if the demon is alive and 
  for (let i = 0; i < bullets.length; i++){
      bullets[i].y -=25
      bullet.renderCoords(bullets[i].x, bullets[i].y);
  }
  for (let i = 0; i < demonArray.length; i++){
      if (demonArray[i].alive) {
        // render the demon
        demonArray[i].render()
        // bullet.render()
        // demonBullet.render()
        for (let i = 0; i < demonBullets.length; i++){
            demonBullets[i].y +=25
            demonBullet.renderCoords(demonBullets[i].x, demonBullets[i].y);
        }
        // check for collision
        detectHit()
    }

    }
    for (let i = 0; i < demonArrayTwo.length; i++){
        if (demonArrayTwo[i].alive) {
          // render the demon
          demonArrayTwo[i].render()
          // bullet.render()
          // demonBullet.render()
          for (let i = 0; i < demonBullets.length; i++){
              demonBullets[i].y +=25
              demonBullet.renderCoords(demonBullets[i].x, demonBullets[i].y);
          }
          // check for collision
        //   detectHit()
      }
  
      }
  // render the killa
  killa.render()
}

// making new bullet object at x and y coordinates 
function fireBullet(){
    bullets.push({
        x: bullet.x + killa.width/2 - bullet.width/2,
        y: bullet.y + killa.height/2 - bullet.height/2
    })

}
// making new demonBullet object at x and y coordinates
function fireDemonBullet(){
    for (let i = 0; i < demonArray.length; i++)
    demonBullets.push({
        x: demonBullet.x + demonArray[i].width/2 - demonBullet.width/2,
        y: demonBullet.y + demonArray[i].height/2 - demonBullet.height/2
    })
    

}

const movementHandler = e => {
   
  //  a:65, d:68
  switch (e.keyCode) {
    case (37): // < left
     if (killa.x > 0){
        killa.x -=25
        bullet.x -=25
    } 
      break;
    case (39): // > right
      if (killa.x + killa.width < game.width) {
        killa.x +=25
        bullet.x +=25
      }   
      break;
    case (32): // space up
        if (killa.x < game.width) {
            // bullet.y -=25
            fireBullet()
        }
        break;        
    }  
  
}

  document.addEventListener('DOMContentLoaded', () => {
  console.log('Dom loaded')
  // DOM REFS
  movementDisplay = document.getElementById('movement');
  game = document.getElementById('game');
  // CANVAS CONFIG
  game.setAttribute('height', 400);
  game.setAttribute('width', 800);
  ctx = game.getContext('2d');
  // CHARACTER REFS
  killa = new Crawler(320, 355, 50, 50, 'purple');
  bullet = new Crawler(killa.x, killa.y, 10, 30, 'green');
  demonBullet = new Crawler (demon.x, demon.y, 10, 10, 'blue');
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})

for (let i=0; i <= 1; i++) {
    // make a new demon object
    let randX = Math.floor(Math.random() * (720));
    let randY = Math.floor(Math.random() * (300));
    demon = new Crawler(randX, randY, 80, 20, 'red');
    // push the new demon object into the demons array
    demonArray.push(demon);
}
console.log(demon.x)
console.log(demon.y)

function demonMovement(){
// a function to update the demons position with every frame.
  for (let i = 0; i < demonArray.length; i++) {
      if (timePassed % 2000 == 0){
          demonArray[i].xDirection = !demonArray[i].xDirection
          demonArray[i].yDirection = !demonArray[i].yDirection
        }
        // defining movement for demon.y axis
        if(demonArray[i].y >= 0 && demonArray[i].y <= 300 ) {
            if (demonArray[i].yDirection == true){
                demonArray[i].y +=4
                demonBullet.y +=4    
            } else {
                demonArray[i].y -=4
                demonBullet.y -=4
            }
        }
        // defining movement for demon.x axis
        if (demonArray[i].x >= 0 && demonArray[i].x <= 720) {
            if (demonArray[i].xDirection == true){
                demonArray[i].x +=3  
                demonBullet.x +=3 
            } else {
                demonArray[i].x -=3 
                demonBullet.x -=3 
            }          
        }
    }
}
// demonTwo
for (let i=0; i <= 1; i++) {
    // make a new demon object
    let randX = Math.floor(Math.random() * (720));
    let randY = Math.floor(Math.random() * (300));
    demonTwo = new Crawler(randX, randY, 80, 20, 'orange');
    // push the new demon object into the demons arrayTwo
    demonArrayTwo.push(demonTwo);
}
console.log(demonTwo.x)
console.log(demonTwo.y)

function demonMovementTwo(){
// a function to update the demons position with every frame.
  for (let i = 0; i < demonArrayTwo.length; i++) {
      if (timePassedTwo % 2000 == 0){
          demonArrayTwo[i].xDirectionTwo = !demonArrayTwo[i].xDirectionTwo
          demonArrayTwo[i].yDirectionTwo = !demonArrayTwo[i].yDirectionTwo
        }
        // defining movement for demonTwo.x axis
        if (demonArrayTwo[i].x >= 0 && demonArrayTwo[i].x <= 720) {
            if (demonArrayTwo[i].xDirectionTwo == true){
                demonArrayTwo[i].x +=10
                
            } else {
                demonArrayTwo[i].x -=10
                
            }          
        }
    }
}

























