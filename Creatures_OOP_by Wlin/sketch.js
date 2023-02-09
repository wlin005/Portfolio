// create our creature class
// let myFont;

// function preload(){
//   myFont = loadFont('FZSTK, ttf');
// }


class Creature {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.friction = new createVector(0, 0); 
    this.desired = new createVector(0, 0); 
    this.diameter = random(10,20);
    this.speedLimit = random(1,this.diameter/10);
    this.CreatureState = hungry;
  }

  moveToFood(x, y){

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (direction.mag() < this.diameter/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 
  
    //only move if they are close to the target x & y locations
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);
    }

    return false;
  } 
 
  update() {

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);


    // Bounce off edges (updated from last term to work better with canvas resize)
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // Display circle at location vector
    noStroke();
    //circle(this.location.x,this.location.y,this.diameter);
    //textFont(myFont);
    textSize(this.diameter);
    text('╰(*°▽°*)╯', this.location.x,this.location.y);
    
    //change the colour
    if(this.CreatureState == hungry) {
       fill(50, 255, 250);
    }
    else {
       fill(255,0,100);
       
    }
  }
}



class Creature1 {
  // this constructor is called when we define new Creature(...)
  constructor(_x, _y) {
    this.location = new createVector(_x, _y);  // Location of shape
    this.velocity = new createVector(random(-2,2),random(-2,2));  // Velocity of shape
    this.friction = new createVector(0, 0); 
    this.desired = new createVector(0, 0); 
    this.diameter = random(10,40);
    this.speedLimit = random(1,this.diameter/10);
  }

  moveToFood(x, y){

    this.desired.x = x;
    this.desired.y = y;
    let direction = p5.Vector.sub(this.desired, this.location); // gets vector between these two points

    // mag / magnitude is the length of the distance between the two points
    if (direction.mag() < this.diameter/2){
      return true; //stops moving as it returns before adding direction to velocity below
    } 
  
    //only move if they are close to the target x & y locations
    if(direction.mag() < 200){
      direction.normalize(); //normalize gives us the unit vector of length 1 (i.e. just the direction )
      this.velocity.add(direction);
    }

    return false;
  } 
 
  update() {

    this.friction.x = this.velocity.x * -1;
    this.friction.y = this.velocity.y * -1;
    this.friction.normalize();
    this.friction.mult(0.01);
    this.velocity.add(this.friction);

    //limit how fast each one can go
    this.velocity.limit(this.speedLimit);
    // Add velocity to the location.
    this.location.add(this.velocity);


    // Bounce off edges (updated from last term to work better with canvas resize)
    if (this.location.x > width){
      this.location.x = width;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.x < 0) {
      this.location.x = 0;
      this.velocity.x = this.velocity.x * -1;
    }
    if (this.location.y < 0) {
      this.location.y = 0;
      this.velocity.y = this.velocity.y * -1;
    }
    if (this.location.y > height) {
      this.location.y = height;
      this.velocity.y = this.velocity.y * -1; 
    }
  
    // Display circle at location vector
    noStroke();
    push();
    fill(255,200,0);
    circle(this.location.x,this.location.y,this.diameter);
    pop();
  }
}

//Main sketch below
// an array to store the creatures
let creatures = [];
let button;
let food =[];
let hungry = 0;
let full = 1;

function setup() {

  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 4;
  cnv.position(x, y);
  background(255, 0, 200);
  //canvas = createCanvas(600, 600);
  //canvas.parent("sketch-container"); //move our canvas inside this HTML element

  for(let i = 0; i < 50; i++){
    let c = new Creature(random(width), random(height));
    creatures.push(c);
  }

  addGUI();
}

function draw() {
  background(200);


    // loop through all the creatrure and animate them each frame by accessing their update function
  for (let c of creatures) {
    c.update();
    
    //make food dispear
    for(let j = food.length-1; j >= 0 ; j--){
      food[j].update();
     
     if(c.diameter > 50){
      c.CreatureState = full;
     } else if (c.diameter > 0 && c.diameter < 50){
      c.CreatureState = hungry;
     }

      if (dist(c.location.x, c.location.y, food[j].location.x, food[j].location.y) < 200 ){    
        if(c.moveToFood(food[j].location.x,food[j].location.y)){ 
          console.log("Arrived");

          if(c.CreatureState == hungry) {
            c.diameter += 10;
          }
           food[j].diameter--;

        }

    
      }

      setTimeout(function(){
        if(c.diameter > 20) {
          c.diameter -= 0.1;
        }
      }, 5000);

      if(food[j].diameter <2){
       food.splice(j,1);
       
       }
    }
  
  }


}

function addGUI()
{

  //add a button
  button = createButton("FEED");
  button.parent("gui-container");
  button.addClass("button");
//buttom.position 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
  let d = new Creature1(random(width), random(height));
  food.push(d);
  console.log("Pressed");
    
}


