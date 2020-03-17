var detector = new FaceDetector('detection');

var app = new Vue({
  el: '#app',
  data () {
    return {
        detector: detector,
		femaleCount: 0,
		maleCount: 0

    }
  },
  methods: {
	
	  
	  countGender: function(facedetector) {	  
		  
		  // reset the counts every time the method is called
		  this.femaleCount = 0;
		  this.maleCount = 0;
		
		  
		  // iterate through the detections and count the number of men and women
		  facedetector.app.detections.forEach((detection) => {
			  	  if (detection.gender == 'male') {
					  this.maleCount++;
				  } else {
					  this.femaleCount++;
				  }
		  });
      }
  },
  /* upon object load, the following will be executed */
  mounted () {
      
      this.detector.loadApp({
          name: "Count Gender",
          method: this.countGender,
          options: {
              detection: true
          }
          
      });
  }

});