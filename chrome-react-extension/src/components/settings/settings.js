import React, {Component} from "react";
import {Button, Card} from "react-bootstrap";
import '../../App.css';



export class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name : null,
      gender: null,
      age: null,
      status: null
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
            Gender <br/>
            <input type="gender" name="gender" autoComplete="gender" value={this.state.gender} onChange={this.handleChange}/>
            <br/><br/>
            Age <br/>
            <input type="age" name="age" autoComplete="age" value={this.state.age} onChange={this.handleChange}/>
            <br/><br/>
            Professional Status <br/>
            <input type="status" name="status" autoComplete="status" value={this.state.status} onChange={this.handleChange}/>
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