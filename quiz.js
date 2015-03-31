$(document).ready(function(){

	var quesIDs;
	var curQues;
	var totalQues;
	var usrAns;
	var ans;
	var score;
	var time;
	
	config();
	
	function config() {
		resetTimeBar();
		$('input[name=selection]').prop('disabled',true);
		$('#submit').prop('disabled',true);
		$('#reset').prop('disabled',true);
		$('.timeBar').css({'background-color': '#CCC'});
		$('.question').css({'color': '#BBB'});
		$('.ansContainer').css({'color': '#BBB'});
		$('.progress').css({'color': '#BBB'});
		$('.status').css({'color': '#BBB'});
	}
	
	$('#apply').click(function(){
		init();
	});
	
	$('#reset').click(function(){
		$('.configBar').toggle('drop',{direction: 'up'}, 500);
		config();
	});
	
	function init() {
		quesIDs = [];
		curQues = 0;
		totalQues = parseInt($('#questions').val());
		time = parseInt($('#difficulty').val());
		score = 0;
		
		$('#submit').prop('disabled', false);
		$('#reset').prop('disabled',false);
		$('.timeBar').height('245px');
		$('input[name=selection]').prop('checked',false);
		$('input[name=selection]').prop('disabled',false);
		$('.timeBar').animate({'background-color': '#09F'},500,'linear');
		$('.question').animate({'color': '#000'},500,'linear');
		$('.ansContainer').animate({'color': '#000'},500,'linear');
		$('.progress').animate({'color': '#000'},500,'linear');
		$('.status').animate({'color': '#000'},500,'linear');
		 
		$('.configBar').toggle('drop',{direction: 'up'}, 500);
		
		generateQuesIDs(totalQues);
		displayQues();
		timer();
	}
	
	$('#submit').click(function(){
		if ($('input[name=selection]').is(':checked')) {
			checkAns()
		} else {
			$('.ansContainer').css({'background-color': '#F00'});
			$('#submit').val("^^^^^^")
			$('.ansContainer').animate({'background-color': '#DDD'},300,'linear',function(){$('#submit').val("Submit")});
		}
	})
	
	function checkAns() {
		usrAns = $('input[name=selection]:checked').attr('id');
		ans = quDB.questions[quesIDs[curQues]].ans;
		resetTimeBar();
		if (usrAns == ans) {
			$('.status').html("Correct!");
			$('.status').css({'background-color': '#0F0'});
			progress();
			score++;
			$('.status').animate({'background-color': '#DDD'},1000,'linear',displayQues());
		} else {
			$('.status').html("Incorrect! The answer was choice " + ans.substr(1) + ".");
			$('.status').css({'background-color': '#F00'});
			progress();
			$('.status').animate({'background-color': '#DDD)'},1000,'linear',displayQues());
		}
	}
	
	function progress() {
		if (curQues == 1) {
			$('.progress').html("You have answered " + curQues + " question.");
		} else {
			$('.progress').html("You have answered " + curQues + " questions.");
		}
	}
	
	function generateQuesIDs(amt) {
		for (var i=0;i<=amt;i++) {
			quesIDs[i] = Math.floor(Math.random()*20);
			while (isIDUsed(quesIDs[i],i) && i !== 0) {
				quesIDs[i] = Math.floor(Math.random()*20);
			}
		}
	}
	
	function isIDUsed(id,curID) {
		for (var i = 0;i<curID;i++) {
		  if (id == quesIDs[i]) {
			  return true;
		  }
		}
		return false;
	}
	
	function displayQues() {
		$('input[name=selection]').prop('checked',false);
		if (curQues == totalQues) {
			finish()
		} else {
			curQues++;
			var qu = quDB.questions[quesIDs[curQues]].qu; //Cannot include in a for loop due to suffixes (i.e. '.qu', '.c1' etc.)
			var c1 = quDB.questions[quesIDs[curQues]].c1;
			var c2 = quDB.questions[quesIDs[curQues]].c2;
			var c3 = quDB.questions[quesIDs[curQues]].c3;
			var c4 = quDB.questions[quesIDs[curQues]].c4;
			$('.question').html(qu);
			$('#labl_c1').html(c1);
			$('#labl_c2').html(c2);
			$('#labl_c3').html(c3);
			$('#labl_c4').html(c4);
			timer();
		}
	}
	
	function timer() {
		$('.timeBar').animate({'height': '0px', 'marginTop': '245px'},time,'linear',function(){
			resetTimeBar();
			$('.status').html("You took too long!");
			$('.status').css({'background-color': '#F00','color': '#FFF'});
			progress();
			$('.status').animate({'background-color': '#DDD','color': '#000'},1000,'linear',displayQues());
		});
	}
	
	function resetTimeBar() {
		$('.timeBar').stop(true,false);
		$('.timeBar').css({'height':'245px','margin-top':'5px'});
	}
	
	function finish() {
		$('#submit').prop('disabled', true);
		$('input[name=selection]').prop('disabled',true);
		resetTimeBar();
		$('.timeBar').animate({'background-color': '#CCC'},500,'linear');
		$('.question').animate({'color': '#BBB'},500,'linear');
		$('.ansContainer').animate({'color': '#BBB'},500,'linear');
		
		if (score==totalQues) {
			$('.progress').html("You answered all the questions correctly!");
		} else if (score==0) {
			$('.progress').html("You didn't answer anything correctly... Shame.");
		} else {
			$('.progress').html("You answered " + score + " out of " + totalQues + " questions correctly!");
		}
	}
})
