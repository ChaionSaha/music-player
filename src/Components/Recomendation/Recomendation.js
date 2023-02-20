import React, { useEffect, useState } from 'react';
import RecSong from '../RecSong/RecSong';
import styles from './Recomendation.module.scss';

const Recomendation = ({ currentSong, setCurrentSong }) => {
	const [songs, setSongs] = useState([]);
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key':
				'c8302eabafmshb7fc42660d28305p115909jsn2dd79afa4d6f',
			'X-RapidAPI-Host': 'shazam.p.rapidapi.com',
		},
	};
	useEffect(() => {
		fetch(
			`https://shazam.p.rapidapi.com/songs/list-recommendations?key=${
				currentSong ? currentSong : 484129036
			}`,
			options
		)
			.then((res) => res.json())
			.then((response) => {
				setSongs(response.tracks);
			})
			.catch((err) => console.log(err));
	}, [currentSong]);
	return (
		<div className={styles.rec}>
			{/* <h1>Recommendation for you</h1> */}
			<div className='songs'>
				{songs?.map((result) => (
					<RecSong
						key={result.key}
						song={result}
						setCurrentSong={setCurrentSong}
					></RecSong>
				))}
			</div>
		</div>
	);
};

export default Recomendation;
