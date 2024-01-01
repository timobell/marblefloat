let marblemin = 10;
let marblemax = 50;

var ball;
var gfactor;
var marbles;
var gameover;
var gamestart;
var gameend;
var leftcontroller;
var leftcontrollerStick;
var xmove;
var ymove;
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
	new Canvas(windowWidth, windowHeight);
	
	allSprites.remove();
	
	ball = new Sprite(500,500);
	ball.diameter = 50;
	ball.drag = 2;
	ball.mass = 10;
	ball.color = 'blue';
	
	box = new Sprite(500,500-75,2200,2200,'s');
	box.stroke = 'black';
	box.shape = 'chain';
	
	marbles = new Group();
	
	leftcontroller = new Sprite(150,height-75,'s');
	leftcontroller.diameter = 100;
	leftcontroller.fill = 'gray';

	leftcontrollerStick = new Sprite(150,height-75,'s');
	leftcontrollerStick.diameter = 30;
	leftcontrollerStick.fill = 'gray';

	gamestart = frameCount;
	gameover = false;
	allSprites.autoCull = false;
	textSize(50);
	neu = new Sprite(width/2,height/2+50,150,50,'s');
	neu.y = 50000;
	neu.text = 'start';
	neu.textAlign = CENTER;

	//design
	hintergrund = new Sprite(500,500,4000,4000,'n');
	hintergrund.img = 'fliesen.avif';
	hintergrund.layer = 0;
}

function drawController() {
}

function draw() {
	if (!gameover) {
		clear();
		havecontroller = contro.length > 0;

		if (havecontroller) {
			background('gray');
		} else {
			background('lightgreen');
			leftcontrollerStick.remove();
		}
		movement();
		renderStats();
		if (ball.colliding(marbles)) {
			gameover = true;
			gameend = frameCount;
		}
		if (frameCount%60 == 0) {
			spawnMarble();
		}
		camera.x = ball.x;
		camera.y = ball.y;
	} else {
		marbles.remove();
		ball.remove();
		background('black');
		fill('yellow');
		textAlign(CENTER);
		neu.y = camera.y + 40;
		neu.x = camera.x;
		text(`game over ${gameend-gamestart}`, width/2, height/2);
		renderStats();
		if (contro.pressing('a') || neu.mouse.pressed()) {
			setup();
		}
	}

}
