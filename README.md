# FaceDetect: Face detection & recognition framework
+ By: Dory Azar
+ Video Demo: [Recorded Examples](https://www.youtube.com/watch?v=vytJRSOeZ8k&feature=youtu.be)
+ Live Demo: [FaceDetect Examples](http://facedetect.caligrafy.com)

![](https://github.com/DoryAzar/e28/blob/master/independent-study/resources/facedetect1.png)

<br />

## Content

+ [What is it?](https://github.com/DoryAzar/facedetect#what-is-it)
+ [Credits & Resources](https://github.com/DoryAzar/facedetect#credits--resources)
+ [Let's get started](https://github.com/DoryAzar/facedetect#lets-get-started)
+ [Let's get through the basics](https://github.com/DoryAzar/facedetect#lets-get-through-the-basics)
+ [Let's have some fun](https://github.com/DoryAzar/facedetect#lets-have-some-fun)
+ [Known Issues](https://github.com/DoryAzar/facedetect#known-issues)

<br />

## What is it?

Detecting human faces and recognizing faces and facial expressions has always been an area of interest for different applications such as games, utilities and even security. With the advancement of machine learning, the techniques of detection and recognition have become more accurate and precise than ever before.

However, machine learning remains a relatively complex field that could feel intimidating or inaccessible to many of us. Luckily, in the last couple of years, several organizations and open source communities have been developing tools and libraries that help abstract the complex mathematical agorithms in order to encourage developers to easily create learning models and train them using any programming languages. 

As part of this study, I created a Javascript framework built on top of the work of several open source projects and models with the hope to reduce the entry barrier for developers and to encourage them to focus more on developing innovative applications that make use of face detection and recognition.

Artificial Intelligence (AI) and Machine Learning in particular don't have to be difficult and we hope that the FaceDetect framework gives developers the means to include face detection and recognition in a seamless way in their applications.

<br />

## Credits & Resources

* [face-api library](https://github.com/justadudewhohacks/face-api.js/): this project uses the face api javascript library developed by Vincent Muhler

* detect.js: Proprietary open source class that I created to make the use of the face-api library easier to use and to integrate in third party applications and frameworks. `detect.js` is included in the package

* [TensorFlow](https://www.tensorflow.org/): Tensor flow is an end-to-end open source platform with comprehensive tools and libraries that lets developers easily build machine learning powered applications

* [ml5.js](https://ml5js.org/): ML5 is an open source library, with exhaustive documentation and tutorials for understanding machine learning algorithms and how to use TensorFlow Models

<br />

## Let's get started


### Installation

The FaceDetect package can be downloaded from Github by either downloading the ZIP folder or by running the following command from the terminal:

```bash
git clone git@github.com:DoryAzar/facedetect.git

```
<br />

### Testing the package

Once the FaceDetect package is downloaded, you can test it by running the out-of-the-box application that comes with it.
In order to run that application, navigate to the folder where FaceDetect was downloaded then run `facedetect > app > basic > index.html` by double clicking on the `index.html`. 

> If you downloaded the package in your server root then you should be able to run it directly through this url: <http://localhost/facedetect/app/basic>

<br />

### Understanding the file structure

Just like any framework, FaceDetect comes with a structure of its own. Understanding that structure is key to understanding the different components of the framework and they interact with each other.

#### **`app folder`**

All the applications that you will create reside in this folder. For example, `basic` - the application that we used to test the installation - is also in this folder. Each application is a folder of its own and it consists of the following:

+ `main.js`: The VueJS script file

+ `index.html`: The markup HTML file that will reference the VueJS instance

<br/>

#### **`app template`**

In the `app` folder, an `app_template` folder with a template HTML markup and Vue script is provided for your convenience. You can simply copy this folder and rename it with each new `app`.

<br />

#### **`facedetect folder`**

In this folder lies the core definition of the detection and recognition framework. There are 4 key components to this framework:

+ `FaceDetector Class`: This is the core class for using `FaceDetect` in your application. The core code is in `detect.js` that can be found in the `scripts` folder

+ `neural network models`: Every machine learning application relies on trained models to be able to do things such as object detection or recognition. FaceDetect is no exception to that rule and it needs these models to operate properly. These pre-trained models are included in the package and can be found in the `models` folder

+ `recognition models`: In order to recognize specific faces, `FaceDetect` needs models to compare the detections to. These models are nothing more but a series of pictures of people organized in folders. These need to be created under the folder called `recognition`. As an example, you can find a subfolder called `Flash` that has 6 (PNG) pictures named by number of the superhero Flash. The same mechanism should be used to create more models (pictures of you for example). We will elaborate more on face recognition when we create our first face recognition application

+ `faceapi.js`: The FaceAPI developed by Vincent Muhler is included in the package


<br />

## Let's get through the basics

### Understanding Face detection and recognition

Detection and Recognition are two different concepts. While both use machine learning and neural networks in particular, they achieve different things. Understanding the distinction is key to better understanding how the FaceDetect framework operates.

+ **Face detection**: Face detection is about identifying a human face among all other "things" perceived through either an image or a video. So for example, a picture or a video can have people, objects, scenery etc... Face detection is when the system is capable of pointing out the presence of a human face among all those other things.

+ **Face recognition**: Recognition is about identifying who the human face is among all other faces and things perceived. So for example, Face recognition is when the system is capable of pointing out "Flash" among all other superheroes in a picture or a video.

<br />

### Understanding the FaceDetect `app`

FaceDetect relies on an important principle: "First you detect then you do something with the detections". With that principle in mind, the framework focuses on providing an easy-to-code sandbox for you to do something with the detections. Each sandbox is an `app` of its own. So if you intend to detect the age of a face or detect the facial expressions or count the number of people or recognize a face etc.. Each one of those is referred to as an `app`.

The FaceDetect `app` is a Vue application that - similarly to all Vue applications - relies on both an HTML markup file and a Javascript file.

<br />

#### The `basic` app as a starting point

Every application that you create resides in the `app` folder. The `basic` app that comes with the package is for illustration and testing purposes. The `app_template` folder can be duplicated within the `app` folder and renamed as a starting point for your application.

<br />

#### The HTML markup components

The HTML markup file (index.html for example) is the user interface that will define the source of the face detections (image or video) and any other controls needed to make something useful with the detections. It should also include the FaceDetect needed libraries and the Vue JS framework reference.

The HTML markup has 4 key elements that are designed to work with and without Vue:


+ **`detector section`**: `FaceDetect` is identified in the markup by the id **`detector`**. `FaceDetect` will be encapsulated within that block. If you are using Vue, the `detector` block lives within the Vue app id.

	```html

	<!-- Vue app -->
	<div id="app">
	   <section id="detector">
	   ....
	   </section>
	</div>

	```

<br />

+ **Media source**: No matter what you want to do with FaceDetect, detection is the first step to it. It is therefore important to identify what the detection source is. Is it an image, a video or a live webcam?

	The markup of your application needs to provide that source:

	```html
	<!-- Beginning of the app -->
	<div id="app">

	   <section id="detector">

		  <!-- media can be an image 
		  <img id="detection" class="show" src="">
		  -->

		  <!-- media can be a video 
		  <video id="detection" src="<video local url>" type="video/mp4" width="720" height="560" class="show" autoplay="autoplay" muted playsinline controls></video>
		  -->

		  <!-- media can be live webcam -->
		  <video id="detection" width="720" height="560" class="show" autoplay="autoplay" muted playsinline></video>

	   </section>

	</div>

	```
<br />

+ **Controls**: So far, only the source has been specified. In order to do something with it, it needs one or more UI triggers to activate it. `FaceDetector` provides you with a way to create these controls if you desire. In order to do that, you will need to add the `controls` placeholder to your markup.

	```html

	<section class="controls">
	   <div id="apps"></div>
	</section>

	```
<br />

+ **Infobar**: `FaceDetect` provides you with a UI component to display welcome messages, status or instruction messages called `Infobar`. In order to use it, you will need to add the `infobar` placeholder to your markup.

	```html

	<section id="infobar"></section>

	```

<br />

#### The Vue Javascript

FaceDetect is a framework that was designed to work as a third-party library with any Javascript code. In this study, we focus primarily on running FaceDetect with Vue. Since FaceDetect was not written as a Vue component per se, it will need to be instantiated as part of the Vue script that is serving the markup.

FaceDetector is the main object of the FaceDetect framework. It can be instantiated in the Vue script by providing it with the HTML ID of the media source. It is therefore important to make sure that the markup for either an image or a video has an id attribute.

The main structure of the Vue script should look like this:

```js

// make sure to use the HTML id of the media source
var detector = new FaceDetector('detection');

var app = new Vue({
  el: '#app',
  data () {
    return {
        detector: detector, /* important */
        env: env

    }
  },
  /* Method Definition  */
  methods: {
      
      
  },
  /* upon object load, the following will be executed */
  mounted () {
      
      
  }

});


```

> The `basic` app included in the package shows you examples of the HTML markup as well as the Vue script that serves it.

<br />

## Let's have some fun

The best way to explore the powerful features of the FaceDetect framework is to use them in actual examples. As part of this study, we will show you how you could make use of the framework to quickly create face detection and recognition applications.

<br />

> In every `app` that we will create, we recommend that you duplicate the `app_template` folder provided, renaming it and adjusting the HTML markup as well as the Vue script when needed. 

<br />

In all of the app examples, we will be detecting and/or recognizing faces from a webcam stream. Therefore, the HTML Markup will always be the same:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="content-type", content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width initial-scale=1 maximum-scale=1">
        <meta name='apple-mobile-web-app-capable' content='yes'>
        <meta name='apple-mobile-web-app-status-bar-style' content='black'>
        <title>Face Detect</title>

        <!-- Stylesheet and head scripts go here -->
        <link rel="stylesheet" href="../../facedetect/css/styles.css">
		
		<!-- Initialization scripts -->
		<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js" defer></script>
        <script src="../../facedetect/scripts/face-api.min.js" defer></script>
        <script src="../../facedetect/scripts/detect.js" defer></script>
		<script src="scripts/main.js" defer></script>

    </head>


    <body>
        <!-- Beginning of the app -->
        <div id="app">
            <header>
                <h1>Face Detect</h1>
            </header>
            <section id="infobar"></section>
            <section id="detector">
                
                <!-- media can be a webcam -->
                <video id="detection" width="720" height="560" class="show" autoplay="autoplay" muted playsinline></video>
                
            </section>

            <section class="controls">
                <div id="apps"></div>
            </section>
        </div>
      
    </body>

</html>

```

<br />

### App 1: Simple Face Detection

The first `app` we are going to create is a simple face detection application that detects all faces from a webcam stream. As much as this sounds complex, with the FaceDetect framework it can actually be done in one line of code in the Vue `main.js` script.


```js

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


```

<br />

> The code for this app is in the `app` > `example1` folder of this package

<br />


### App 2: Profile Faces

In the first application, all we did is load the default sandbox of the FaceDetect framework. All the default sandbox does is detect the faces. For this second application, we would like to detect more features of the detected faces (such as gender for example). The trained models that FaceDetect uses can detect: age, gender and 4 emotions (sad, happy, angry and neutral).

In order to do that, FaceDetect provides a way to activate/deactivate certain properties of the engine and pass them in a JSON format to the framework. Some of these properties are mandatory.

```js
{
  name: 'Full Detection', // MANDATORY: UI button label that triggers the detection
	
  method: this.detector.draw, // MANDATORY: FaceDetect method that will draw the different detections on top of the detected faces
	
  options: {
	
	   welcome: "Detect faces, genders, ages and expressions", // OPTIONAL: Message that will be displayed in the infobar of the UI
	
	   detection: true, // OPTIONAL: Draws the rectangle around the detected faces
	
	   landmarks: true, // OPTIONAL: Draws the contour of the detected faces
	
	   gender: true, // OPTIONAL: Displays the gender of the detected faces
	
	   expression: true, // OPTIONAL: Displays the detected emotion of the detected faces
	
	   age: true // OPTIONAL: Displays the age of the detected faces
  }
}
```

The Vue script would then consist of calling the FaceDetect `loadApp` method just like we did in the first example and passing the JSON as an argument to it. 

```js

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

```

<br />

> The code for this app is in the `app` > `example2` folder of this package

<br />

### App 3: Recognize me

In all the applications that we created thus far, we have only been detecting faces. In this third example, we are going to create an example that not just detects faces in the webcam, but also recognizes specific faces among the ones detected.

<br />

> If you need to understand better the distinction between Detection and Recognition, make sure you read [this section](https://github.com/DoryAzar/facedetect#understanding-face-detection-and-recognition)

<br />

In order to do this, we need to create models of the people that we would want to recognize. Models are nothing more but face pictures of those people in different angles and perspectives. The more samples we have, the more accurate the recognition. We then need to tell FaceDetect to compare the detections to these models and identify the faces that it recognizes directly on top of the video.

This can be done in 2 steps:

**Step 1: Define the recognition models**

The easiest way to define a recognition model is to create a folder for each person containing many pictures of that person. Each person to be recognized will have a folder in their name and the pictures inside **must be PNGs and must be named with a number**.
That folder needs to be placed in `facedetect` > `recognition` > `<name of person>`. 

> So for example, there is a model already defined in the package to recognize the superhero Flash. If you navigate to the `facedetect` > `recognition` folder, you will find a `Flash` folder containing 6 different PNGs of the Flash numbered 1 to 6.

+ Go ahead and create a folder in `facedetect` > `models` that has your firstname. Keep the `Flash` folder, we will use it for testing

+ In this new folder, add 6 PNG images of you from different angles 

+ Make sure that the PNGs are named 1.PNG, 2.PNG etc...


<br />


**Step 2: Run recognition**

Running the recognition is as easy as loading a detection app. 

```js

<!-- Vue example -->
this.detector.loadApp({
    name: "Find me", // MANDATORY: UI button label that triggers the recognition
					   
    method: this.detector.recognize, // MANDATORY: FaceDetect method that will call the recognition engine
					   
    models: {
	
         labels: ['Flash', 'Your Name'], // MANDATORY: Make sure to respect the case. Array of all the names of the people which are also the names of the folders in the structure. 
			 
         sampleSize: 6 // number of pictures per person (this number must be the same for all)
    },
    options: {
        welcome: "Can you find me?", // OPTIONAL: This is the message that will be displayed in the infobar
			  
        recognition: true // the recognition engine needs to be activated
    },
    algorithm: faceapi.SsdMobilenetv1Options // OPTIONAL: The detection algorithm that will be used
});

```

Go ahead and test out the application. If you took pictures of yourself, once you stand in front of the webcam, the system will be able to identify you and to show your name (which also is the folder name) around your face. For more fun, you can also have the Flash image on your phone and place it in front of your computer webcam (where the application is running). The system will be able to identify and distinguish both you and the Flash.

For any other face that it detects and that does not have a model, it will display an "unknow" label around them.


<br />

> The code for this app is in the `app` > `example2` folder of this package

<br />


### App 4: Custom

<br />

## Known Issues

+ FaceDetect works on Chrome, Safari and FireFox from the local machine

+ In production, some browsers (Safari) require a secure SSL connection (https) for webcam streaming

+ "Puppeteer" (the line drawing feature) is not compatible with Safari


