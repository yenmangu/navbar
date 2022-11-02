import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as BellIcon } from './facebook-icons/bell.svg';
import { ReactComponent as ArrowIcon } from './facebook-icons/arrow.svg';
import { ReactComponent as BoltIcon } from './facebook-icons/bolt.svg';
import { ReactComponent as CaretIcon } from './facebook-icons/caret.svg';
import { ReactComponent as ChevronIcon } from './facebook-icons/chevron.svg';
import { ReactComponent as CogIcon } from './facebook-icons/cog.svg';
import { ReactComponent as MessengerIcon } from './facebook-icons/messenger.svg';
import { ReactComponent as PlusIcon } from './facebook-icons/plus.svg';

function App() {
	return (
		<Navbar>
			<NavItem icon={<PlusIcon />} />
			<NavItem icon={<BellIcon />} />
			<NavItem icon={<MessengerIcon />} />

			<NavItem icon={<CaretIcon />}>
				<DropdownMenu />
			</NavItem>
		</Navbar>
	);
}

function Navbar(props) {
	return (
		<nav className="navbar">
			<ul className="navbar-nav">{props.children}</ul>
		</nav>
	);
}

function NavItem(props) {
	const [open, setOpen] = useState(false);

	return (
		<li className="nav-item">
			<a
				href="#"
				className="icon-button"
				onClick={() => setOpen(!open)}>
				{props.icon}
			</a>
			{open && props.children}
		</li>
	);
}

function DropdownMenu() {
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);

	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, []);

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}

	function DropDownItem(props) {
		return (
			<a
				href="#"
				className="menu-item"
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
				<span className="icon-button">{props.leftIcon}</span>

				{props.children}

				<span className="icon-right">{props.rightIcon}</span>
			</a>
		);
	}

	return (
		<div className="dropdown">
			<CSSTransition
				in={activeMenu === 'main'}
				unmountOnExit
				timeout={500}
				onEnter={calcHeight}
				classNames="menu-primary">
				<div className="menu">
					<DropDownItem>Profile</DropDownItem>
					<DropDownItem
						leftIcon={<CogIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu="settings">
						Settings
					</DropDownItem>
					<DropDownItem
						leftIcon='⛵️'
						rightIcon={<ChevronIcon />}
						goToMenu="animals">
						Animals
					</DropDownItem>
				</div>
			</CSSTransition>
			<CSSTransition
				in={activeMenu === 'settings'}
				unmountOnExit
				timeout={500}
				onEnter={calcHeight}
				classNames="menu-secondary">
				<div className="menu">
					<DropDownItem
						leftIcon={<ArrowIcon />}
						goToMenu={'main'}
					/>
					<DropDownItem>Settings</DropDownItem>
				</div>
			</CSSTransition>
		</div>
	);
}

export default App;
