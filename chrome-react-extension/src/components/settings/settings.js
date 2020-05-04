import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import '../../App.css';
import './settings.css';

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : this.props.name,
      gender: this.props.gender,
      age: this.props.age,
      ethnicity: this.props.ethnicity,
    }
  }

  handleChangeSelect = selectedOption => {
    this.setState({ selectedOption });
  };

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
            <select defaultValue={this.state.age} name="age" onChange={this.handleChange}>
                <option value="">Choose not to disclose</option>
                <option value="<10">10 or younger</option>
                <option value="10-20">10-20</option>
                <option value="20-30">20-30</option>
                <option value="30-40">30-40</option>
                <option value="40-50">40-50</option>
                <option value="50-60">50-60</option>
                <option value="60+">60+</option>
            </select>
            <br></br><br></br>
            Gender <br/>
            <select defaultValue={this.state.gender} name="gender" onChange={this.handleChange}>
                <option value="">Choose not to disclose</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binary</option>
                <option value="other">Other</option>
            </select>
            <br></br><br></br>
            Race <br/>
            <select defaultValue={this.state.ethnicity} name="ethnicity" onChange={this.handleChange}>
                <option value="">Choose not to disclose</option>
                <option value="white">White</option>
                <option value="hispanic">Hispanic</option>
                <option value="african american">African American</option>
                <option value="american indian">American Indian</option>
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
    localStorage.setItem('gender', this.state.gender);
    localStorage.setItem('age', this.state.age);
    localStorage.setItem('ethnicity', this.state.ethnicity);
    this.props.landingPage();
  }
}

/*************************/
/*   Export Statements   */
/*************************/
export default Settings;