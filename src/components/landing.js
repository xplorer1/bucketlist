import React from 'react';
import ReactDOM from 'react-dom';

function TwilioIndex() {
    return (
        <div className='container mx-auto mt-20 text-center'>
			<div className='mx-auto'>
			  <a href='/streamer' className='hover:no-underline hover:text-blue-500 text-xl'>start a livestream</a>
			</div>

			<div className='mx-auto mt-10'>
				<a href='/watch' className='hover:no-underline hover:text-blue-500 text-xl'>watch a livestream</a>
			</div>
	    </div>
    )
}

export default TwilioIndex;