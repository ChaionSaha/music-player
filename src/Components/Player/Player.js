import React from 'react';

const Player = ({ song }) => {
	return (
		<div>
			<h1>This is player.</h1>

			<br />
			{console.log(song)}
			{song.hub ? (
				<audio controls>
					<source src={song.hub.actions[1].uri}></source>
				</audio>
			) : (
				<div></div>
			)}
		</div>
	);
};

export default Player;
