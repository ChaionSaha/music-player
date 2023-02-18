import React, { useEffect, useRef, useState } from 'react';
import PlayerControl from '../MusicPlayer/PlayerControl';
import styles from './Player.module.scss';

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
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState('');
	const [ct, setCt] = useState('');
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
			});
	}, [currentSong]);

	useEffect(() => {
		if (isPlaying) sourceRef.current.play();
		else {
			sourceRef.current.pause();
		}
	}, [isPlaying]);

	const onPlaying = () => {
		setDuration(sourceRef.current.duration);
		setCt(sourceRef.current.currentTime);
	};

	return (
		<div className={styles.player}>
			<audio ref={sourceRef} onTimeUpdate={onPlaying}></audio>
			{
				<PlayerControl
					song={song}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					duration={duration}
					ct={ct}
					sourceRef={sourceRef}
				></PlayerControl>
			}
		</div>
	);
};

export default Player;
