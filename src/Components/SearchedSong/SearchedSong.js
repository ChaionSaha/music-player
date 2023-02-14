import React from 'react';
import styles from './SearchedSong.module.scss';

const SearchedSong = ({ song, setCurrentSong }) => {
	// const { playSong } = useSearchSong();
	return (
		<div
			className={styles.song}
			onClick={() => setCurrentSong(song.track.key)}
		>
			<p>{song.track.title}</p>
			<img src={song.track.images?.coverart} alt='cover art' />
		</div>
	);
};

export default SearchedSong;
