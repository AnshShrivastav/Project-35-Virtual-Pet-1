//Create variables here
var dog,dogImage,dogHappy, database, foodS, foodStock;

function preload()
{
	//load images here
  dogImage=loadImage("images/dogImg.png");
  dogHappy=loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);

  dog=createSprite(250,380,10,10);
  dog.addImage(dogImage);
  dog.scale=0.3;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);


  
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImage);
  }

  if(keyWentDown(80)){
    foodS=foodS+1;
  }

  dog.display();

  drawSprites();
  //add styles here
  textSize(15)
  stroke(10);
  fill(52,60,20);
  text("Note: Press UP_ARROW key to feed Tommy Milk!",80,20)
  textSize(15)
  stroke(10);
  fill(52,60,20);
  text("Food Stock: "+foodS,220,200);
  textSize(15)
  stroke(10);
  fill(52,60,20);
  text("Press p to purchase Milk",150,50);


}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
