var dogpic, dogpic2;
var database;
var foodS, foodStock;
var dog;

function preload()
{
  dogpic = loadImage("images/dogImg.png");
  dogpic2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,5,5);
  dog.addImage(dogpic);
  dog.scale = 0.2;

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dogpic2);
  }

  textSize(20);
  fill("red");
  stroke("red")
  text("Food Remaining: "+foodS,170,170);
  text("Note: Press the Up Arrow to Feed the Dog!",30,30)

  drawSprites();

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x<= 0) {
    x = 20;
  } else {
    x = x - 1;
  }

  database.ref("/").update({
    Food: x
  })
}