import React, { Component } from "react";
import css from "./grades.module.css";

export default class Grade extends Component {
  handleInputChange = (event) => {
    const { grade } = this.props;
    const newGrade = event.target.value;
    grade.grade = parseInt(newGrade);
    this.props.onChangeGrade(grade);
  };
  render() {
    const { grade } = this.props;
    return (
      <div>
        <label>{grade.description}</label>
        <input
          value={grade.grade}
          className={grade.grade >= 60 ? css.green : css.red}
          type="number"
          onChange={this.handleInputChange}
          min="0"
          max="100"
        ></input>
      </div>
    );
  }
}
