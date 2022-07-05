/* */
import React, { Component } from "react";
//import {Navigation} from 'react-router';
import "./style.css";
import PostSignup from "../DB/postSignup";
import { useNavigate } from "react-router-dom";

import PersonalInfo from "./personalInfo";
import ApproveTests from "./approveTests";

class FormParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      discipline: "basketball",
      gender: "M",
      birthdate: "",
      readTerms: false,
      disciplinesList: [],
      showParentAccept: false,
      parentAccept: false,
      switchId: true,
      isToggleOn: true,
      studiesList: [
        { ID: 1, title: "Anthropometrische Daten" },
        { ID: 2, title: "Sprung-Tests" },
        { ID: 3, title: "Y-Balance-Tests" },
        { ID: 4, title: "Krafttests" },
        { ID: 5, title: "Schnelligkeitstests" },
      ],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //#########################################################################################

  componentDidMount() {
    this.getDisciplines();
  }

  getDisciplines() {
    PostSignup.getAllDisciplines()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ disciplinesList: arr });
          return;
        } else {
          this.setState({ disciplinesList: response.data.res });
        }
      })
      .catch((e) => {
        console.log(e);
        alert("some error has happened");
      });
  }

  componentDidMount() {
    this.getStudies();
  }

  getStudies() {
    PostSignup.getStudies()
      .then((response) => {
        if (response.data.res === "error") {
          const arr = ["connection error"];
          this.setState({ studiesList: arr });
          return;
        } else {
          this.setState({ studiesList: response.data.res });
        }
      })
      .catch((e) => {
        console.log(e);
        alert("some error has happened");
      });
  }

  // ##############################################################################
  setBirthDate(event) {
    event.preventDefault();
    this.setState({ birthdate: event.target.value });
    const date = new Date(event.target.value);
    date.getDate();
    const date18 = new Date();
    date18.setFullYear(date18.getFullYear() - 18);
    // check if the date of birth is before that date
    if (date > date18) {
      this.setState({ showParentAccept: true });
    }
  }

  checkInput(stateData) {
    if (stateData.firstName === "") {
      alert("please input your First Name");
      return false;
    }

    if (stateData.lastName === "") {
      alert("please input your Last Name");
      return false;
    }

    if (stateData.birthdate === "") {
      alert("please input your date of birth");
      return false;
    }

    const date = new Date(stateData.birthdate);
    date.getDate();
    const date16 = new Date();
    date16.setFullYear(date16.getFullYear() - 13);
    // check if the date of birth is before that date
    if (date > date16) {
      alert("You must be over 13 years old to register");
      return false;
    }

    if (stateData.email === "") {
      alert("please input your email");
      return false;
    }

    if (stateData.password === "") {
      alert("password cannot empty!");
      return false;
    }

    if (!stateData.readTerms) {
      alert("please read and accept the terms and conditions");
      return false;
    }
    if (!stateData.parentAccept && stateData.showParentAccept) {
      alert("Please confirm the parent acceptance");
      return false;
    }

    return this.checkPassword(stateData.password);
  }

  checkPassword(password) {
    const passw =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (password.match(passw)) return true;
    alert(
      "Password must be between 8 to 15 characters lenght, contains at least one lowercase letter, " +
        "one uppercase letter, numeric digit, and one special character"
    );
    return false;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.checkInput(this.state)) return;
    PostSignup.setSignUP(this.state)
      .then((response) => {
        if (response.data.res === "error") alert("some error has happened");
        else if (response.data.res === "duplicate key")
          alert("This email is already registered");
        //this.props.history.push('./AfterReg');
        else this.props.navigate("/reg/regSuc");
      })
      .catch((e) => {
        console.log(e);
        alert("some error has happened");
      });
    //event.preventDefault();
  }
  //#########################################################################################

  // go back to previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  // proceed to the next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  // handle field change
  handleChange = (input) => (e) => {
    const target = e.target;
    let value = target.value;
    const name = target.name;
    const id = target.id;

    if (name === "readTerms") {
      value = target.checked;
      console.log("readTerms clicked " + value);
    }
    if (name === "parentAccept") {
      value = target.checked;

      console.log("parentAccept clicked " + value);
    }

    if (name === "switchId") {
      value = target.checked;
      
      console.log("switch " + id + " clicked " + value);
    }
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { step } = this.state;
    const {
      firstName,
      lastName,
      email,
      password,
      discipline,
      gender,
      birthdate,
      readTerms,
      disciplinesList,
      showParentAccept,
      parentAccept,
      switchId,
      isToggleOn,
      studiesList,
    } = this.state;
    const values = {
      firstName,
      lastName,
      email,
      password,
      discipline,
      gender,
      birthdate,
      readTerms,
      disciplinesList,
      showParentAccept,
      parentAccept,
      switchId,
      isToggleOn,
      studiesList,
    };
    switch (step) {
      case 1:
        return (
          <PersonalInfo
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <ApproveTests
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            values={values}
          />
        );

      // never forget the default case, otherwise VS code would be mad!
      default:
      // do nothing
    }
  }
}

function FormParentFct(props) {
  let navigate = useNavigate();

  return <FormParent {...props} navigate={navigate} />;
}

export default FormParentFct;
