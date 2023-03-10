import React, { useEffect, useRef, useState } from 'react';
import options from '../../api.init';
import PlayerControl from '../MusicPlayer/PlayerControl';
import styles from './Player.module.scss';

const Player = ({ currentSong, playRef }) => {
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
		sourceRef.current.volume = localStorage.getItem('volume')
			? JSON.parse(localStorage.getItem('volume')) / 100
			: 1;
	}, []);

	const onPlaying = () => {
		setDuration(sourceRef.current.duration);
		setCt(sourceRef.current.currentTime);
	};

	return (
		<div className={styles.player} ref={playRef}>
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
