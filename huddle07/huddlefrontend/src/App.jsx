import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { huddleIframeApp, HuddleIframe } from "@huddle01/huddle01-iframe";
import React from 'react';

import axios from 'axios';
import Webcam from "react-webcam";

const videoConstraints = {
  width: 220,
  height: 200,
  facingMode: "user"
};
function App() {

  // start 
  const [transcript, setTranscript] = useState("");
  const [image, setImage] = useState("");

  try {
    var speechRecognition = new window.webkitSpeechRecognition();
  } catch (e) {
    var speechRecognition = Object;
  }
  
  //check if connected or not
  //console.log(speechRecognition)
    
      // String for the Final Transcript
      let final_transcript = "";
    
      // Set the properties for the Speech Recognition object
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
    
     
    speechRecognition.onresult = (event) => {

      //console the whole event
     // console.log("event",event)

        // Create the interim transcript
        let interim_transcript = "";
    
        // Loop through the results from the speech recognition object.
          for (let i = event.resultIndex; i < event.results.length; ++i) {
       
          // console.log("event result", event.results[i][0])
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
            setTranscript(final_transcript);
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
      
        }
    
     
      };
    
      // Set the onClick property of the start button
      const start = () => {

        speechRecognition.start();
      };

      // Set the onClick property of the stop button
      const stop = () => {

        speechRecognition.stop();
        console.log('final transcript',transcript);
        senddata();
      
      };

      const senddata= async()=>{ 
        console.log('img',image)
        console.log(walletAddress)
         const res = await axios.post(`http://localhost:8080/rec/getrec`,  
      {data:transcript,image:image,Wallet_Address:walletAddress},{ validateStatus: false, withCredentials: true });
      console.log('res',res);
    }
  
 
 // end 
  const [walletAddress, setWalletAddress] = useState("0xbeE1C826dB64E9ED6d5607d58C322b44029475eC");

  const iframeConfig = {
    roomUrl: "https://iframe.huddle01.com/test-room",
    height: "600px",
    width: "80%",
  };

  const reactions = [
    "😂",
    "😢",
    "😦",
    "😍",
    "🤔",
    "👀",
    "🙌",
    "👍",
    "👎",
    "🔥",
    "🍻",
    "🚀",
    "🎉",
    "❤️",
    "💯",
  ];

  useEffect(() => {
    huddleIframeApp.on("peer-join", (data) =>
      console.log({ iframeData: data })
    );
    huddleIframeApp.on("peer-left", (data) =>
      console.log({ iframeData: data })
    );

    //when user left the meeting use this hook
    huddleIframeApp.on("me-left", (data) =>
      console.log({ iframeData: data })
    );

    

   console.log('useeffect transcript',transcript)

   
    
  }, []);

  //here
const webcamRef = React.useRef(null);
const capture = React.useCallback( () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)
    setImage(imageSrc)
  },

  [webcamRef]
);

  return (
    <>
    <div className="App">
      <div className="container">
        <div>
          <br />
          
          <button
          onClick={() => {
            start()
          console.log("bhagwa started")}
        }
        >
          Start bhagwa
        </button>

        <button
          onClick={() => {
          stop()
          console.log("bhagwa stoped")}
        }
        >
          Stop bhagwa
        </button>

{/* start */}

    <div >
      <button id="start" onClick={start}>Start</button>
      <button id="stop" onClick={stop}>Stop</button>
    </div>
  

{/* end */}
<button
          onClick={() => {
            capture()
            console.log("webcam")
            huddleIframeApp.methods.unmuteMic()}}
        >
          Enable Webcam
        </button>

          {/* {Object.keys(huddleIframeApp.methods)
            .filter((key) => !["sendReaction", "connectWallet"].includes(key))
            .map((key) => (
              <button
                key={key}
                onClick={() => {
                  huddleIframeApp.methods[key]();
                }}
              >
                {key}
              </button>
            ))} */}
        </div>

        <HuddleIframe config={iframeConfig} />
        <br />
        {reactions.map((reaction) => (
          <button
            key={reaction}
            onClick={() => huddleIframeApp.methods.sendReaction(reaction)}
          >
            {reaction}
          </button>
        ))}

        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          placeholder="Wallet Address"
        />

        {/* <button
          onClick={() => setWalletAddress()}
        >
          Connect Wallet
        </button> */}
      </div>

      <div>img
  <div className="webcam-container">
      <Webcam
        audio={false}
        height={200}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />
      <button
      onClick={(e)=>{e.preventDefault();capture();}}>
      Capture</button>
    </div>
  </div>

    </div>


</>
  );
}

export default App;
