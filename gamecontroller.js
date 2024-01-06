class GameControllerStick {
    constructor(cnv,name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.knobx = 0;
        this.knoby = 0;
        this.xmove = 0;
        this.ymove = 0;
        this.activetouch = [];

        this.circle = new Sprite(x,y,'k');
        this.circle.diameter = 100;
        this.circle.fill = 'lightgray'; 
        this.circle.layer = 3;
    
        this.knob = new Sprite(500,500,'n');
        this.knob.diameter = 50;
        this.knob.overlaps(this.circle);
        this.knob.fill = 'darkgray';
        this.knob.layer = 4;

        allSprites.overlaps(this.circle);
        allSprites.overlaps(this.knob);    

        cnv.canvas.addEventListener('touchstart',(event)=> (this.touchStart(event)));
        cnv.canvas.addEventListener('touchmoved',(event)=> (this.touchMoved(event)));
        cnv.canvas.addEventListener('touchend',(event)=> (this.touchEnd(event)));
    }
    update() {
        // Center of circle
        let newx=camera.x-width/2+this.x;
        let newy=camera.y-height/2+this.y;
        this.circle.x = newx;
        this.circle.y = newy;
        this.knob.x = newx + this.knobx;
        this.knob.y = newy + this.knoby;
        this.xmove = this.knobx/35;
        this.ymove = this.knoby/35;
    }
    visible(show=true) {
        this.circle.visible = show;
        this.knob.visible = show;
    }
    touchStart(event) {
        let touch = event.changedTouches[0];
        let x = touch.clientX;
        let y = touch.clientY;
        if (this.x-100 < x && this.x+100 > x) {
            if (this.y-100 < y && this.y+100 > y) {
                if (this.activetouch.length === 0) {
                    this.activetouch = [touch.identifier];
                }
            }
        }
    }
    touchMoved(event) {
        for (var i=0; i<event.changedTouches.length; i++) {
            let touch = event.changedTouches[i];
            if (this.activetouch.length === 1 && this.activetouch[0] === touch.identifier) {
                let l = Math.sqrt((touch.clientX-this.x)**2 + (touch.clientY-this.y)**2);
                this.knobx = touch.clientX - this.x;
                this.knoby = touch.clientY - this.y;
                if (l > 35) {
                    this.knobx = 35*(touch.clientX - this.x)/l;
                    this.knoby = 35*(touch.clientY - this.y)/l;
                }
            }
        }
    }
    touchEnded(event) {
        for (var i=0; i<event.changedTouches.length; i++) {
            let touch = event.changedTouches[i];
            if (this.activetouch.length === 1 && this.activetouch[0] === touch.identifier) {
                this.activetouch = [];
                this.knobx = 0;
                this.knoby = 0;
            }
        }
    }
}
