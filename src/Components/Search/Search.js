import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef, useState } from 'react';
import SearchedSong from '../SearchedSong/SearchedSong';
import useSearchSong from '../hooks/useSearchSong';
import styles from './Search.module.scss';

const Search = ({ setCurrentSong }) => {
	const { song, inputResult, searchSong, playSong } = useSearchSong();
	const [input, setInput] = useState('');
	const searchRef = useRef();

	const handleInfiniteScroll = () => {
		if (
			window.innerHeight + searchRef.current.scrollTop + 1 >=
			searchRef.current.scrollHeight
		) {
			console.log('new data should be loaded');
		}
	};

	useEffect(() => {
		searchRef.current.addEventListener('scroll', handleInfiniteScroll);
		return () =>
			searchRef.current.removeEventListener(
				'scroll',
				handleInfiniteScroll
			);
	}, []);

	return (
		<div className={styles.search} ref={searchRef}>
			<div className={styles.searchField}>
				<input
					type='text'
					placeholder='Search a song'
					onBlur={(e) => setInput(e.target.value)}
				/>
				<button onClick={() => searchSong(input)}>
					<MagnifyingGlassIcon></MagnifyingGlassIcon>
				</button>
			</div>

			{<h1>Found songs: {inputResult.length}</h1>}
			<div className={styles.songs}>
				{inputResult.map((result) => (
					<SearchedSong
						key={result.track.key}
						song={result}
						playSong={playSong}
						setCurrentSong={setCurrentSong}
					></SearchedSong>
				))}
			</div>
		</div>
	);
};

export default Search;
