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
      
	this.detector.loadApp({
		name: "Find me", // MANDATORY: UI button label that triggers the recognition
		method: this.detector.recognize, // MANDATORY: FaceDetect method that will call the recognition engine
		models: {
			 labels: ['Flash'], // Add your name once you create the model folder: ['Flash', 'Your Name']
			 sampleSize: 6 // The same number of pictures for all models
		},
		options: {
			welcome: "Can you find me?", // OPTIONAL: This is the message that will be displayed in the infobar
			recognition: true // the recognition engine needs to be activated
		},
		algorithm: faceapi.SsdMobilenetv1Options // OPTIONAL: The detection algorithm that will be used
	});
  }

});