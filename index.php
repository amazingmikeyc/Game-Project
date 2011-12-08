<?php



?>


<html>
<head><title>Mikecongreve.com</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" ></script>


<style>
	#main {
		font-family:Helvetica,Arial, sans-serif;
		font-size:medium;
			
		background-color:#3DC5FF;
		position:absolute;
		left:90px;
		top:90px;
	}

	body {
		background-color:#3DC5FF;

	}

	#mike {
		position:absolute;
		left:10px;
		top:10px;
	}

	.img {
		position:absolute;
	}
	
	#mike_left {
		left:-35px;
		display:none;
	}

#mike_left_walk {
		left:-45px;
		display:none;
	}

#mike_right_walk {
		left:-83px;
		display:none;
	}

	h1 {
		color:#515151;
	}

</style>
<script>
	var accelx=0;
	var accely=0;
	var direction='right';

	$(document).ready(function() {
		$('#image').mouseover(function() {
			
			
		})

		$(document).keydown(function(e) {
			//alert(e.which);

			if (e.which==39) {
				accelx=accelx+5
				if (accelx>15) accelx=15;
			}
			if (e.which==37) {
				accelx=accelx-5;
				if (accelx<-15) accelx=-15;
			}

			if (e.which==38) {

				if (accely==0) {
					accely=-20;
				}
			}
		});


		var timeoutID = window.setInterval(function() {
			var position = $('#mike').position();
			$('#mike').css('left', position.left + accelx);
			if (position.top + accely>10) {
				$('#mike').css('top',10);
				accely=0;
			} else {
				$('#mike').css('top', position.top + accely);
			}

			if (accelx<0) {
				if ($('#mike_left').css('display')!='none') {
					$('#mike_left_walk').show();	
					$('#mike_left').hide();
				}
				else {
					$('#mike_left').show();
					$('#mike_left_walk').hide();	

				}
				
				$('#mike_right').hide();
				$('#mike_right_walk').hide();
				accelx++;
				
				
			}
			
			if (accelx>0) {
				if ($('#mike_right').css('display')!='none') {
					$('#mike_right_walk').show();	
					$('#mike_right').hide();
				}
				else {
					$('#mike_right').show();
					$('#mike_right_walk').hide();	

				}
				
				$('#mike_left').hide();
				$('#mike_left_walk').hide();
				accelx--;
			}

/*			if (accely>0) {
				accely--;
			}*/

			if (position.top!=10) {
				accely++;
			}
			

		},10);
	})

</script>

</head>
<body>
	<div id="main">

		<h1>mikecongreve.com</h1>
		<p>Hi. You've found the web site of Mike Congreve.</p>
		<p>I am a 28 year old computer programmer, mainly doing PHP/Javascript web programming.</p>

		<p>There's more stuff I've done at <a href="http://www.mikeynet.co.uk">mikeynet.co.uk</a>, a site I sporadically update with comics and stories.</p>

		<p>You can also <a href="http://www.twitter.com/amazingmikeyc"> follow my tweets</a></p>

		<p>I am not a designer.</p>
	</div>

<div id="mike">
	<img class="img" id="mike_right" src="/mike_images/mike_right.png" alt="" title="This is me" />
	<img class="img" id="mike_left" src="/mike_images/mike_left.png" alt="" title="This is me" />

<img class="img" id="mike_left_walk" src="/mike_images/mike_left_walk.png" alt="" title="This is me" />
<img class="img" id="mike_right_walk" src="/mike_images/mike_right_walk.png" alt="" title="This is me" />

</div>

</body>

</html>