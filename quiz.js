$(document).ready(function(){
	var quDB = JSON.parse($.getJSON('questions.json'));
	var quesIDs = [];
	
	function checkAnswer(id) {
		usrAns = $('input[name=selection]:checked').attr('id');
		ans = quDB.questions[id].ans;
	}
	
	function generateQuesIDs(amt) {
		for (var i=0;i<amt;i++) {
			quesIDs[i] = Math.floor(Math.random()*21);
		}
	}
	
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
	}
})
