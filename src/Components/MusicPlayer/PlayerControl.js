import {
	BackwardIcon,
	ForwardIcon,
	MusicalNoteIcon,
	PauseCircleIcon,
	PlayCircleIcon,
	SpeakerWaveIcon,
} from '@heroicons/react/24/outline';
import React, { useRef } from 'react';
import styles from './PlayerControl.module.scss';

const PlayerControl = ({
	song,
	isPlaying,
	setIsPlaying,
	duration,
	ct,
	sourceRef,
}) => {
	const seekbarRef = useRef();
	const volumeRef = useRef();
	const checkWidth = (e) => {
		let width = seekbarRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;

		const divprogress = (offset / width) * 100;
		sourceRef.current.currentTime = (divprogress / 100) * duration;
	};

	const checkVolume = (e) => {
		let width = seekbarRef.current.clientWidth;
		const offset = e.nativeEvent.offsetX;

		const divprogress = offset / width;
		sourceRef.current.volume = divprogress;
		console.log(divprogress, sourceRef.current.volume);
	};

	return (
		<div className={styles.playerControl}>
			<h1 className={styles.header}>Now Playing</h1>
			<div className={styles.img}>
				{song.images ? (
					<img
						src={song.images.coverart}
						alt='coverart'
						className={styles.coverArt}
					></img>
				) : (
					<MusicalNoteIcon
						className={styles.musicNote}
					></MusicalNoteIcon>
				)}
			</div>
			<p className={styles.title}>{song.title}</p>
			<p className={styles.author}>{song.subtitle}</p>

			<div className={styles.time}>
				<p className={styles.ct}>
					{new Date(ct * 1000).toISOString().slice(14, -5)}
				</p>
				{duration ? (
					<p className={styles.duration}>
						{new Date(duration * 1000).toISOString().slice(14, -5)}
					</p>
				) : (
					<p className={styles.duration}>
						{new Date(0 * 1000).toISOString().slice(14, -5)}
					</p>
				)}
			</div>

			<div className={styles.bar} ref={seekbarRef} onClick={checkWidth}>
				<p
					className={styles.line}
					style={{
						width: `${ct === 0 ? 0 : (ct / duration) * 100}%`,
					}}
				></p>
				<p
					className={styles.circle}
					style={{ left: `${ct === 0 ? 0 : (ct / duration) * 100}%` }}
				></p>
			</div>
			<div className={styles.playpause}>
				<BackwardIcon
					className={`${styles.icon} ${styles.back}`}
				></BackwardIcon>
				<div className={styles.playDiv}>
					{isPlaying && ct < duration ? (
						<PauseCircleIcon
							className={`${styles.icon} ${styles.play}`}
							onClick={() => setIsPlaying(!isPlaying)}
						></PauseCircleIcon>
					) : (
						<PlayCircleIcon
							className={`${styles.icon} ${styles.play}`}
							onClick={() => setIsPlaying(!isPlaying)}
						></PlayCircleIcon>
					)}
				</div>

				<ForwardIcon
					className={`${styles.icon} ${styles.forward}`}
				></ForwardIcon>
			</div>
			<div className={styles.volume}>
				<SpeakerWaveIcon
					className={styles.volumeIcon}
				></SpeakerWaveIcon>
				<input
					type='range'
					min='0'
					max='100'
					className={styles.volumeBar}
					ref={volumeRef}
					onChange={(e) => {
						sourceRef.current.volume = e.target.value / 100;
						volumeRef.current.style.backgroundSize = `${e.target.value}% 100%`;
					}}
				/>
			</div>
		</div>
	);
};

export default PlayerControl;
