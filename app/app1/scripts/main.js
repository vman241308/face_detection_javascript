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
      
      // Load general detection
      this.detector.loadApp();
      
  }

});