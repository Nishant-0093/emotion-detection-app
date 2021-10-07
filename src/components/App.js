import React from 'react';
import WebcamCapture from './webcamcapture'

export default class App extends React.Component{
    render()
    {
        return(
            <div>
                <h1>AWS Hackathon</h1>
                <WebcamCapture />
            </div>
        )
    }
}