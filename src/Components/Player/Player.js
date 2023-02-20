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
	const playerRef = useRef();

	useEffect(() => {
		fetch(
			`https://shazam.p.rapidapi.com/songs/get-details?key=${currentSong}&locale=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				setSong(response);
				sourceRef.current.src = `${response.hub?.actions[1].uri}`;
				localStorage.setItem(
					'last-played',
					JSON.stringify(currentSong)
				);
				playerRef.current.style.backgroundImage = `url("${response.images.background}")`;
				document.title = `${response.title}`;
			});
	}, [currentSong]);

	useEffect(() => {
		if (isPlaying) sourceRef.current.play();
		else {
			sourceRef.current.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		sourceRef.current.volume =
			JSON.parse(localStorage.getItem('volume')) / 100;
	}, []);

	const onPlaying = () => {
		setDuration(sourceRef.current.duration);
		setCt(sourceRef.current.currentTime);
	};

	return (
		<div className={styles.player}>
			<div className={styles.bgImg} ref={playerRef}></div>
			<div className={styles.audio}>
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
		</div>
	);
};

export default Player;
