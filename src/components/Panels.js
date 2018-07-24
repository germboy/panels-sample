import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';

import {Breadcrumb} from '@enact/moonstone/Panels';
import CancelDecorator from '@enact/moonstone/Panels/CancelDecorator';
import IdProvider from '@enact/moonstone/internal/IdProvider';
import Skinnable from '@enact/moonstone/Skinnable';

import css from './Panels.less';

const getBreadcrumbLabel = (i) => (
	(i < 9 ? '0' : '') + (i + 1)
);

const PanelsBase = kind({
	name: 'Panels',

	propTypes: {
		/**
		 * Function that generates unique identifiers for Panel instances.
		 *
		 * @type {Function}
		 * @required
		 * @private
		 */
		generateId: PropTypes.func.isRequired,

		/**
		 * Panels to be rendered
		 *
		 * @type {Panel}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Unique identifier for the Panels instance
		 *
		 * @type {String}
		 * @public
		 */
		id: PropTypes.string,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		index: PropTypes.number,

		/**
		 * Callback to handle cancel/back key events
		 *
		 * @type {Function}
		 * @public
		 */
		onBack: PropTypes.func,

		/**
		 * A function to run when breadcrumb is clicked
		 *
		 * @type {Function}
		 * @public
		 */
		onBreadcrumbSelect: PropTypes.func
	},

	defaultProps: {
		index: 0
	},

	computed: {
		breadcrumbLabel: ({index}) => getBreadcrumbLabel(index - 1),
		prevIndex: ({index}) => (index - 1)
	},

	render: ({breadcrumbLabel, children, index, onBreadcrumbSelect, prevIndex, ...rest}) => {
		delete rest.generateId;
		delete rest.onBack;

		return (
			<div
				{...rest}
				className={`${css.panels} ${css.activity} enact-fit`}
				data-index={index}
			>
				<div className={css.breadcrumbs}>
					<Breadcrumb
						className={css.breadcrumb}
						index={prevIndex}
						onSelect={onBreadcrumbSelect}
						spotlightDisabled={index === 0}
					>
						&lt; {breadcrumbLabel}
					</Breadcrumb>
				</div>
				<main className={css.viewport}>
					{children}
				</main>
			</div>
		);
	}
});

const Panels = CancelDecorator(
	{cancel: 'onBack'},
	IdProvider(
		Skinnable(
			PanelsBase
		)
	)
);

export default Panels;
export {Panels, PanelsBase};
