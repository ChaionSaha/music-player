import { useState } from 'react';

const useSearchSong = () => {
	const [song, setSong] = useState({});
	// const [input, setInput] = useState('');
	const [inputResult, setInputResult] = useState([]);

	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key':
				'c8302eabafmshb7fc42660d28305p115909jsn2dd79afa4d6f',
			'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
		},
	};

	const searchSong = (input) => {
		fetch(
			`https://shazam.p.rapidapi.com/search?term=${encodeURIComponent(
				input
			)}&offset=0&limit=5`,
			options
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data.tracks.hits);
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
				console.log(response);
				setSong(response);
			});
	};

	return { song, inputResult, searchSong, playSong };
};

export default useSearchSong;
