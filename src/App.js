import { useEffect, useRef, useState } from 'react';

import {
	MagnifyingGlassIcon,
	MusicalNoteIcon,
	RadioIcon,
} from '@heroicons/react/24/outline';
import styles from './App.module.scss';
import Player from './Components/Player/Player';
import Recomendation from './Components/Recomendation/Recomendation';
import Search from './Components/Search/Search';

function App() {
	const [currentSong, setCurrentSong] = useState('');
	const recRef = useRef();
	const playRef = useRef();
	const searchRef = useRef();

	useEffect(() => {
		if (!currentSong && localStorage.getItem('last-played')) {
			setCurrentSong(JSON.parse(localStorage.getItem('last-played')));
		}
	}, []);

	return (
		<div className={styles.App}>
			<div className={styles.section}>
				<Recomendation
					currentSong={currentSong}
					setCurrentSong={setCurrentSong}
					recRef={recRef}
					playRef={playRef}
					seaRef={searchRef}
				></Recomendation>
				<Player currentSong={currentSong} playRef={playRef}></Player>
				<Search
					className={styles.search}
					setCurrentSong={setCurrentSong}
					seaRef={searchRef}
					playRef={playRef}
					recRef={recRef}
				></Search>
			</div>

			<div className={styles.navbar}>
				<RadioIcon
					onClick={(e) => {
						recRef.current.style.width = '100%';
						playRef.current.style.width = '0%';
						searchRef.current.style.width = '0%';
					}}
				></RadioIcon>
				<MusicalNoteIcon
					onClick={(e) => {
						recRef.current.style.width = '0%';
						playRef.current.style.width = '100%';
						searchRef.current.style.width = '0%';
					}}
				></MusicalNoteIcon>
				<MagnifyingGlassIcon
					onClick={(e) => {
						recRef.current.style.width = '0%';
						playRef.current.style.width = '0%';
						searchRef.current.style.width = '100%';
					}}
				></MagnifyingGlassIcon>
			</div>
		</div>
	);
}

export default App;
