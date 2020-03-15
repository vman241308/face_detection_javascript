# FaceDetect: Face detection & recognition framework
+ By: Dory Azar
+ Production URL: [e28p1.broadposter.com](http://e28p1.broadposter.com)

<br />

## What is it?

Detecting human faces and recognizing faces and facial expressions has always been an area of interest for different applications such as games, utilities and even security. With the advancement of machine learning, the techniques of detection and recognition have become more accurate and precise than ever before.

However, machine learning remains a relatively complex field that could feel intimidating or inaccessible to many of us. Luckily, in the last couple of years, several organizations and open source communities have been developing tools and libraries that help abstract the complex mathematical agorithms in order to encourage developers to easily create learning models and train them using any programming languages. 

As part of this study, I created a Javascript framework built on top of the work of several open source projects and models with the hope to reduce the entry barrier for developers and to encourage them to focus more on developing innovative applications that make use of face detection and recognition.

Artificial Intelligence (AI) and Machine Learning in particular don't have to be difficult and we hope that the FaceDetect framework gives developers the means to include face detection and recognition in a seamless way in their applications.

<br />

## Credits & Resources

* [face-api library](https://github.com/justadudewhohacks/face-api.js/): this project uses the face api javascript library developed by Vincent Muhler

* FaceDetect framework: Proprietary open source framework that I created to make the use of the face-api library easier to use and to integrate with Vue JS. The framework is included in the distribution (detect.js)

* [TensorFlow](https://www.tensorflow.org/): Tensor flow is an end-to-end open source platform with comprehensive tools and libraries that lets developers easily build machine learning powered applications.

* [ml5.js](https://ml5js.org/): ML5 is an open source library, with exhaustive documentation and tutorials for understanding machine learning algorithms and how to use TensorFlow Models

<br />

## Let's get started


### Installation

The FaceDetect package can be downloaded from Github by either downloading the ZIP folder or by running the following command from the terminal:

```bash
git clone git@github.com:DoryAzar/facedetect.git

```



### Testing the package

Once the FaceDetect package is downloaded, you can test it by running the out-of-the-box application that comes with it.
In order to run that application, navigate to the folder where FaceDetect was downloaded then run `facedetect > app > basic > index.html` by double clicking on the `index.html`. 

> If you downloaded the package in your server root then you should be able to run it directly through this url: <http://localhost/facedetect/app/basic>




### Understanding the file structure

Just like any framework, FaceDetect comes with a structure of its own. Understanding that structure is key to understanding the different components of the framework and they interact with each other.

**`app folder`**


All the applications that you will create live this folder. For example, the application that we used to test the installation is in this folder. Each application is a folder of its own and it consists of the following:

+ `main.js`: The VueJS script file

+ `index.html`: The markup HTML file that will reference the VueJS instance

<hr>

**`facedetect folder`**


In this folder lies the core definition of the detection and recognition framework. There are 5 main components to this framework:

+ `FaceDetector Class`: This is the core class for using `FaceDetect` in your application. The core code is in `detect.js` that can be found in the `scripts` folder

+ `neural network models`: Every machine learning application relies on trained models to be able to do things such as object detection or recognition. FaceDetect is no exception to that rule and it needs these models to operate properly. These pre-trained models are included in the package and can be found in the `models` folder

+ `recognition models`: In order to recognize specific faces, `FaceDetect` needs models to compare the detections to. These models are nothing more but a series of pictures of people organized in folders. These need to be created under the folder called `recognition`. As an example, you can find a subfolder called `Flash` that has 6 (PNG) pictures named by number of the superhero Flash. The same mechanism should be used to create more models (pictures of you for example). We will elaborate more on face recognition when we create our first face recognition application

+ `faceapi.js`: The FaceAPI developed by Vincent Muhler is included in the package


<br />

## Let's get through the basics

### Understanding Face Detection and Recognition



### Markup Components

### FaceDetect Vue Sandboxes


## Let's have some fun

### Your first Face Detection application


### Application that detects age, gender and emotions


### Your first Face Recognition application


### Create your custom application


