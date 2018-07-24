import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Skinnable from '@enact/moonstone/Skinnable';
import Spottable from '@enact/spotlight/Spottable';

import css from './Placeholder.less';

const PlaceholderBase = kind({
	name: 'Placeholder',

	propTypes: {
		source: PropTypes.string.isRequired,
		caption: PropTypes.string
	},

	styles: {
		css,
		className: 'placeholder'
	},

	computed: {
		className: ({caption, styler}) => styler.append(
			caption ? 'useCaption' : null
		)
	},

	render: ({caption, source, ...rest}) => {
		return (
			<div {...rest}>
				<img className={css.image} src={source} />
				<div className={css.caption}>{caption}</div>
			</div>
		);
	}
});

const PlaceholderDecorator = compose(
	Spottable,
	Skinnable
);

const Placeholder = PlaceholderDecorator(PlaceholderBase);

export default Placeholder;
export {
	Placeholder,
	PlaceholderBase
};
