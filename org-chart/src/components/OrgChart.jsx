import PropTypes from "prop-types";
import React from "react";

import { OrgChart } from "d3-org-chart";
import * as d3 from "d3";

class MyOrgChart extends React.Component {
	// See: https://ourcodeworld.com/articles/read/1478/how-to-expose-and-access-a-specific-dom-element-in-reactjs
	// See: https://github.com/bumbeishvili/org-chart
	// See: https://stackblitz.com/edit/web-platform-lwyild
	
	constructor({
		root_margin = 100,
	} = {}) {
		super();

		this.myRefElement = React.createRef();
		this.orgChart = new OrgChart()
			.rootMargin(root_margin)
			.nodeWidth((d) => 210)
			.nodeHeight((d) => 140)
			.childrenMargin((d) => 130)
			.compactMarginBetween((d) => 75)
			.compactMarginPair((d) => 80)
			.linkUpdate(function (d, i, arr) {
				d3.select(this)
					.attr("stroke", (d) =>
						d.data._upToTheRootHighlighted ? "#152785" : "lightgray"
					)
					.attr("stroke-width", (d) =>
						d.data._upToTheRootHighlighted ? 5 : 1.5
					)
					.attr("stroke-dasharray", "4,4");
	
				if (d.data._upToTheRootHighlighted) {
					d3.select(this).raise();
				}
			})
			.nodeContent(function (d, i, arr, state) {
				const colors = [
					"#6E6B6F",
					"#18A8B6",
					"#F45754",
					"#96C62C",
					"#BD7E16",
					"#802F74",
				];
				const color = colors[d.depth % colors.length];
				const imageDim = 80;
				const lightCircleDim = 95;
				const outsideCircleDim = 110;

				$(document.createElement("div"))
					.css({
						backgroundColor: "white",
						position: "absolute",
					})
	
				return `
					<div style="background-color:white; position:absolute;width:${
						d.width
					}px;height:${d.height}px;">
						 <div style="background-color:${color};position:absolute;margin-top:-${outsideCircleDim / 2}px;margin-left:${d.width / 2 - outsideCircleDim / 2}px;border-radius:100px;width:${outsideCircleDim}px;height:${outsideCircleDim}px;"></div>
						 <div style="background-color:#ffffff;position:absolute;margin-top:-${
						 lightCircleDim / 2
						 }px;margin-left:${d.width / 2 - lightCircleDim / 2}px;border-radius:100px;width:${lightCircleDim}px;height:${lightCircleDim}px;"></div>
						 <img src=" ${
						 d.data.imageUrl
						 }" style="position:absolute;margin-top:-${imageDim / 2}px;margin-left:${d.width / 2 - imageDim / 2}px;border-radius:100px;width:${imageDim}px;height:${imageDim}px;" />
						 <div class="card" style="top:${
						 outsideCircleDim / 2 + 10
						 }px;position:absolute;height:30px;width:${d.width}px;background-color:#3AB6E3;">
							<div style="background-color:${color};height:28px;text-align:center;padding-top:10px;color:#ffffff;font-weight:bold;font-size:16px">
								${d.data.name} 
							</div>
							<div style="background-color:#F0EDEF;height:28px;text-align:center;padding-top:10px;color:#424142;font-size:16px">
								${d.data.positionName} 
							</div>
						 </div>
					 </div>
		`;
				})
	}

	componentDidMount() {
		this.orgChart.container(this.myRefElement.current);
		this.loadData();
	}

	loadData() {
		this.orgChart
			.data([{name: "Lorem", id: 1}, {name: "Ipsum", id: 2, parentId: 1}])
			.render();
	}

	render() {
		return (
			<div ref={this.myRefElement}></div>
		);
	}
}

MyOrgChart.defaultProps = {
}

MyOrgChart.propTypes = {
};

export default MyOrgChart;