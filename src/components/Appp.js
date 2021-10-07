import React, {  useState, useEffect } from 'react';
import AWS from 'aws-sdk'
import Webcam from "react-webcam";
import './app.css'
import dotenv from 'dotenv'
//import Button from './button'


class Button extends React.Component{
   
    
    render()
    {    
        return(
            <>
                <a href="http://18.219.110.212/chart.html" >
                <button className="box" >Analysis</button>
                </a>
            </>
        )
    }
}


const videoConstraints = {
    width: 600,
    height: 600,
    facingMode: "user"
  };

const SaveToS3 = async(base64) =>{

     const  ACCESS_KEY_ID= process.env.REACT_APP_ACCESS_KEY_ID
     const SECRET_ACCESS_KEY= process.env.REACT_APP_SECRET_ACCESS_KEY
     const AWS_REGION= process.env.REACT_APP_AWS_REGION
    const S3_BUCKET= process.env.REACT_APP_S3_BUCKET

    AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

    const s3 = new AWS.S3();

    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    const type = base64.split(';')[0].split('/')[1];

    const userId = Math.floor(Math.random() * 10000);


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

    const WebcamCapture = () => {
    const [image,setImage]=useState('');
    const [value,setValue]= useState('false')
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc)

    SaveToS3(imageSrc);
    },

    [webcamRef]
    );
    
    useEffect(() => {
        setInterval(capture, 2000);
    }, []);

    return (
         <div  style={{ backgroundImage: "url(image.jpeg)" , height: 'auto', width: '100%', position:'relative' }}>
        <div className="webcam-img">
        <div className="webdiv-container">
            <h1>Servian Hackathon demo</h1>
        <Webcam audio={false} height={600} ref={webcamRef} screenshotFormat="image/jpeg" width={600} videoConstraints={videoConstraints}/><br/>
        <Button />
        
        </div>
        </div>
        </div>
        );  
        };   

export default WebcamCapture ;
