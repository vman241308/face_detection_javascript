var detector = new FaceDetector('detection');

var app = new Vue({
  el: '#app',
  data () {
    return {
        detector: detector

    }
  },
  /* upon object load, the following will be executed */
  mounted () {
      
      // Passing the settings to the loadApp method
      this.detector.loadApp({
          name: 'Full Detection',
		  method: this.detector.draw,
          options: {
               welcome: "Detect faces, genders, ages and expressions",
               detection: true,
			   landmarks: true,
               gender: true,
               expression: true,
               age: true
          }
      });
      
  }

});