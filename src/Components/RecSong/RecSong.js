import { PlayCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import styles from '../SearchedSong/SearchedSong.module.scss';

const RecSong = ({ song, setCurrentSong, seaRef, playRef, recRef }) => {
	return (
		<div
			className={styles.song}
			onClick={() => {
				setCurrentSong(song.key);
				recRef.current.style.width = '0%';
				playRef.current.style.width = '100%';
				seaRef.current.style.width = '0%';
			}}
		>
			<img src={song.images?.coverart} alt='cover art' />
			<div className={styles.details}>
				<p className={styles.title}>{song.title}</p>
				<p className={styles.author}>{song.subtitle}</p>
			</div>
			<div className={styles.playButton}>
				<PlayCircleIcon></PlayCircleIcon>
			</div>
		</div>
	);
};

export default RecSong;
