<html>
<head>
	<title>SuperGame</title>
<style>

#mainLevel {
	width:5000px;
	height:5000px;
	border:1px black dotted;
	position:absolute;
	
}

#selector {
	height:500px;
	width:200px;
	border:1px black solid;
	
	background-color:white;
	
}

.Listblock {
	width:100px;
	height:100px;
}

.block {
	position:absolute;
	
}

#selectionBox {
	border:2px red dotted;
	position:absolute;
}

</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js" ></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js"></script>
<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/themes/base/jquery-ui.css" type="text/css" media="all" /> 
<script>
var selectedBlock;

$(document).ready(function() {
	
	$(".Listblock").each(function() {
		filename = 'game_images/' + $(this).html() + '.png';
		$(this).css('background-image',"url:("+filename+")");
		
		img = new Image();
		img.src = filename;
		img.onload = function() {

		}
		

		$(this).html("<img src='"+filename+"'  />");
	})


	$(".Listblock").mousedown(function() {
		selectedBlock=$(this).clone();
		$("#selected").html('');
		$("#selected").append($(selectedBlock));
	})

	
	$('#mainLevel').mousemove(function(e) {
		//console.log(e.pageX);
		$("#selected").css('position','fixed');
		$("#selected").css('left',e.pageX);
		$("#selected").css('top',e.pageY);
	})

	$('#selected, #mainLevel').mouseup(function(e) {
		var newObject = $('#selected').clone()
		$('#mainLevel').append(newObject);

		blocksrc = $(newObject).contents().find('img').attr('src');
		img = new Image();
		img.src = blocksrc;

		$(newObject).css('width',img.width);
		$(newObject).css('height',img.height);

		$(newObject).mouseenter(function(e) {
			var pos = $(newObject).position();
		/*	$('#selectionBox').css('left',pos.left-2);
			$('#selectionBox').css('top',pos.top-2);
			$('#selectionBox').css('width',$(newObject).width());
			$('#selectionBox').css('height',$(newObject).height());*/
		});	
	
		$(newObject).mouseleave(function(e) {
			
		//	$(this).css('border','2px white solid');
		});	
		
	});



	$('#selector').dialog({title:'Edit Level'});	
	
});

function save() {
	//go through each .block and save it
	blocks = new Array();
	var listOfImages = new Object();
	var counter=0;

str='{"level":[';
	$('.block').each( function(index) {
		

		block = $(this).contents().find('img').attr('src');

		if (listOfImages[block]!=null) {
			id = listOfImages[block];
		}
		else {
			listOfImages[block] = counter;
			id = counter;
			counter++;
		}

		item = '{"x":' + $(this).css('left').replace('px','') + ',"y":' + $(this).css('top').replace('px','') + ', "i":' + id +'}';

		str+=item

		if ($('.block').length>index+1) {
			 str+=',';		
		}

	});

	str+='],"img":[';

	for(image in listOfImages) {
		console.log(listOfImages[image])
		str+='"' + image + '",';
	}
	str+='""';

	str+=']}';
	jQuery.post('saveLevel.php', {level:str}, function(data) {
		console.log(data);
	});

}

function load(level) {

}


</script>
</head>
<body>
<div id="mainLevel">


</div>
<div id="selected" class="block">
	<!-- the currently selected element -->
</div>
<div id="selectionBox" ></div>

</body>