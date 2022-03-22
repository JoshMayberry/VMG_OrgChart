import PropTypes from "prop-types";
import React from "react";

import { OrgChart } from "d3-org-chart";

class MyOrgChart extends React.Component {
	// See: https://ourcodeworld.com/articles/read/1478/how-to-expose-and-access-a-specific-dom-element-in-reactjs
	// See: https://github.com/bumbeishvili/org-chart
	// See: https://stackblitz.com/edit/web-platform-lwyild
	
	constructor({
		test_2,
	} = {}) {
		super();

		console.log("@1", {test_2})

		this.myRefElement = React.createRef();
		this.orgChart = new OrgChart();
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