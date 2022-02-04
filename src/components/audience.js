import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

function Audience() {
	let streamPlayer;
	let startEndButton;
	let player = {};

	//let [player, setPlayer] = useState({});
	let [watchingStream, setWatchingStream] = useState(false);

	const watchStream = async () => {
	  try {
	    const response = await fetch('https://streameats.herokuapp.com/api/user/restaurant/audience_token', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	      }
	    });

	    const data = await response.json();

	    if (data.message) {
	      alert(data.message);
	      return;
	    }

	    player = await window.Twilio.Live.Player.connect(data.token, {playerWasmAssetsPath: '../livePlayer'});
	    player.play();
	    streamPlayer.appendChild(player.videoElement);

	    setWatchingStream(true);
	    startEndButton.innerHTML = 'leave stream';
	    startEndButton.classList.replace('bg-green-500', 'bg-red-500');
	    startEndButton.classList.replace('hover:bg-green-500', 'hover:bg-red-700');

	  } catch (error) {
	    console.log(error);
	    alert('Unable to connect to livestream');
	  }
	}

	const leaveStream = () => {
	  player.disconnect();
	  setWatchingStream(false);

	  startEndButton.innerHTML = 'watch stream';
	  startEndButton.classList.replace('bg-red-500', 'bg-green-500');
	  startEndButton.classList.replace('hover:bg-red-500', 'hover:bg-green-700');
	}

	const watchOrLeaveStream = async (event) => {
		  event.preventDefault();
		  if (!watchingStream) {
		    await watchStream();
		  }
		  else {
		    leaveStream();
		  }
	};

	useEffect(() => {
		streamPlayer = document.getElementById('player');
		startEndButton = document.getElementById('streamStartEnd');
	});

    return (
        <div className="container mx-auto mt-10 justify-center items-center text-center">
			<div id="player" className="mx-auto bg-gray-200 h-96 max-w-2xl">
			{/* livestream will appear here */}
			</div>

			<button onClick={watchOrLeaveStream} className="bg-green-500 hover:bg-green-700 text-white font-bold mt-10 py-2 px-6 mr-2 rounded" id="streamStartEnd">
				watch stream
			</button>
		</div>
    )
}

export default Audience;