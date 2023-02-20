import { useEffect, useState } from 'react';

import styles from './App.module.scss';
import Player from './Components/Player/Player';
import Recomendation from './Components/Recomendation/Recomendation';
import Search from './Components/Search/Search';

function App() {
	const [currentSong, setCurrentSong] = useState('');

	useEffect(() => {
		if (!currentSong && localStorage.getItem('last-played')) {
			setCurrentSong(JSON.parse(localStorage.getItem('last-played')));
		}
	}, []);

	return (
		<div className={styles.App}>
			<Recomendation
				currentSong={currentSong}
				setCurrentSong={setCurrentSong}
			></Recomendation>
			<Player currentSong={currentSong}></Player>
			<Search setCurrentSong={setCurrentSong}></Search>
		</div>
	);
}

export default App;
