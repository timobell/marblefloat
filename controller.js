function mapvalue(min_in, max_in, min_out, max_out, value) {
    return (max_out-min_out)/(max_in-min_in)*value + min_out;
}

function movement() {
    // gfactor = -20 * contro.rightStick.y +35;
    // world.gravity.x = gfactor* contro.leftStick.x;
    // world.gravity.y = gfactor* contro.leftStick.y;
    // if (kb.pressed('space')) {
    //     world.gravity.x = 0;
    //     world.gravity.y = 0;
    // }

    // if (world.gravity.x < -gfactor) {
    //     world.gravity.x = -gfactor;
    // }
    // if (world.gravity.x > gfactor) {
    //     world.gravity.x = gfactor;
    // }
    // if (world.gravity.y < -gfactor) {
    //     world.gravity.y = -gfactor;
    // }
    // if (world.gravity.y > gfactor) {
    //     world.gravity.y = gfactor;
    // }
    // gfactor = -400 * contro.rightStick.y + 500;
    gfactor = mapvalue(1, -1, 500, 1000, contro.rightStick.y);

    ball.applyForce(gfactor* contro.leftStick.x, gfactor* contro.leftStick.y);
    if (kb.pressed('space')) {
        ball.vel.x = 0;
        ball.vel.y = 0;
    }

    if (ball.vel.x < -gfactor) {
        ball.vel.x = -gfactor;
    }
    if (ball.vel.x > gfactor) {
        ball.vel.x = gfactor;
    }
    if (ball.vel.y < -gfactor) {
        ball.vel.y = -gfactor;
    }
    if (ball.vel.y > gfactor) {
        ball.vel.y = gfactor;
    }

    // marbles
    for (var i=0; i<marbles.length; i++) {
        let d = marbles[i].diameter;
        let Fx = (ball.x-marbles[i].x)*mapvalue(marblemin,marblemax,0.4,1.2,marblemax-d);
        let Fy = (ball.y-marbles[i].y)*mapvalue(marblemin,marblemax,0.4,1.2,marblemax-d);
        marbles[i].applyForce(Fx,Fy);
    }
    // marbles.moveTowards(ball,0.1);
    
}