import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import SearchedSong from '../SearchedSong/SearchedSong';
import useSearchSong from '../hooks/useSearchSong';
import styles from './Search.module.scss';

const Search = ({ setCurrentSong, seaRef, playRef, recRef }) => {
	const { inputResult, searchSong, playSong } = useSearchSong();
	const [input, setInput] = useState('');

	const handleInfiniteScroll = () => {
		if (
			window.innerHeight + seaRef.current.scrollTop + 1 >=
			seaRef.current.scrollHeight
		) {
			console.log('new data should be loaded');
		}
	};

	useEffect(() => {
		seaRef.current.addEventListener('scroll', handleInfiniteScroll);
		return () =>
			seaRef.current.removeEventListener('scroll', handleInfiniteScroll);
	}, []);

	return (
		<div className={styles.search} ref={seaRef}>
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

			<div className={styles.songs}>
				{inputResult.map((result) => (
					<SearchedSong
						key={result.track.key}
						song={result}
						playSong={playSong}
						setCurrentSong={setCurrentSong}
						recRef={recRef}
						playRef={playRef}
						seaRef={seaRef}
					></SearchedSong>
				))}
			</div>
		</div>
	);
};

export default Search;
