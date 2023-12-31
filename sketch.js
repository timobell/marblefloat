let ball;
var gfactor= 10;
let marbles;
let gameover = false;
let marblemin = 10;
let marblemax = 50;

function spawnMarble() {
	marble = new marbles.Sprite(random(marblemax,width - marblemax), random(marblemax, height -marblemax));
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
	
	ball = new Sprite();
	ball.diameter = 50;
	ball.drag = 2;
	ball.mass = 10;

	box = new Sprite(width/2,height/2,width,height,'s');
	box.shape = 'chain';

	marbles = new Group();
	// for (var i = 0; i < 10; i++) {
	// 	spawnMarble();
	// }


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
		}
		if (frameCount%60 == 0) {
			spawnMarble();
		}

	} else {
		delete allSprites;
		background('black');
		textSize(50);
		fill('yellow');
		textAlign(CENTER);
		text(`game over ${frameCount}`, width/2, height/2);
	}

}
