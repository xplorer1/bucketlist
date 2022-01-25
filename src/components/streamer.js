import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function Streamer() {
	let stream;
	let identityInput;
	let streamNameInput;
	let startEndButton;
	let video;
	let liveNotification;

	let [streaming, setStreaming] = useState(false);
	let [room, setRoom] = useState("");
	let [streamDetails, setStreamDetails] = useState({});

	const addLocalVideo = async () => {
		let videoTrack = await window.Twilio.Video.createLocalVideoTrack();
		let trackElement = videoTrack.attach();
		stream.appendChild(trackElement);
	};

	const startStream = async (streamName, identity) => {
	  // Create the livestream
	  const startStreamResponse = await fetch('http://localhost:9000/api/user/restaurant/start_stream', {
	    method: 'POST',
	    headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify({
		    "restaurantId": identity,//"612d9400112b3613676d6037",
		    "restaurantName": streamName//"Oak Tower"
		})
	  });

	  let streamRes = await startStreamResponse.json();
	  setStreamDetails(streamRes.data);

	  console.log("stream res: ", streamRes);

		const roomId = streamRes.data.roomId;

		// Get an Access Token
		const tokenResponse = await fetch('http://localhost:9000/api/user/restaurant/streamer_token', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  'identity': identity,
			  'room': roomId
			})
		});

		const tokenData = await tokenResponse.json();

		console.log("tokenData: ", tokenData);

		// Connect to the Video Room
		let roomDetails = await window.Twilio.Video.connect(tokenData.data);
		console.log("roomDetails: ", roomDetails);
		setRoom(roomDetails);
		setStreaming(true);

		stream.insertBefore(liveNotification, video);

		startEndButton.disabled = false;
		startEndButton.classList.replace('bg-green-500', 'bg-red-500');
		startEndButton.classList.replace('hover:bg-green-500', 'hover:bg-red-700');
	}

	const endStream = async () => {
	  // If streaming, end the stream
	  if (streaming) {
	    try {
	      const response = await fetch('/http://localhost:9000/api/user/restaurant/end_stream', {
	        method: 'POST',
	        headers: {
	          'Content-Type': 'application/json',
	        },
	        body: JSON.stringify({
	          streamDetails: streamDetails
	        })
	      });

	      const data = await response.json();
	      room.disconnect();
	      setStreaming(false);
	      liveNotification.remove();

	      startEndButton.innerHTML = 'start stream';
	      startEndButton.classList.replace('bg-red-500', 'bg-green-500');
	      startEndButton.classList.replace('hover:bg-red-500', 'hover:bg-green-700');
	      identityInput.disabled = false;
	      streamNameInput.disabled = false;

	    } catch (error) {
	      console.log(error)
	    }
	  }
	}

	const startOrEndStream = async (event) => {
	  event.preventDefault();
	  if (!streaming) {
	    const streamName = streamNameInput.value;
	    const identity = identityInput.value;

	    startEndButton.innerHTML = 'end stream';
	    startEndButton.disabled = true;
	    identityInput.disabled = true;
	    streamNameInput.disabled = true;

	    try {
	      await startStream(streamName, identity);

	    } catch (error) {
	      console.log(error);
	      alert('Unable to start livestream.');
	      startEndButton.innerHTML = 'start stream';
	      startEndButton.disabled = false;
	      identityInput.disabled = false;
	      streamNameInput.disabled = false;
	    }

	  }
	  else {
	    endStream();
	  }
	};

	window.addEventListener('beforeunload', async (event) => {
	  event.preventDefault();
	  await endStream();
	  event.returnValue = '';
	});

	useEffect(() => {
		stream = document.getElementById('stream');
		identityInput = document.getElementById('identity');
		streamNameInput = document.getElementById('streamName');
		startEndButton = document.getElementById('streamStartEnd');
		video = document.getElementsByTagName('video')[0];
		liveNotification = document.getElementById("liveNotification");
		addLocalVideo();
	});

    return (
        <div id="container" className="container mx-auto mt-10 justify-center items-center text-center">

		  <div id="stream" className="flex items-center justify-center w-full">
		    {/* video will be added here */}
		  </div>

		  <div id="controls" className="mt-10">
		    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="identity" type="text" placeholder="Your name" required />
		    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="streamName" type="text" placeholder="Livestream name" required />
		    <button onClick={startOrEndStream} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 mr-2 rounded" id="streamStartEnd">
		      start stream
		    </button>
		  </div>

		  <div id="liveNotification" className="absolute', 'top-10', 'left-48', 'p-2', 'bg-red-500', 'text-white">
		  	LIVE
		  </div>
		</div>
    )
}

export default Streamer;