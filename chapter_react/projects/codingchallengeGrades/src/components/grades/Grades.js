import React, { Component } from "react";
import Grade from "./Grade";
import css from "./grades.module.css";

export default class Grades extends Component {
  handleChangeGrade = (grade) => {
    this.props.onGradesChange(grade);
  };
  render() {
    const { grades } = this.props;
    return (
      <div className={css.container}>
        <h4>Notas Atuais</h4>
        <div className={css.gradesContainer}>
          {grades.map((grade) => {
            return (
              <Grade
                key={grade.id}
                onChangeGrade={this.handleChangeGrade}
                grade={grade}
              ></Grade>
            );
          })}
        </div>
      </div>
    );
  }
}
