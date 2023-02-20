import { useState } from 'react';
import options from '../../api.init';

const useSearchSong = () => {
	const [song, setSong] = useState({});

	const [inputResult, setInputResult] = useState([]);

	const searchSong = (input) => {
		fetch(
			`https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(
				input
			)}`,
			options
		)
			.then((res) => res.json())
			.then((data) => {
				setInputResult(data.tracks.hits);
			})
			.catch((err) => console.error(err));
	};

	const playSong = (input) => {
		fetch(
			`https://shazam.p.rapidapi.com/songs/get-details?key=${input}&locale=en-US`,
			options
		)
			.then((response) => response.json())
			.then((response) => {
				setSong(response);
			});
	};

	return { song, inputResult, searchSong, playSong };
};

export default useSearchSong;
