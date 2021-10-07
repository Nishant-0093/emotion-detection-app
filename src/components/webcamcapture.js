  import React, { Component, useState } from 'react';
  import AWS from 'aws-sdk'
  import Webcam from "react-webcam";
  //const WebcamComponent = () => <Webcam />;
  var c = 1;

  const videoConstraints = {
      width: 600,
      height: 600,
      facingMode: "user"
    };

  const SaveToS3 = async(base64) =>{
    //process.env.PUBLIC_URL = image
    // console.log("Hello Image" +  image)
    // const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env;
    const  ACCESS_KEY_ID= "AKIAYKHWNEX4UZCG4YMC"
    const SECRET_ACCESS_KEY= "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"
    const AWS_REGION= "us-east-1"
    const S3_BUCKET= "my19944bucket"

  //AWS.config.setPromisesDependency(require('bluebird'));
  AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });
  console.log(ACCESS_KEY_ID);
  console.log(SECRET_ACCESS_KEY)
  console.log(AWS_REGION)
  console.log(S3_BUCKET)
  console.log("Hello Image" +  base64)
  const s3 = new AWS.S3();

  const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const type = base64.split(';')[0].split('/')[1];

  const userId = Math.floor(Math.random() * 10);
  // var userId = c++;

  const params = {
    Bucket: S3_BUCKET,
    Key: `${userId}.${type}`, 
    Body: base64Data,
    ACL: 'public-read',
    ContentEncoding: 'base64', 
    ContentType: `image/${type}` 
  }

  let location = '';
  let key = '';
  try {
    const { Location, Key } = await s3.upload(params).promise();
    location = Location;
    key = Key;
  } catch (error) {
  }

  console.log(location, key);
  }
  
  const ImageToRender = ({image}) => {
    console.log(image);
    return(
      <div>
        <h1>Image captured </h1>
        <form>
        <img src={image}/>
        <button onClick={(e)=>{e.preventDefault();SaveToS3(image);} }>Submit</button>
        </form>
      </div>
    )
  }
    
    const WebcamCapture = () => {
    const [image,setImage]=useState('');
    const webcamRef = React.useRef(null);
    
    const capture = React.useCallback(
        () => {
          //   alert('Image captured')
          const imageSrc = webcamRef.current.getScreenshot();
          setImage(imageSrc)
          //console.log(`the image capture is ${image} ${webcamRef}`);     
        },
    
        [webcamRef]
      );
    
      return (
        // <div className="webcam-container">
        //   <Webcam audio={false} height={600} ref={webcamRef} screenshotFormat="image/jpeg" width={620} videoConstraints={videoConstraints} /><br/>
        //   <button onClick={(e)=>{e.preventDefault();capture();} }> Capture</button>
        // </div>
          <div className="webcam-container">
          <div className="webcam-img">
          {image==''?(<div>
          <Webcam audio={false} height={300} ref={webcamRef} screenshotFormat="image/jpeg" width={320} videoConstraints={videoConstraints}/><br/>
          <button 
          onClick={(e)=>{e.preventDefault();capture();} }>
          Capture</button>
          </div>
          ):<ImageToRender image={image}/>}
          </div>
          </div>
      );
      
    };

    

      
  export default WebcamCapture ;
