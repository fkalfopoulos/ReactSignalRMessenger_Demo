import React, { Component } from 'react';
import NavbarOption from './navbar_option';

/**
 * @property {Array} 			 options: 		 The options within the navbar -> can contain "drops", or options for dropdown menu
 * @property {String} 			 title: 		 the title of the navbar in the left hand corner	
 * @property {Object} (OPTIONAL) style: 		 The style of the outer navbar
 * @property {Object} (OPTIONAL) option_style:   The style of the options inside the navbar
 * @property {JSX} 	  (OPTIONAL) custom_header:	 A custom header that will replace the default h3 header
 * @property {JSX} 	  (OPTIONAL) custom_options: A custom list of options that will replace the default NavbarOptions
 */
class Navbar extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		var count = 0;
		const renderListItems = (item) => {
			count++;
			return <NavbarOption key={count}
								 title={item.title}
								 dropdown={item.drops}
								 route={item.route}
								 style={this.props.options_style}/>
		}

		// Define the default style for the topbar
		var default_style = {
			backgroundColor:'#07253F'
		}

		return ( 
			<div className='top-bar' style={this.props.style || default_style}>
				{this.props.custom_header || 
					<div className='top-bar-left'>
						<h3 style={{padding:'10px 0px 0px 10px', color:'white'}}>Title</h3>
					</div>
				}
				<div className='top-bar-right'>
					{this.props.custom_options ||
						<ul className='dropdown menu' data-dropdown-menu style={{marginLeft:'5px'}}>
							{this.props.options.map(renderListItems)}
						</ul>
					} 
				</div>
			</div>
		)	
	}
}

export default Navbar;