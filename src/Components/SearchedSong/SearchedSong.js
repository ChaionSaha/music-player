import React from 'react';
import styles from './SearchedSong.module.scss';

const SearchedSong = ({ song, setCurrentSong, seaRef, playRef, recRef }) => {
	return (
		<div
			className={styles.song}
			onClick={() => {
				setCurrentSong(song.track.key);
				recRef.current.style.width = '0%';
				playRef.current.style.width = '100%';
				seaRef.current.style.width = '0%';
			}}
		>
			<img src={song.track.images?.coverart} alt='cover art' />
			<div className={styles.details}>
				<p className={styles.title}>{song.track.title}</p>
				<p className={styles.author}>{song.track.subtitle}</p>
			</div>
		</div>
	);
};

export default SearchedSong;
