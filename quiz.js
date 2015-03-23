$(document).ready(function(){
	//BEGIN GLOBAL VARIABLES
	var quesIDs;
	var curQues;
	var totalQues;
	var usrAns;
	var ans;
	//END
	init()
	
	function init() {
		//VAR DECS
		quesIDs = [];
		curQues = 0;
		totalQues = 5;
		//PAGE STYLING
		$('#submit').prop('disabled', false);
		$('#submit').val("Submit");
		//INIT
		generateQuesIDs(totalQues);
		displayQues();
	}
	
	$('input[name=debug]').click(function(){
		if ($('input[name=debug]').is(':checked')) {
			$('#submit').val("CurQues: " + curQues);
		} else {
			$('#submit').val("Submit");
		}
	});
	
	$('#submit').click(function(){
		if ($('input[name=selection]').is(':checked') && !($('input[name=debug]').is(':checked'))) {
			checkAns()
		} else if ($('input[name=debug]').is(':checked')) { //DEBUG
			displayQues(); //DEBUG
			$('#submit').val("CurQues: " + curQues); //DEBUG
		} else {
			alert("Select an answer!")
		}
	})
	
	function checkAns() {
		usrAns = $('input[name=selection]:checked').attr('id');
		ans = quDB.questions[quesIDs[curQues]].ans;
		if (usrAns == ans) {
			alert("Correct!"); //DEBUG
		} else {
			alert("Incorrect!\nThe answer was " + ans); //DEBUG
		}
		displayQues()
	}
	
	function generateQuesIDs(amt) {
		for (var i=0;i<=amt;i++) {
			quesIDs[i] = Math.floor(Math.random()*20);
			while (quesIDs[i] == quesIDs[i-1]) {
				quesIDs[i] = Math.floor(Math.random()*20);
			}
		}
	}
	
	function displayQues() {
		if (curQues == totalQues) {
			finish()
		} else {
			curQues++;
			var qu = quDB.questions[quesIDs[curQues]].qu;
			var c1 = quDB.questions[quesIDs[curQues]].c1;
			var c2 = quDB.questions[quesIDs[curQues]].c2;
			var c3 = quDB.questions[quesIDs[curQues]].c3;
			var c4 = quDB.questions[quesIDs[curQues]].c4;
			$('.question').html(qu);
			$('#labl_c1').html(c1);
			$('#labl_c2').html(c2);
			$('#labl_c3').html(c3);
			$('#labl_c4').html(c4);
		}
	}
	
	function finish() {
		$('#submit').prop('disabled', true);
		alert("You've answered all the questions!");
	}
})
