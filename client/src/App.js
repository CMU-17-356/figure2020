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
import plus from './plus.png';
import question from './question.png';
import person from './person.png';
import figure from './figure.png';

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
			<Response {...props}/>
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
							 <Navbar.Brand href="/"><img src={figure} width="120px" height="70px" alt=""/></Navbar.Brand>
							 {value !== "false" ?
								(<Navbar.Collapse className="justify-content-end">
									<Navbar.Text>
										<a href="/create"><img src={plus} width="40px" height="40px" alt=""/></a>
										<a href="/"><img src={question} width="40px" height="40px" alt=""/></a>
										<a href="/login"><img src={person} width="50px" height="50px" alt=""/></a>
									</Navbar.Text>
								</Navbar.Collapse>) : 
								(<Navbar.Collapse className="justify-content-end">
									<Navbar.Text>
										<a href="/"><img src={question} width="40px" height="40px" alt=""/></a>
										<a href="/login"><img src={person} width="50px" height="50px" alt=""/></a>
									</Navbar.Text>
								</Navbar.Collapse>)
							}
						</Navbar>
					</div>
					{value !== "false" ?
					<Route path="/create" exact strict render={createPage}/> : null
					}
					<Route path="/" exact strict render={questionsPage}/>
					<Route path="/login" exact strict render={signupLogin}/>
					<Route path="/getresponse/:id" exact strict render={responsePage}/>
				</div>
			</Router>
		</div>
	)
};

export default App;
