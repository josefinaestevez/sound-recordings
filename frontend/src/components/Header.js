import React, {Component} from 'react';
import { Menu, Container } from 'semantic-ui-react'

class Header extends Component {
	render() {
		return(
			<Menu>
				<Container fluid>
					<Menu.Item>
						Sound Recording Metadata Matcher
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default Header;