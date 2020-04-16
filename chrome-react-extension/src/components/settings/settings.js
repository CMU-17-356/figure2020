import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import '../../App.css';
import './settings.css';



export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : null,
      gender: null,
      age: null,
      ethnicity: null
    }
  }

  handleChange = (e) => {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  };


  render() {
    return (
      <div id="containResponse" >
        <Card style={{"background-color": "rgba(245, 245, 245, .5)", "borderStyle": "solid", "borderWidth": "1px", "borderColor": "#FFF4F9", "border-radius": "15px", "width": "550px"}}>
         <br></br>
        <div style={{ "font-size": "25px", "font-weight": "900px", "text-shadow": "3px 3px #D3D3D3", display: "flex", "flexDirection": "row", "justifyContent": "center", "text-align": "center"}}>
         About Me
        </div>


        <div style= {{"text-align":"center"}}>
        <br></br>
        <form id="informationForm" onSubmit={this.saveInformation}>
            Name <br/>
            <input type="name" name="name" autoComplete="Name" value={this.state.name} onChange={this.handleChange}/>
            <br/><br/>
            Age <br/>
            <input type="age" name="age" autoComplete="age" value={this.state.age} onChange={this.handleChange}/>
            <br/><br/>
            Gender <br/>
            <select value={this.state.gender}>
                <option value=""></option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
            </select>
            <br></br><br></br>
            Race <br/>
            <select value={this.state.ethnicity}>
                <option value=""></option>
                <option value="white">White</option>
                <option value="hispanic">Hispanic</option>
                <option value="african">African American</option>
                <option value="indian">American Indian</option>
                <option value="asian">Asian</option>
                <option value="other">Other</option>
            </select>
            <br/><br/>
            <Button id="submitInformation" variant="outline-dark" onClick={this.saveInformation}>Submit</Button>
        </form>
        <br></br>
        </div>
        </Card>
      </div>
    )
  }

  saveInformation = () => {
    localStorage.setItem('name', this.state.name);
    this.props.landingPage();
  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Settings;