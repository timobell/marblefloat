function mapvalue(min_in, max_in, min_out, max_out, value) {
    return (max_out-min_out)/(max_in-min_in)*value + min_out;
}

function movement() {
    if (havecontroller) {
        xmove = contro.leftStick.x;
        ymove = contro.leftStick.y;
        leftcontrollerStick.x = 150+xmove*45;
        leftcontrollerStick.y = height-75+ymove*45;
    } else {
        // No gamepad controller
        var x = 0;
        var y = 0;
        if (leftcontroller.mouse.dragging()) {
            x = leftcontroller.mouse.x;
            y = leftcontroller.mouse.y;
            if (x<-100) x = -100;
            if (x> 100) x = 100;
            if (y<-100) y = -100;
            if (y> 100) y = 100;
        }
        xmove = -x/100; //(150-x);
        ymove = -y/100; //(height-75-y)/45;
    }
    gfactor = mapvalue(1, -1, 500, 1000, contro.rightStick.y);
    ball.applyForce(gfactor*xmove, gfactor*ymove);
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
}
