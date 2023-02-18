import { useState } from 'react';
import './App.scss';
import Player from './Components/Player/Player';
import Recomendation from './Components/Recomendation/Recomendation';
import Search from './Components/Search/Search';

function App() {
	// const { song } = useSearchSong();
	const [currentSong, setCurrentSong] = useState('');

	return (
		<div className='App'>
			<Recomendation></Recomendation>
			<Player currentSong={currentSong}></Player>
			<Search setCurrentSong={setCurrentSong}></Search>
		</div>
	);
}

export default App;
