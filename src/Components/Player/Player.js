import React, { useEffect, useRef, useState } from 'react';

const Player = ({ currentSong }) => {
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key':
				'c8302eabafmshb7fc42660d28305p115909jsn2dd79afa4d6f',
			'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
		},
	};
	const [song, setSong] = useState({});
	const sourceRef = useRef();

	useEffect(() => {
		fetch(
			`https://shazam.p.rapidapi.com/songs/get-details?key=${currentSong}&locale=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				setSong(response);
				sourceRef.current.src = `${response.hub.actions[1].uri}`;
				console.log(sourceRef.current);
			});
	}, [currentSong]);

	return (
		<div>
			<h1>This is player.</h1>

			<br />

			<audio controls ref={sourceRef}></audio>
		</div>
	);
};

export default Player;
