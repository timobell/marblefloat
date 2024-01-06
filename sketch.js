let marblemin = 10;
let marblemax = 50;

var ball;
var gfactor;
var marbles;
var gameover;
var gamestart;
var gameend;
var leftStick;
var rightStick;
var xmove;
var ymove;
var gstick;
var havecontroller;

function spawnMarble() {
	marble = new marbles.Sprite(random(marblemax,1000 - marblemax), random(marblemax, 1000-150-marblemax));
	marble.collider = 'd';
	marble.diameter = random(marblemin,marblemax);
	marble.drag = 1;
	marble.mass = 20;
	marble.color = 'red';
	marble.bounciness = 1;
	marble.vel.x = random(-5,5);
	marble.vel.y = random(-5,5);
}

function setup() {
	let cnv = new Canvas(windowWidth, windowHeight);
	
	allSprites.remove();
	
	ball = new Sprite(500,500);
	ball.diameter = 50;
	ball.drag = 2;
	ball.mass = 10;
	ball.color = 'blue';
	ball.layer = 1;
	
	box = new Sprite(500,500-75,2200,2200,'s');
	box.strokeWeight = 3;
	box.stroke = 'black';
	box.shape = 'chain';
	
	marbles = new Group();
	

	leftStick = new GameControllerStick(cnv,"left", 100,height-100);
	leftStick.visible(!gameover);
	rightStick = new GameControllerStick(cnv,"right", width-100,height-100);
	rightStick.visible(!gameover);

	gamestart = frameCount;
	gameover = false;
	allSprites.autoCull = false;
	textSize(50);
	neu = new Sprite(width/2,height/2+50,150,50,'s');
	neu.y = 50000;
	neu.text = 'start';
	neu.textAlign = CENTER;
	
	hintergrund = new Sprite(500,425,3200,3200,'n');
	hintergrund.img = 'fliesennnn.png';
	hintergrund.layer = 0;

	marbles.layer = 1;
	
}

function drawCircle(x,y) {
	ellipse(x, y, 50, 50);
	return false;
}

function draw() {
	if (!gameover) {
		clear();
		havecontroller = contro.length > 0;
		background('gray');
		movement();
		renderStats();
		if (ball.colliding(marbles)) {
			gameover = true;
			leftStick.visible(!gameover);
			rightStick.visible(!gameover);
			gameend = frameCount;
		}
		if (frameCount%60 == 0) {
			spawnMarble();
		}
		camera.x = ball.x;
		camera.y = ball.y;
		leftStick.update();
		rightStick.update();
	} else {
		marbles.remove();
		ball.remove();
		hintergrund.remove();
		background('black');
		fill('yellow');
		textAlign(CENTER);
		neu.y = camera.y + 40;
		neu.x = camera.x;
		text(`game over ${gameend-gamestart}`, width/2, height/2);
		renderStats();
		if (contro.pressing('a') || neu.mouse.pressed()) {
			setup();
			leftStick.visible(!gameover);
			rightStick.visible(!gameover);
		}
	}

}
