import React from 'react';


class ChampImage extends React.Component {
  addChampImg() {
    // APPARENTLY NEEDED TO PROPERLY "SCALE" NEW ICONS FOR USE
    let domain = 
        {
          min: {x: -120, y: -120},
          max: {x: 14870, y: 14980}
        },

        // SCALING MAP DOWN
        width = 512,
        height = 512,

        xScale = d3.scale.linear()
          .domain([domain.min.x, domain.max.x])
          .range([0, width]),

        yScale = d3.scale.linear()
          .domain([domain.min.y, domain.max.y])
          .range([height, 0]);

    if(this.props.png.length) {

      for (let w = 0; w < this.props.playerInfo.length; w++) {
        let checking = this.props.playerInfo[w];

        // REMOVE PREVIOUS ICONS      
        // USE SVG FROM STATE TO APPEND NEW ICONS
        // MAYBE DIDN'T HIT THE NEXT MINUTE TO LOG PLAYER POSITION
        // MOVED REMOVE METHOD TO IF STATEMENT TO NOT REMOVE IMAGE
        if (this.props.timeline[this.props.spot][0].participantFrames[w+1].position) {
          d3.select("#champIcon").remove();
          // console.log(this.props.png)
          this.props.png.append('svg:g').attr("id", "champIcon").selectAll("image")
            .data([[ this.props.timeline[this.props.spot][0].participantFrames[w+1].position.x, this.props.timeline[this.props.spot][0].participantFrames[w+1].position.y ]])
            .enter().append("svg:image")
              .attr('xlink:href', 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/' + this.props.champImg[this.props.playerInfo[w][1]] + '.png')
              .attr('x', d => { return xScale(d[0]) })
              .attr('y', d => { return yScale(d[1]) })
              .attr('class', 'image')
              .style({ 'width': '24px', 'height': '24px' })
        }

        // USER MAY GO STRAIGHT TO LAST FRAME
         if (!this.props.timeline[this.props.spot][0].participantFrames[w+1].position && this.props.timeline[this.props.spot-1][0].participantFrames[w+1].position) {
         d3.select("#champIcon").remove();
          this.props.png.append('svg:g').attr("id", "champIcon").selectAll("image")
            .data([[ this.props.timeline[this.props.spot-1][0].participantFrames[w+1].position.x, this.props.timeline[this.props.spot-1][0].participantFrames[w+1].position.y ]])
            .enter().append("svg:image")
              .attr('xlink:href', 'http://ddragon.leagueoflegends.com/cdn/6.2.1/img/champion/' + this.props.champImg[this.props.playerInfo[w][1]] + '.png')
              .attr('x', d => { return xScale(d[0]) })
              .attr('y', d => { return yScale(d[1]) })
              .attr('class', 'image')
              .style({ 'width': '24px', 'height': '24px' });
        }
      }
    }
  }

  render() {
    let addChampImage = this.addChampImg();
    if (!addChampImage) {
      return (
        <div id="champImages" />
      )
    }

    return (
      <div id="champImages">
        {addChampImage}
      </div>
    )
  }
}

module.exports = ChampImage;