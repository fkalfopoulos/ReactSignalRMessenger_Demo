import React from 'react';

/**
 * @property {String} 	route: 			The route that the navbar option maps to
 * @property {Object} 	option_style: 	The style of the navbar option
 * @property {String} 	title: 			The option text 
 * @property {Array} 	dropdown: 		The list of dropdown options
 */

const NavbarOption = (props) => {

	// Define the default style for the topbar
	var default_style = {
		backgroundColor:'#07253F',
		paddingTop:'15px'
	}

	return (
		<li className='navbar-option' style= {props.option_style || default_style}>
			<a href={props.route} style={{color:'white'}}>{ props.title} </a>
			{props.dropdown && props.dropdown.length > 0 &&
				<ul className='menu vertical' 
					style={{border: '0px', 
							backgroundColor:'#07253F',
							padding:'10px 0px 10px 0px'}}>
					{ props.dropdown.map((item, count) => {
						return <li key={count} 
								   className='dropdown-option'>
							<a href='/'
							   style={{color:'white'}}>
							   {item}
							</a>
						</li>
					})}
				</ul>
			}
		</li>
	)
}

export default NavbarOption;
