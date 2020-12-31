/**
 * To understand logic go to  Line 88 Collision->render() function. Required code is commented there.
 * 
 * @author Shreyansh Saha
 */


let mouseCircle = undefined;
let collisionRect = undefined;
let collision = undefined;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(120);
  mouseCircle = new Circle(50);
  collisionRect = new Rectangle(200, 200, 400, 400);
  collision = new Collision(mouseCircle, collisionRect);
}

function draw() {
  background(220);
  collisionRect.render();
  mouseCircle.render();
  collision.render();


  /**
   * Info Text; ignore this
   */
  textSize(18);
  text("Intuition for: https://leetcode.com/problems/circle-and-rectangle-overlapping/", 10, 30);

  textStyle(BOLD);
  text("Circle Details", windowWidth - 200, 40, windowWidth - 200 + 50, 40 + 50);
  textStyle(NORMAL);
  const circleDetails = mouseCircle.position();
  text(`X: ${circleDetails.x}`, windowWidth - 200, 60, windowWidth - 200 + 50, 60 + 50)
  text(`Y: ${circleDetails.y}`, windowWidth - 200, 80, windowWidth - 200 + 50, 80 + 50)
  text(`Radius: ${circleDetails.r}`, windowWidth - 200, 100, windowWidth - 200 + 50, 100 + 50)
  textStyle(BOLD);
  text("Collision Details", windowWidth - 200, 150, windowWidth - 200 + 50, 150 + 50)
  textStyle(NORMAL);
  const collisionDetails = collision.details();
  text(`Distance: ${Math.floor(collisionDetails.distance * 100) / 100}`, windowWidth - 200, 170, windowWidth - 200 + 50, 170 + 50)
  text(`Collided: ${collisionDetails.collided}`, windowWidth - 200, 190, windowWidth - 200 + 50, 190 + 50)

}

function Circle(radius) {
  this.x = undefined;
  this.y = undefined;
  this.radius = radius;

  this.position = () => {
    return { x: this.x, y: this.y, r: this.radius };
  }

  this.render = () => {
    this.x = mouseX;
    this.y = mouseY;

    push();
    strokeWeight(0);
    fill(255, 200, 200);
    circle(this.x, this.y, this.radius * 2)
    pop();
  }
}

function Rectangle(rx, ry, rw, rh) {
  this.x = rx;
  this.y = ry;
  this.w = rw;
  this.h = rh;

  this.details = () => {
    return { x: this.x, y: this.y, w: this.w, h: this.h };
  }

  this.render = () => {
    push();
    strokeWeight(2)
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

function Collision(circle, collision) {
  this.circle = circle;
  this.collision = collision;
  this.collided = false;
  this.distance = undefined;

  this.details = () => {
    return { distance: this.distance, collided: this.collided };
  }

  this.render = () => {
    /**
     * Gives x, y position of circle and radius
     */
    const circleDetails = this.circle.position();

    /**
     * Gives x, y position and width and height of rectangle
     * 
     * collision = reactangle
     */
    const collisionDetails = this.collision.details();

    /**
     * Calculate (x, y) point which is closest to circle on the rectangle
     */
    const tempX = (circleDetails.x < collisionDetails.x) ? collisionDetails.x : (circleDetails.x > collisionDetails.x + collisionDetails.w ? collisionDetails.x + collisionDetails.w : circleDetails.x);
    const tempY = (circleDetails.y < collisionDetails.y) ? collisionDetails.y : (circleDetails.y > collisionDetails.y + collisionDetails.h ? collisionDetails.y + collisionDetails.h : circleDetails.y);

    /**
     * calculate distance of (tempX, tempY) to center of circle
     * 
     * If it is greater than radius then circle is out of rectangle, else inside/ collided
     */
    this.distance = Math.sqrt(Math.pow(circleDetails.x - tempX, 2) + Math.pow(circleDetails.y - tempY, 2));
    this.collided = (this.distance <= circleDetails.r ? true : false);

    push();
    strokeWeight(2)
    let color = [0, 255, 0];
    if (this.collided) color = [255, 0, 0];
    stroke(color);
    line(tempX, tempY, circleDetails.x, circleDetails.y);
    pop();
  }

}