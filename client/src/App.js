import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Create from './components/create/create.js';
import Response from './components/response/response.js';
import Questions from './components/questions/questions.js';
import SignupLogin from './components/signupLogin/signupLogin.js';
import {BrowserRouter as Router} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {Navbar} from 'react-bootstrap'

const App = () => {
	const [value, setValue] = React.useState(localStorage.getItem('myValueInLocalStorage') || "false");

	React.useEffect(() => {
		localStorage.setItem('myValueInLocalStorage', value);
	}, [value]);

	const login = () => setValue("employee");
	const logout = () => setValue("false");

	const questionsPage = (props) => {
		return (
			<Questions/>
		);
	};

	const responsePage = (props) => {
		return (
			<Response/>
		);
	};

	const createPage = (props) => {
		return (
			<Create/>
		);
	};

	const signupLogin = (props) => {
		return (
			<SignupLogin
				login={login}
				logout={logout}
				user={value}
			/>
		);
	};

	return (
		<div>
			<Router>
				<div className="App">
					<div>
						<Navbar>
							 <Navbar.Brand href="/">logo</Navbar.Brand>
								<Navbar.Collapse className="justify-content-end">
									<Navbar.Text>
									</Navbar.Text>
								</Navbar.Collapse>
						</Navbar>
					</div>
					<Route path="/" exact strict render={questionsPage}/>
					<Route path="/questions" exact strict render={questionsPage}/>
					<Route path="/createPage" exact strict render={createPage}/>
					<Route path="/signupLogin" exact strict render={signupLogin}/>
					<Route path="/responsePage" exact strict render={responsePage}/>
				</div>
			</Router>
		</div>
	)
};

export default App;
