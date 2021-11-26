import React, { useContext } from 'react';
import logo from '../../assets/logo1.png';
import { Link } from 'react-router-dom';
import userimg from '../../assets/default.png';
import DispatchContext from '../../context/DispatchContext';
import StateContext from '../../context/StateContext';

export default function Navbar() {
	const appDispatch = useContext(DispatchContext);
	const appState = useContext(StateContext);
	const logout = () => {
		appDispatch({
			type: 'flashMessage',
			value: 'You logged out successfully!',
			status: true
		});
		appDispatch({ type: 'logout' });
	};
	return (
		<div className="header">
			<nav className="nav nav--tour navbar">
				<h1>
					<Link className="header__logo" to="/">
						<img className="" src={logo} alt="logo" />
					</Link>
				</h1>
			</nav>
			{appState.loggedIn && (
				<div className="nav--user">
					<Link to="/me" className="nav__el">
						<img src={userimg} alt="User" className="nav__user-img" />
						<span>User</span>
					</Link>
					<Link to="/login" onClick={logout} className="nav__el">
						<img src={userimg} alt="User" className="nav__user-img" />
						<span>Logout</span>
					</Link>
				</div>
			)}
			{!appState.loggedIn && (
				<div className="nav--user">
					<Link to="/signup" className="nav__el">
						Sign Up
					</Link>
					<Link to="/login" className="nav__el">
						Login
					</Link>
				</div>
			)}
		</div>
	);
}
