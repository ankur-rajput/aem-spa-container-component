import React from 'react';
import { MapTo, ComponentMapping, Container } from '@adobe/aem-react-editable-components';
import {
 CoreContainerProperties, CoreContainerState, withStandardBaseCssClass, CoreContainerItem,
} from '@adobe/aem-core-components-react-spa';
import WrapperDiv from './styles';

export interface ColumnControlProps extends CoreContainerProperties {
	columnLayout: string;
	cqItems: { [key: string]: CoreContainerItem };
}

const ColumnControlConfig = {
	emptyLabel: 'Column Control',

	isEmpty(props: ColumnControlProps) {
	  return !props || !props.columnLayout;
	},
  };

const ColumnLayoutToNumOfColumnsMap: {[key: string]: number} = {
	'--50': 2,
	'--75-25': 2,
	'--25-75': 2,
	'--33': 3,
	'--25': 4,
};

class ColumnControl extends Container<ColumnControlProps, CoreContainerState> {
	constructor(props:ColumnControlProps) {
        super(props);

        this.state = {
            componentMapping: this.props.componentMapping || ComponentMapping,
        };
    }

	/**
	 * Render the configured number of columns
	 * @returns columns markup
	 */
	configuredColumns() {
		const numOfColumnsToRender = ColumnLayoutToNumOfColumnsMap[this.props.columnLayout];

		return (
			<WrapperDiv className={`${this.props.baseCssClass} ${this.props.baseCssClass}${this.props.columnLayout}`}>
				{
					this.renderFirstNColumns(numOfColumnsToRender)
				}
			</WrapperDiv>
		);
	}

	renderFirstNColumns(numOfColumns: number) {
		return this.childComponents.slice(0, numOfColumns).map((column, index) => (
				<div className={`${this.props.baseCssClass}__column ${this.props.baseCssClass}__column--${index}`}>
					{column}
				</div>
			));
	}

	get columnControlProps() {
		const attrs = this.containerProps;
		attrs.className = `${attrs.className} ${this.props.baseCssClass}`;
		attrs['data-cmp-is'] = 'columncontrol';
		return attrs;
	}

	render() {
		const isEmpty = ColumnControlConfig.isEmpty(this.props);

		return (
			<div {...this.columnControlProps}>
				{ !isEmpty && this.configuredColumns() }
			</div>
		);
	}
}

MapTo('aem-spa-container-component/components/columncontrol')(withStandardBaseCssClass(ColumnControl, 'cmp-columncontrol'), ColumnControlConfig);
