import React from 'react';

class EventDisplay extends React.Component {
	// LOGS CHAMPION KILLS PER FRAME
	log() {
		// FIRST/SECOND GAME
		if ((this.props.timeline1 && this.props.champImg1 && this.props.playerInfo1 && this.props.gamesToSee === 1) || (this.props.timeline2 && this.props.champImg2 && this.props.playerInfo2 && this.props.gamesToSee === 2)) {
			let eventPerGame = [];
			for (let i = 1; i <= this.props.gamesToSee; i++) {
				let interaction = [];
				
				if (this.props["timeline" + i.toString()][this.props.spot]) {
					if (this.props["timeline" + i.toString()][this.props.spot][0].events) {
						let searchEvents = this.props["timeline" + i.toString()][this.props.spot][0].events;

						for (let j = 0; j < searchEvents.length; j++) {
							if (searchEvents[j].eventType === "CHAMPION_KILL") {
								if (searchEvents[j].killerId === 0) {
									interaction.push([ this.props["champImg" + i.toString()][this.props["playerInfo" + i.toString()][searchEvents[j].victimId - 1][1]] ])
								}
								else {
									interaction.push([ this.props["champImg" + i.toString()][this.props["playerInfo" + i.toString()][searchEvents[j].killerId - 1][1]], this.props["champImg" + i.toString()][this.props["playerInfo" + i.toString()][searchEvents[j].victimId - 1][1]] ]);
								}
							}
						}
					}
					eventPerGame.push(interaction);
				}
				else {
					eventPerGame.push([]);
				}
			}
			return eventPerGame;
		}
	}

	render() {
		let stat = this.log();

		// DOESN'T EXIST INITIALLY
		if (!stat) {
			return (
				<div id="eventDisplay">
					
				</div>
			)
		}

		// GAME 1
		if (this.props.gamesToSee === 1) {
			return (
				<div id={"eventDisplay" + 1 * this.props.gamesToSee}>
					{ stat[0].map(champFight => {

							if (!champFight[1]) {
								return (
									<div>
										<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props.patch1 + "/img/champion/" + champFight[0] + ".png"} height={40} width={40} />
											&nbsp;&nbsp;&nbsp; executed!
									</div>
								)
							}
							return (
								<div>
									<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props.patch1 + "/img/champion/" + champFight[0] + ".png"} height={40} width={40} />
										&nbsp;&nbsp;&nbsp; has slain &nbsp;&nbsp;&nbsp;
									<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props.patch1 + "/img/champion/" + champFight[1] + ".png"} height={40} width={40} />
								</div>
							)
						})
					}
				</div>
			)
		}

		// GAME 2
		if (this.props.gamesToSee === 2) {
			let eventArr = [1, 2];
			return (
				<div>
					{	eventArr.map(i => {
							return (
								<div id={"eventDisplay" + i * this.props.gamesToSee} key={i}>
									{ stat[i-1].map(champFight => {
											if (!champFight[1]) {
												return (
													<div id="playerExecuted">
														<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props["patch" + i.toString()] + "/img/champion/" + champFight[0] + ".png"} height={30} width={30} />
															&nbsp;&nbsp;&nbsp; has been executed!
													</div>
												)
											}
											return (
												<div id="playerKPlayer">
													<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props["patch" + i.toString()] + "/img/champion/" + champFight[0] + ".png"} height={30} width={30} />
														&nbsp;&nbsp;&nbsp; has slain &nbsp;&nbsp;&nbsp;
													<img src={"http://ddragon.leagueoflegends.com/cdn/" + this.props["patch" + i.toString()] + "/img/champion/" + champFight[1] + ".png"} height={30} width={30} />
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				</div>
			)
		}
	}
}

module.exports = EventDisplay;