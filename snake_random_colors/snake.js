$(document).ready(function(){

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var gridNum = 20;
var gridSize = canvas.width/gridNum;

var player = {
	x: 7,
	y: 7,
	//right -0, left - 1, up - 2, down -3, stopped -5
	direction: 5,
	alive: true,
	tail:1

};

var food ={
	x:0,
	y:0,
};
var snakeBody = [[7,7]];
var snakeColour = ["rgb(0,0,0)"]

var keyPressed = null;
var leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;

Array.prototype.insert = function(index, item){
	this.splice(index, 0, item)
}



function update(){
	
	if(keyPressed){

		if (keyPressed == rightKey && player.direction!= 1)player.direction = 0;
		if (keyPressed == leftKey && player.direction!= 0)player.direction = 1;
		if (keyPressed == upKey && player.direction!= 3)player.direction = 2;
		if (keyPressed == downKey && player.direction!= 2)player.direction = 3;
		}
       if (!food.alive){
       	food.x = Math.floor(Math.random()*gridNum);
       	food.y = Math.floor(Math.random()*gridNum);

       	var collided;

       	do {
       		collided = false;
       		for(var i = 0; i < player.tail; i++){
       			if(food.x == snakeBody[i][0] && food.y == snakeBody[i][1]){
       				collided = true; 
       			
       				food.x = Math.floor(Math.random()*gridNum);
         			food.y = Math.floor(Math.random()*gridNum);
         			break;
         		}
       		}


       	} while(collided)

       	//food is OK
       	food.alive = true;
	}

	//check if player eats food
	if(player.x == food.x && player.y == food.y){
		food.alive = false;
		player.tail ++;
            //generate random color
            var hue = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
            snakeColour.push(hue);
       }

       //check game over
       //snake hits border of game
       if(player.x < 0 || player.x >= gridNum || player.y < 0 || player.y >= gridNum){
       	player.alive = false;
       	clearInterval(updates);
       }

       //snake hits itself (game over)
       if(player.tail > 1){
       	for(var i = 1; i < player.tail ; i++){
       		if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1]){
       			player.alive = false;
       			clearInterval(updates);
       		}
       	}
       }

       //player/snake move

       
       snakeBody.insert(0,[player.x, player.y]);
       while(snakeBody.length > player.tail + 1){
       	snakeBody.pop();
       }
       switch(player.direction){
       	//right
       	case 0: player.x += 1; break;
       	//left
       	case 1: player.x -= 1; break;
       	//up
       	case 2: player.y -= 1; break;
       	//down 
       	case 3: player.y += 1; break;
       }
       if(player.alive){
       	draw();
       }
	}

	//draw
	function draw(){
		//clear last frame
		context.clearRect(0, 0, canvas.width, canvas.height);
		//draw food
		context.fillStyle = "cyan";
		context.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
            //Drawing the snake 
      for(var i = 0; i < player.tail; i++){
            context.fillStyle = snakeColour[i];
            context.fillRect(snakeBody[i][0] * gridSize, snakeBody[i][1] * gridSize, gridSize, gridSize);
      }
	}

	//keydown
	$(window).on("keydown", function(event){
		keyPressed = event.which;
	});

	//start updates
	update();
	var updates = setInterval(update, 100);



});









