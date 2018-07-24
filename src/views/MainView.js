import {GridListImageItem} from '@enact/moonstone/GridListImageItem';
import IconButton from '@enact/moonstone/IconButton';
import Item from '@enact/moonstone/Item';
import {Panel, Header} from '@enact/moonstone/Panels';
import React from 'react';
import ReactDOM from 'react-dom';
import ri from '@enact/ui/resolution';
import Spotlight from '@enact/spotlight';
import {VirtualGridList} from '@enact/moonstone/VirtualList';

import Panels from '../components/Panels';
import Placeholder from '../components/Placeholder';

const renderItem = ({items}, nextPanel, renderIt) => ({index, ...rest}) => {
	const {text, source, render} = items[index];

	return render ? (
		<GridListImageItem
			{...rest}
			onClick={nextPanel}
			caption={text}
			source={source}
		/>
	) : (
		<Placeholder
			{...rest}
			caption={text}
			source={source}
			// eslint-disable-next-line react/jsx-no-bind
			onFocus={() => renderIt(index)}
		/>
	);
};

const getItems = (startAt = 0) => {
	const items = [];

	for (let i = 0; i < 20; i++) {
		const
			count = ('00' + (i + startAt)).slice(-3),
			text = `Loooooooooooooong Item ${count}`,
			color = Math.floor((Math.random() * (0x1000000 - 0x101010)) + 0x101010).toString(16),
			source = `http://placehold.it/300x300/${color}/ffffff&text=Image ${i + startAt}`;

		items.push({text, source, render: false});
	}
	return items;
}

const itemSize = {
	minWidth: ri.scale(180),
	minHeight: ri.scale(270)
};

const MainView = class extends React.Component {
	static displayName = 'MainView'

	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			items: getItems(0)
		};
	}

	componentDidMount () {
		// eslint-disable-next-line react/no-find-dom-node
		this.node = ReactDOM.findDOMNode(this);
	}

	componentWillUpdate (_, nextState) {
		if (nextState.index !== this.state.index) {
			Spotlight.pause();
		}
	}

	componentDidUpdate (_, prevState) {
		const {index} = this.state;

		if (prevState.index !== index) {
			Spotlight.resume();
			if (!Spotlight.getCurrent()) {
				Spotlight.focus(this.node.querySelector(`[data-index='${index}']`).dataset.spotlightId);
			}
		}
	}

	nextPanel = () => {
		const nextIndex = this.state.index + 1;

		this.setState({
			index: nextIndex,
			items: getItems(nextIndex * 100)
		});
	}

	handleBreadcrumbSelect = ({index}) => {
		this.setState({
			index,
			items: getItems(index * 100)
		});
	}

	renderIt = (index) => {
		this.setState(state => {
			state.items[index].render = true;
			return state;
		});
	}

	render() {
		const {index} = this.state;

		return (
			<Panels
				index={index}
				onBreadcrumbSelect={this.handleBreadcrumbSelect}
			>
				<Panel data-index={index}>
					<Header
						fullBleed
						title={`panel ${index + 1} title`}
						titleBelow={`panel ${index + 1} titleBelow`}
					>
						<IconButton small tooltipText="IconButton">list</IconButton>
						<IconButton small tooltipText="IconButton">trash</IconButton>
						<IconButton small tooltipText="IconButton">check</IconButton>
						<IconButton small tooltipText="IconButton">search</IconButton>
					</Header>
					<Item onClick={this.nextPanel}>Next Panel</Item>
					<VirtualGridList
						dataSize={this.state.items.length}
						direction={index === 0 ? 'horizontal' : 'vertical'}
						itemRenderer={renderItem(this.state, this.nextPanel, this.renderIt)}
						itemSize={itemSize}
						style={{
							height: ri.unit(552, 'rem')
						}}
					/>
				</Panel>
			</Panels>
		);
	}
};

export default MainView;