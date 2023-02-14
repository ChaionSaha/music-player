import './App.scss';
import Search from './Components/Search/Search';

function App() {
	// const { song } = useSearchSong();

	return (
		<div className='App'>
			<Search></Search>
			{/* <Player song={song}></Player> */}
		</div>
	);
}

export default App;
