<html>
<head>
	<title>SuperGame</title>
<style>

canvas {
	width:800px;
	height:600px;

	
	border:1px black dotted;
}
</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" ></script>
<script src="game.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/themes/base/jquery-ui.css" type="text/css" media="all" /> 
</head>


<body>
<canvas id="frame1" width=800 height=600></canvas>	

<div id="status"></div>

<div id="debugbox"></div>
<div id="debugbox2"></div>
<p>useful code</p>
<p>Add something to the level: <br>
<code>thelevel.foreground.add(new staticObject(-100,-100,'game_images/sonic_spring.png'));</code></p>
<p>Save the level: <br><code>savelevel();</code></p>		
</div>
</body>

</html>