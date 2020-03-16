var detector = new FaceDetector('detection');

var app = new Vue({
  el: '#app',
  data () {
    return {
        detector: detector

    }
  },
  /* Method Definition  */
  methods: {
      
      // Load App method
      loadApp: function(app) {
          this.detector.loadApp(app);
      },
      
      continuousMethod: function(facedetector) {
          console.log(facedetector.app.detections);
      },
      
      callbackMethod: function(facedetector) {
         
        //<---- do whatever you want here
          console.log('Example of what can be done');
        
        /* use any of the FaceDetect methods
         * facedetector.loadApp(app): load another app
         * (facedetector.detectFaces(app, facedetector))(): self invoking function to start face detection
         * facedetector.detect(callback, recognize = false, fetchRate = 100): starts a parallel stream that captures any detections or recognitions when available
         * facedetector.prepareCanva(options = null): returns a new canvas on top of the media source
         * facedetector.draw(facedetector): draws the detections on the canvas
         * facedetector.loadRecognitions({ labels: [], images: [], sampleSize: 100}): load models to recognize by the recognition engine
         * facedetector.recognize(facedetector): runs the recognition engine and draws on canvas. Must make sure that detections is started before
         * facedetector.fetchImage(canvas, media): takes a canvas capture of the media and returns a blob data image (data url)
         * facedetector.display(message, output): displays a message in the infobar and gives it an ID as specified by the 'output' input
         * facedetector.clearDisplay(): clears the infobar display
         */
      }
      
  },
  /* upon object load, the following will be executed */
  mounted () {
      
      
      
  }

});