var thescreen;
var player;
var blocks;
	
var statuswindow;
var thelevel;

var mouseX;

var score = 0;
var time = 0;

var dragMode;
var dragLast = {"x":0,"y":0}

var mode = 'edit';

var draggingObjects;

function loadLevel(level) {
	imgArray = level.img;

	objects = level.level;
	
	for (o in objects) {
		thelevel.foreground.add(new staticObject(objects[o].x, objects[o].y,'' +  imgArray[objects[o].i]));
		console.log('item created, '+objects[o].x+'x'+objects[o].y + ' - ' + imgArray[objects[o].i]);
	}
	

	

	thelevel.backdrop.add(new staticObject(-3000,-880,'game_images/clouds.png'));
	thelevel.backdrop.add(new staticObject(3400,-880,'game_images/clouds.png'));

	thelevel.backdrop.add(new staticObject(-3000,3800,'game_images/clouds.png'));

	thelevel.backdrop.add(new staticObject(3400,3800,'game_images/clouds.png'));
	

	thelevel.distance.add(new staticObject(-100,-100,'game_images/clouds2.png'));
	thelevel.distance.add(new staticObject(2000,-100,'game_images/clouds2.png'));


}

//Save the level!!!
function saveLevel() {
	images = Array();
	images2 = Array();
	
	imgIndex=0;
	l = Array();
	for (item in thelevel.foreground.items) {
		
		item = thelevel.foreground.items[item];
		
		if (!images[item.image.src]) {
			images[item.image.src] = imgIndex;
			images2[imgIndex] = item.image.src;
			
			imgIndex++;
		}
				
		obj = {'x':item.left, 'y':item.top, 'i':images[item.image.src]}
		
		l.push(obj);
		console.log(obj);
	}
	
	saveObject = {"level":l, "img":images2}
	
	jQuery.post('/saveLevel.php',saveObject);
	
	console.log(saveObject);
}

$(document).ready(function() {
	//start
	player = new playableObject('player');

	thescreen = new screen();

	thelevel = new level();
	
	statuswindow = new StatusWindow();

	$.get('loadlevel.php', function(data) {
		level = jQuery.parseJSON( data );
		
		loadLevel(level);

	});


	//main game loop!
	var timeoutID = window.setInterval(function() {

		if (mode == 'game') {

			$('#frame1').trigger('mousemove')
	
			
			
			time++;
		}
		else {
			player.move();

		}
		thelevel.draw(thescreen);
		

		statuswindow.draw(thescreen);
		
		thelevel.drawHighlights(thescreen);
	
		thescreen.switch();
	
	
	},10);

		$('#frame1').mousemove(function(e) {
		/*	if (mode=='game') {
				if (e.pageX) {
					mouseX = e.pageX;
				}
	
				distance = mouseX - 250;
	
				if (distance<0) { distance = -distance }
	
			
				if (mouseX>270) {
					player.xaccel=player.xaccel+(distance/500)
					if (player.xaccel>3) player.xaccel=3;
				}
				
				if (mouseX<220) {
					player.xaccel=player.xaccel-(distance/500);
					if (player.xaccel<-3) player.xaccel=-3;
				}
			}*/if (false) {}
			else {
				//go through and set all unhighlighted
				for (item in thelevel.foreground.items) {
					thelevel.foreground.items[item].highlight=false;
					thelevel.highlightedList = Array();
				}

				col = thelevel.collision(e.pageX+thescreen.left, e.pageY+thescreen.top);

				for (c in col) {
					col[c].highlight = true;
					
					thelevel.addToHighlightedList(col[c]);					
				}
				


				if (dragMode) {
					x = e.pageX - dragLast.x;
					y  =e.pageY - dragLast.y;

					thescreen.left = thescreen.left - x;
					thescreen.top  = thescreen.top - y;

					dragLast.x  = e.pageX;
					dragLast.y  = e.pageY;
			

$('#status').html(thescreen.left+ 'x' + thescreen.top);
				}

				if (draggingObjects!=null&&draggingObjects.length>0) {
					x = e.pageX - dragLast.x;
					y  =e.pageY - dragLast.y;


					for (o in draggingObjects) {
						draggingObjects[o].left = draggingObjects[o].left + x

						draggingObjects[o].top = draggingObjects[o].top + y
					}

					dragLast.x  = e.pageX;
					dragLast.y  = e.pageY;


				}
			}
	

		});

		$('#frame1').mousedown(function(e) {
			
			if (mode=='game') {
				if (player.yaccel==0) {
				//		player.yaccel=-10;
				//		player.top--;
					}
			}
			else {
			//3 = right button
				if (e.which==3) {

					
					dragMode = true;
					dragLast.x  = e.pageX;
					dragLast.y  = e.pageY;
					return false;
				}
				else {
					//are we over an object?
					draggingObjects =  thelevel.collision(e.pageX+thescreen.left, e.pageY+thescreen.top);

					dragLast.x  = e.pageX;
					dragLast.y  = e.pageY;
				

				}
			}

			
		});

		$('#frame1').mouseup(function(e) {
			dragMode = false;

			draggingObjects = null;
		});	

    $(document).bind("contextmenu",function(e){
        return false;
    });

	
});

function level() {
	//backgrounds
	this.backdrop = new layer();
	this.distance = new layer();
	this.distance2 = new layer();

	this.background = new layer();
	this.foreground = new layer();

	this.backdrop.parallax = 10;
	this.distance.parallax = 5;

	this.draw = function(screen) {
		if (mode=='game') {
			thescreen.left = player.left -250 ;
			thescreen.top  = player.top -250;
		}
	
		screen.ctx.fillStyle = "rgb(255,255,255)";

		screen.ctx.fillRect(0,0,800,600);

		this.backdrop.draw(screen.ctx);
		this.distance.draw(screen.ctx);
		this.distance2.draw(screen.ctx);
		this.background.draw(screen.ctx);
		this.foreground.draw(screen.ctx);

		player.draw(screen.ctx);
		
		
	}
	
	this.drawHighlights = function(screen) {
		for (obj in this.highlightedList) {
			this.highlightedList[obj].draw(screen.ctx,0,true);
		}
	}
	
	
	this.highlightedList = new Array();
	
	this.addToHighlightedList = function(obj) {
		this.highlightedList.push(obj);
	}
	
	
	//Has something in the foreground collided with
	//our man?
	this.collision = function(x,y) {
		var detectArray = new Array();

		for (item in this.foreground.items) {
			detect = this.foreground.items[item].detect(x,y) 
		
			if (detect) {
				detectArray[detectArray.length] = detect;
				
	//			if (this.foreground.items[item].image.src=='http://localhost/game_images/sonic_spring.png') player.yaccel = -15;	
			}
			
			
			
		}
		return detectArray;
	} 

}

//screen layer
function layer() {
	this.parallax = 1;
	
	this.items = new Array();

	this.add = function(item) {		

		this.items[this.items.length] = item;
	}

	this.draw = function(ctx) {		

		for (item in this.items) {
			
			this.items[item].draw(ctx , this.parallax);
		}

	}
}

//the screen itself
function screen() {
	this.left = 0;
	this.top  = 0;

	canvas = document.getElementById('frame1'); 

	this.canvas1 = document.createElement('canvas');;
	this.canvas1.width=800;
	this.canvas1.height=600;
	this.canvas2 = document.createElement('canvas');;
	this.canvas2.width=800;
	this.canvas2.height=600;
	this.current = 1;

	this.switch = function() {
	
	console.log(this.current);
	
		if (this.current==1) {
			currentCanvas = this.canvas2;
			this.ctx = this.canvas1.getContext('2d');
			this.current=2;
		}
		else {
			currentCanvas = this.canvas1;
			this.ctx = this.canvas2.getContext('2d');
			this.current=1;
		}
		
			this.mainctx.drawImage(currentCanvas,0,0,800,600);
	}

	this.mainctx = canvas.getContext('2d');

	this.ctx = this.canvas1.getContext('2d');

}


function StatusWindow() {
	this.left= 680;
	this.top=20;
	
	this.image = new Image();
	this.image.src = 'game_images/gamebar.png'
	
	this.draw = function(screen) {
						
		screen.ctx.drawImage(this.image, 0, 0, 100, 400,this.left, this.top,100, 100);
		 
		theDrawer = new Drawer(screen.ctx);
		theDrawer.text("Zombie Dave",this.left, this.top+15,"Bold 12pt Helvetica","red");
		
		theDrawer.text("500!",this.left+10, this.top+65,"Bold 25pt Helvetica","yellow");
	
	}

}


function Drawer(ctx) {
	this.ctx = ctx;

	this.text = function(text,x,y,font,style) {
		this.ctx.fillStyle = style;
		this.ctx.font = font;
		this.ctx.fillText(text,x,y);
	}
	

}

function playableObject(id, image) {
	this.left =150;
	this.top=0;
	this.xaccel = 0;
	this.yaccel = 0;
	this.height = 40;
	this.width  = 22;
	this.direction = 'right';
	this.id = id;	

	this.image = new Image();
	this.image.src = 'game_images/man.png';

	this.animationRight = new Animation();
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',162,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',191,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',230,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',272,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',306,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',337,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',367,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',403,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',438,0,39,26));	
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',479,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',517,0,39,26));
	this.animationRight.addFrame(new Frame('game_images/sonic2beta.png',553,0,39,26));
	
	this.animationLeft = new Animation();
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',0,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',36,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',75,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',116,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',150,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',186,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',218,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',250,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',284,40,39,26));	
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',326,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',364,40,39,26));
	this.animationLeft.addFrame(new Frame('game_images/sonic2beta.png',396,40,39,26));
	
	//functions
	this.draw = function(ctx) {
		if (this.direction=='left') {
			this.animationLeft.draw(ctx, this.left-thescreen.left, this.top-thescreen.top, this.width, this.height);
		}
		else {
			this.animationRight.draw(ctx, this.left-thescreen.left, this.top-thescreen.top, this.width, this.height);
		}


	}
	
	//What's our man doing?
	this.getaction = function() {
		
	}

	this.move = function() {

		this.top = this.top + this.yaccel;
		this.left = Math.round(this.left + this.xaccel);

		//detectionMiddle = thelevel.collision(this.left+(this.width/2),this.top+(this.height/2));


		//these are used for up and down
		detectionTopLeft = thelevel.collision(this.left, this.top);
		detectionTopRight = thelevel.collision(this.left+this.width, this.top);
		detectionBottomLeft = thelevel.collision(this.left, this.top+this.height);
		detectionBottomRight = thelevel.collision(this.left+this.width, this.top+this.height);

	
		this.yaccel+=.3;
		if (this.yaccel >10) {
			this.yaccel = 10
		}

		
		if (detectionBottomLeft.length&&detectionBottomRight.length) {
			this.yaccel = 0;	
			for(item in detectionBottomLeft) {
				this.top = detectionBottomLeft[item].top-this.height;
			}
		}

		if (detectionTopLeft.length&&detectionTopRight.length) {
			this.yaccel = 0;	
			for(item in detectionTopLeft) {
				this.top = detectionTopLeft[item].top+detectionTopLeft[item].height+1;
			}
		}

		if (detectionTopRight.length&&detectionBottomRight.length) {
			for(item in detectionTopRight) {
				this.left = detectionTopRight[item].left-this.width;

				this.direction='left';
			}
		}


		if (detectionTopLeft.length&&detectionBottomLeft.length) {
			for(item in detectionTopLeft) {
				this.left = detectionTopLeft[item].left+ detectionTopLeft[item].width;

				this.direction='right';
			}
		}

		//collision detection...

		if (this.direction=='left') {
			this.xaccel= this.xaccel - 0.2;
			
			if (this.xaccel<-1) this.xaccel=-1;
		}
		else {
			this.xaccel= this.xaccel + 0.2;

			if (this.xaccel>1) this.xaccel=1;
		}

		

	}

	//$('body').append(objectDiv);

	
}

function staticObject(x,y, src, type) {
	this.left=x;
	this.top = y;

	this.highlight=false;

	this.image = new Image();
	this.image.src = src;

	this.type = 'platform';

	this.height=this.image.height;
	this.width=this.image.width;

	//functions
	this.draw = function(ctx, parallax, highlight) {

		ctx.drawImage(this.image, (this.left - thescreen.left) / parallax, (this.top- thescreen.top )/ parallax, this.image.width,this.image.height);

		if (highlight) {
			
			ctx.strokeStyle="red";
			ctx.strokeRect(this.left- thescreen.left, this.top- thescreen.top, this.width, this.height);
			ctx.fillStyle="rgba(0,0,0,0.25)";
			ctx.fillRect(this.left- thescreen.left, this.top- thescreen.top, this.width, this.height);
			
			ctx.fillStyle='#000';			
		}
	}
	
	//check if a point is within this object
	this.detect = function(x,y) {
		this.height = this.image.height;
		this.width  = this.image.width;		
	//	;

		if ((x>=this.left)
			&&(x<=this.left+this.width)
			&&(y>=this.top)
			&&y<=(this.top+this.height)) {
			return this;
		}
		
	}

}