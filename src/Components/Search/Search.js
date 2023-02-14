import React, { useState } from 'react';
import Player from '../Player/Player';
import SearchedSong from '../SearchedSong/SearchedSong';
import useSearchSong from '../hooks/useSearchSong';
import styles from './Search.module.scss';

const Search = () => {
	const { song, inputResult, searchSong, playSong } = useSearchSong();
	const [input, setInput] = useState('');
	return (
		<div>
			<Player song={song}></Player>
			<input
				type='text'
				placeholder='Search a song'
				onBlur={(e) => setInput(e.target.value)}
			/>
			<button onClick={() => searchSong(input)}>Search</button>
			{<h1>Found songs: {inputResult.length}</h1>}
			<div className={styles.songs}>
				{inputResult.map((result) => (
					<SearchedSong
						key={result.track.key}
						song={result}
						playSong={playSong}
					></SearchedSong>
				))}
			</div>
		</div>
	);
};

export default Search;