let marblemin = 10;
let marblemax = 50;

var ball;
var gfactor;
var marbles;
var gameover;
var gamestart;
var gameend;
var leftcontroller;
var xmove;
var ymove;

function spawnMarble() {
	marble = new marbles.Sprite(random(marblemax,width - marblemax), random(marblemax, height-150-marblemax));
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
	
	ball = new Sprite();
	ball.diameter = 50;
	ball.drag = 2;
	ball.mass = 10;
	ball.color = 'blue';

	box = new Sprite(width/2,height/2-75,width,height-150,'s');
	box.shape = 'chain';

	marbles = new Group();

	controllercircle = new Sprite(150,height-75,'s');
	controllercircle.diameter = 100;
	controllercircle.fill = 'gray';
	controllercircle.shape = 'chain';

	leftcontroller = new Sprite(150,height-75,'s');
	leftcontroller.diameter = 30;
	leftcontroller.fill = 'gray';

	gamestart = frameCount;
	gameover = false;
	allSprites.autoCull = false;
}

function draw() {
	if (!gameover) {
		clear();
		background('gray');
		line(ball.x, ball.y, ball.x + ball.vel.x * 5,ball.y + ball.vel.y * 5);
		movement();
		renderStats();
		if (ball.colliding(marbles)) {
			gameover = true;
			gameend = frameCount;
		}
		if (frameCount%60 == 0) {
			spawnMarble();
		}

	} else {
		marbles.remove();
		ball.remove();
		background('black');
		textSize(50);
		fill('yellow');
		textAlign(CENTER);
		text(`game over ${gameend-gamestart}`, width/2, height/2);
		if (contro.pressing('a')) {
			setup();
		}
	}

}
