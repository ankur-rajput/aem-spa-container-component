import styled from 'styled-components';
import respondTo from '../../utils/mixins';

const WrapperDiv = styled.div.attrs((props) => ({
	className: props.className,
}))`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	div.container.responsivegrid {
		padding: 0; // Override padding for containers inside column control.
	}
	> div {
		width: 100%;
	}
	${respondTo.lg`
		&.cmp-columncontrol {
			&--50 {
				> div {
						width: 49%;
				}
			}
			&--25-75 {
				> div:nth-child(1) {
					width: 24%;
				}
				> div:nth-child(2) {
					width: 74%;
				}
			}
			&--75-25 {
				> div:nth-child(1) {
					width: 74%;
				}
				> div:nth-child(2) {
					width: 24%;
				}
			}
			&--33 {
				> div {
					width: 32%;
				}
			}
			&--25 {
				> div {
					width: 24%;
				}
			}
		}
	`}
`;

export default WrapperDiv;
