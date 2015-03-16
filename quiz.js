$(document).ready(function(){
	var quDB = JSON.parse($("#quDB").html());
	
	function displayQues(id) {
		var qu = quDB.questions[id].qu;
		var c1 = quDB.questions[id].c1;
		var c2 = quDB.questions[id].c2;
		var c3 = quDB.questions[id].c3;
		var c4 = quDB.questions[id].c4;
		$('.question').html(qu);
		$('#c1').html(c1);
		$('#c2').html(c2);
		$('#c3').html(c3);
		$('#c4').html(c4);
		
		/*for (var i=1;i<=4;i++) {
			var c + i + = quDB.questions[id].c + i + ;
		}*/
	}
})
