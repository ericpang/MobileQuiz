// JavaScript Document
/* global $,document,console,quizMaster */
$(document).ready(function() {
	
	var g = {};
	g.scan= function scanBarcode(callback) {
		
		cordova.plugins.barcodeScanner.scan(
	      function (result) {
	          /*alert("We got a barcode\n" +
	                "Result: " + result.text + "\n" +
	                "Format: " + result.format + "\n" +
	                "Cancelled: " + result.cancelled);
	          */
	    	  callback(result.text);
	      }, 
	      function (error) {
	          alert("Scanning failed: " + error);
	      }
	   );
	}

	$(document).on("pageshow", "#quizPage", function() {
		console.log("Page show");
		
		g.scan(function(value){
		    //alert(value);
			if ( value !== null /* && value ==='q1' */ ) {
				
				if ( value === 'end' && typeof g.scores != 'undefined' ) {
					var html = "<h2>All Complete!</h2><br/><h3>Scores: "+g.scores.join(",")+".</h3>";
					var total= g.scores.reduce(function(a, b) {
					    return a + b;
					});
					html+= "<br/><h2>Total: "+total+"</h2>";
					// clear the memory
					g.scores=[];
					
					$(".quizdisplay").html(html).trigger('create');
				} else {
					//initialize the quiz
					quizMaster.execute(value+ ".json", ".quizdisplay", function(result) {
						console.log("SUCESS CB");
						console.dir(result);	
						
						// save the result for this quiz
						alert("Your score for "+ value +" is "+result.correct);
						g.scores= ( typeof g.scores != 'undefined' && g.scores instanceof Array ) ? g.scores : []
						
						g.scores.push(result.correct);
						
					});
				}
			}
		});
		
	});

});