/********************************************************************************** 
 * Face detection framework built on top of the face-api framework
 * @author: Dory A.Azar
 * @dependencies: face-api.js
 **********************************************************************************/

 let FaceDetector = class FaceDetector {
    
    
    constructor(media) {
        
        // neural network models url
        const MODEL_URL = '../../facedetect/models';

        // load the faceapi models
        Promise.all([
            // face detection algorithms
            faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // SsdMobilenetv1Options

            faceapi.nets.mtcnn.loadFromUri(MODEL_URL), // MtcnnOptions
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL), // TinyFaceDetectorOptions

            // Models for landmarks, age/gender, recognition and expressions
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
            faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
        ])
        .then(() => { 
                // when loaded start the stream
                this.media = document.querySelector(`#${media}`) || null; 
                if (this.media && this.media.tagName.toLowerCase() == 'video' && !this.media.src) {
                    this.startStream();
                }
        })
        .catch((error) => { console.log(error); }); 
    }
    
    /* 
    * Method that starts streaming from computer cam 
    */
    async startStream() {

        // Stream from media device returns a promise. Compatible on Safari, Chrome and Firefox
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
                }
        )
        .then(stream => {
            this.media.srcObject = stream;
            this.media.play();
        })
        .catch(error => {
            return Promise.reject(new Error(error));
            
        });

    }
    
    
    /* 
     * Promise that loads the app settings
     * @settings: Optional. Every app is controlled by a set of configuration that degines its behavior
     * - name: String. defines the name of the app that will appear in the UI
     * - custom: Boolean. When true, the application bypasses detection or recognition by calling a callback method
     * - method: 2 framework methods can be called. "draw" is for drawing on top of the medium. "recognize" is for calling the facial recognition. Any other callback method can be used
     * - algorithm: the faceapi algorithm used. The default algorithm is SsdMobilenetv1Options
     * - options: 
     *      - welcome: String. welcome message
     *      - detection: Boolean. when true it draws a box around detected faces
     *      - age, gender, expression: Boolean. when true, they are evaluated
     *      - landmarks: Boolean. when true, the line drawing is drawn on top of the face
     *      - recognition: Boolean. when true the recognition engine is called
     * - models
     *      - labels: Array. Collection of the names of "faces" to be recognized. A folder of the same name needs to be created in the "recognition" folder
     *      - images: Array. Collection of the pictures associated with a label. Used only to create on the fly training of one face
     *      - sampleSize: Integer. size of the picture of sample
     */
    async loadApp(settings = null) {

        let app = settings? settings : {
                name: 'Detect',
                method: this.draw, // this.recognize
                //algorithm: faceapi.SsdMobilenetv1Options,
                options: {
                    //welcome: "Show yourselves and we will detect your faces",
                    detection: true,
                    //age: true,
                    //gender: true,
                    //expression: true,
                    ////puppeteer: true,
                    //landmarks: true,
                    //recognition: true
                }
        };
        
        // load recognition models for use in the "Where is" app
        try {
           app.options.recognitionModel = settings && settings.models && app.options.recognition? await this.loadRecognition(settings.models) : null; 
        } catch (error) {
            console.log(error);
        }
        

        const button = document.createElement('button');
        button.innerHTML = app.name;
        button.id = 'app' + app.id;
        button.addEventListener('click', !app.custom ? this.detectFaces(app, this) : this.custom(app, this));
        document.querySelector('#apps').appendChild(button);

    }
    
    /* 
     * Method that detects faces throughout the life cycle of the video stream
     * @app: object definition of the app and its options
     * @facedetector: FaceDetector object
     *
     */
     detectFaces(app, facedetector) {
        return function() {
            // Apply algorithm from app settings
            const algorithm = app.algorithm || faceapi.TinyFaceDetectorOptions;
            

            // Get the canvas ready with the app options
            let canvas = facedetector.prepareCanva(app.options);


            // Match the canva size with the video
            const displaySize = {
                width: facedetector.media.width,
                height: facedetector.media.height
            };
            faceapi.matchDimensions(canvas, displaySize);

            // Run the face detection algorithm every 100ms 
            facedetector.runningEvent = setInterval(async () => {
                
                

                // Detect all the faces present in the stream with Landmarks, Age and Gender, and Facial Expressions
                let detections = await faceapi.detectAllFaces(facedetector.media, new algorithm()).withFaceLandmarks().withFaceDescriptors().withAgeAndGender().withFaceExpressions();

                // resize the detections to fit in the canva
                let resizedDetections = faceapi.resizeResults(detections, displaySize);
                
                // expose the detections to the app
                facedetector.app = app;
                facedetector.app.detections = resizedDetections;
                facedetector.app.canvas = canvas;
                
                
                // call the defined app method
                app.method(facedetector);
                
            }, 100); // end interval
        }; // end callback 
    }
    
    
    /* 
     * Method that creates and prepares the canva for the application selected
     * @options: the application selected options are provided
     */
     prepareCanva(options) {

        // clear any running event
        if (this.runningEvent) {
            clearInterval(this.runningEvent);
        }
         
        // Display welcome message if defined
        this.clearDisplay();
        if(options && options.welcome) {
            this.display(options.welcome, 'message');
        }

        // set whether or not the video is to be visible
        if (options && options.puppeteer) {
            this.media.classList.replace('show', 'hide');
        } else {
            this.media.classList.replace('hide', 'show');
        }

        // create a canva from the video media and match its size to the video size
        // If the canva exists then remove it first
        let existingCanva = document.querySelector('#detectfaces') || null;
        if (existingCanva) {
            existingCanva.parentNode.removeChild(existingCanva);
        }

        // Create the canva on top of the video and add it to the document
        let canvas = faceapi.createCanvasFromMedia(this.media);
        canvas.id = "detectfaces";
        document.querySelector('#detector').append(canvas);

        return canvas;

    }
    
    /* 
     * Method that draws different renderings of the detections on the canvas
     * 
     * @facedetector: FaceDetector object
     * - detections: face objects detected from the stream
     * - options: Optional. Object defining the different options applied to the rendering
     * - canvas: Optional. The canvas on which the drawings will be rendered
     *
     */
     draw(facedetector = this) {
         
         let detections = facedetector.app.detections || null;
         let options = facedetector.app.options || null;
         let canvas = facedetector.app.canvas || null;

        // Clear the canva so that it doesn't accumulate drawing at every detection
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // Draw the Detections for face detect
        if (options && options.detection) {
            faceapi.draw.drawDetections(canvas, detections);
        }


        // Draw face in line of different colors for even and odd indices
        if (options && (options.landmarks || options.puppeteer)) {

            // for each detection get the landmarks from the api and draw them as a full line
            detections.forEach((result, i) => {
                let landmark = result.landmarks;
                let drawPuppeteer = new faceapi.draw.DrawFaceLandmarks(landmark, {
                    drawLines: true,
                    drawPoints: false,
                    lineWidth: 2,
                    lineColor: i % 2 == 1 ? 'rgba(0,0,0,1)' : 'rgba(255,0,0, 1)',
                    pointSize: 2,
                    pointColor: 'rgba(0,0,0,1)'
                });
                drawPuppeteer.draw(canvas);
            });
        }


        // Custom Draw Gender, Age and Expressions
        if (options && (options.age || options.gender || options.expression)) {
            detections.forEach((result, i) => {

                // Get the most probable expression
                let sorted = result.expressions ? result.expressions.asSortedArray() : null;
                let expression = Array.isArray(sorted) ? sorted.filter(function(expr) {
                    return expr.probability > 0.9;
                }) : null;
                let expressionToDisplay = Array.isArray(expression) ? expression[0] ? expression[0].expression : 'neutral' : 'neutral';

                // Compose the array of results to display on the canva
                let resultToDisplay = [];
                if (options && options.expression) {
                    resultToDisplay.push("Expression: " + expressionToDisplay);
                }
                if (options && options.gender) {
                    resultToDisplay.push("Gender: " + result.gender);
                }
                if (options && options.age) {
                    resultToDisplay.push("Age: " + Math.round(result.age));
                }

                // Draw the values at the bottom of the canva
                let box = result.detection.box;
                let anchor = box.bottomLeft;
                let drawTextField = new faceapi.draw.DrawTextField(resultToDisplay, anchor);
                drawTextField.draw(canvas);

            });
        }
    }
    
    /* 
     * Utility method that resets the message display
     */
     clearDisplay() {

        // clear the ordered list
        const messageElement = document.querySelector('#message') || null;
        if (messageElement) {
            messageElement.innerHTML = '';      
        }

    }
    
    
    /* 
     * Method that displays messages to the status area in the UI
     *
     * @message: the message to be displayed
     * @output: the HTML id where it should be displayed
     */
    display(message, output) {
         
        var infobarElement = document.getElementById('infobar') || null;
        if (!document.getElementById('infobar')) {
            infobarElement = document.createElement('SECTION');
            infobarElement.id = 'infobar';
            
            // If the ids have been respected and the detector id is identified
            var detectorElement = document.getElementById('detector') || null;
            if (detectorElement) {
                // place it before the detector section
                detectorElement.parentNode.insertBefore(infobarElement, document.getElementById('detector'));
            } else {
                // otherwise place it in the beginning of the body
                document.body.prepend(infobarElement);
            }
        }

        // If the output area where message needs to be placed does not exist then create it
        if (!document.getElementById(output)) {

            // The message bar is an unordered list and list items can be accumulated in it
            var messageElement = document.getElementById('message') || null;
            if (!messageElement) {
                messageElement = document.createElement('UL');
                messageElement.id = 'message';
                infobarElement.appendChild(messageElement);
            } else {
                var separator = document.createElement('LI');
                separator.innerHTML = "|";
                messageElement.appendChild(separator);            
            }
            var newStatus = document.createElement('LI');
            newStatus.id = output;
            messageElement.appendChild(newStatus);
        }

        // add message to the area
        var outputElement = document.getElementById(output) || null;
        outputElement.innerHTML = message;

    }
    
    /* 
     * Method that finds the best match for a face based on a model defined
     * 
     * @facedetector: FaceDetector object
     * - detections: face objects detected from the stream
     * - options: Optional. Object defining the different options applied to the rendering
     * - canvas: Optional. The canvas on which the drawings will be rendered
     *
     */
     recognize(facedetector = this) {
         
         let detections = facedetector.app.detections || null;
         let options = facedetector.app.options || null;
         let canvas = facedetector.app.canvas || null;

        // Clear the canva so that it doesn't accumulate drawing at every detection
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
         
        // initialize the face matcher based on the recognition model loaded
        let labeledFaceDescriptors = options.recognitionModel;
        let faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

        let results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
        
        // expose the recognitions
        facedetector.app.recognitions = results;

        // For each detection, draw a box. Draw the match in a different color
        results.forEach((result, i) => {
            let box = detections[i].detection.box;

            // Let the box highlight matches in a different box colors
            let drawBox = new faceapi.draw.DrawBox(box, {
                label: result.toString(),
                boxColor: !result.toString().includes("unknown") ? 'rgba(255,0,0, 1)' : 'rgb(192,192,192,1)'
            });
            drawBox.draw(canvas);
        });
    }
    
    /* 
     * Method that loads models for recognition
     *
     * @models: Object. Default null. When specified the recognitions are loaded from the images provided as opposed to the ones in storage
     * @output: return promise with face descriptors of the models to be recognized
     */
     loadRecognition(models = null) {
         let labels = models.labels || [];
         let images = models.images || [];
         let sampleSize = models.sampleSize || 0;

        // return a promise that loads all the images and fetches their descriptors
        return Promise.all(

            // for each label get the descriptors based on the model image
            labels.map(async (label, key) => {

                let descriptors = [];
                let url;

                // iterate through all the model images in the folder (there are 6 right now and this number should be changed if more pics need to be added)
                for (let i = 1; i <= sampleSize; i++) {

                    if(Array.isArray(images) && images[0].constructor === Array) {
                        url =  images[key].length > 0 ? images[key][i-1] : `../../facedetect/recognition/${label}/${i}.png`;
                    } else {
                        url =  images.length > 0 ? images[i-1] : `../../facedetect/recognition/${label}/${i}.png`;
                    }
                    

                    // fetch the images from the model
                    let img = await faceapi.fetchImage(url);


                    // detect the single face from the image
                    let detections = await faceapi.detectSingleFace(img, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();

                    // push the descriptiors from each image detection onto the decriptor collections that will be needed
                    if (detections && detections.descriptor) {
                        descriptors.push(detections.descriptor);
                    }
                }

                return new faceapi.LabeledFaceDescriptors(label, descriptors);
            })
        );

    }
    
    
    /* 
     * Utility method that reads the detections to perform something on them
     * @callback: takes a callback method that is defined at method calling
     * @recognize: set to true to get the recognitions rather than the detections if the recognition engine is running
     * @fetchRate: define in ms the fetching rate of the detections. Default is 100ms
     *
     */
    detect(callback, recognize = false, fetchRate = 100) {
        return setInterval(() => {
                if (recognize && this.app && this.app.recognitions) {
                        callback(this.app.recognitions, this);
                    } else if(this.app && this.app.detections) {
                        callback(this.app.detections, this);
                    }
            }, fetchRate);
    }
    
    
    /* 
     * Utility method that captures an image from the video and draws to a canva
     * @canvas: the canvas where the image will be drawn
     * @media: video or img
     * @output: the data url of the blob image created
     *
     */
     fetchImage(canvas, media) {
        let context = canvas.getContext('2d');
        context.drawImage(media, 0, 0, media.offsetWidth, media.offsetHeight);
        return canvas.toDataURL();
    }
    
    
    
    
    /* 
     * Method for custom app that doesn't use Face Detections
     * @app: object definition of the app and its options
     * @facdetector: takes this object as a parameter as well
     *
     */
     custom(app, facedetector) {

        return function() {

            // Get the canvas ready with the app options
            let canvas = facedetector.prepareCanva(app.options);


            // Match the canva size with the video
            let displaySize = {
                width: facedetector.media.width,
                height: facedetector.media.height
            };
            faceapi.matchDimensions(canvas, displaySize);
            
            
            // initialize the app in the object
            facedetector.app = app;
            facedetector.app.canvas = canvas;

            
            // call the app features from here
            app.method(facedetector);

        };
    }
    
    
}