function loadImages() {


}


function Animation() {

	this.currentFrame;
	
	this.currentFrameCount = 0;
	
	this.images = new Array();

	this.draw = function(ctx, x, y) {
	
		if (this.images.length>0) {
					
			this.currentFrameCount++;	
			
			if (this.currentFrameCount>=this.images.length) {
				this.currentFrameCount=0;
			}
			
			ctx.drawImage(this.images[this.currentFrameCount].image, 
				this.images[this.currentFrameCount].left, 
				this.images[this.currentFrameCount].top, 
				this.images[this.currentFrameCount].width, 
				this.images[this.currentFrameCount].height, 
				x, y, 
				this.images[this.currentFrameCount].width, this.images[this.currentFrameCount].height);
			
		//	ctx.drawImage(this.images[this.currentFrameCount].image, 10,10,10,10,x,y,10,10);
		
		}
	}

	this.addFrame = function(frame) {
		this.images.push(frame); 
	}   

} 

function Frame(file,x,y,i,j) {
	
	this.image = new Image();
	this.image.src = file;
	
	this.filename = file;
	
	this.top = y;
	this.left = x;
	this.width = j;
	this.height = i;
			
}