import React, { Component } from "react";
import css from "./calculations.module.css";

export default class Calculations extends Component {
  sumGrades = (grades) => {
    const sumOfGrades = grades.reduce((acc, curr) => {
      return acc + curr.grade;
    }, 0);

    return sumOfGrades;
  };
  percentualGrades = (grades) => {
    const sumOfGrades = this.sumGrades(grades);
    const maxGrade = 100 * grades.length;
    const percentualofGrades = (sumOfGrades / maxGrade) * 100;
    return percentualofGrades;
  };

  approvedByAverage = (grades) => {
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].grade < 60) {
        return "Não";
      }
    }
    return "Sim";
  };

  approvedByPercentual = (grades) => {
    if (this.percentualGrades(grades) >= 70) {
      return "Sim";
    }
    return "Não";
  };

  render() {
    const { grades } = this.props;
    const resultByAverage = this.approvedByAverage(grades);
    const resultByPercentual = this.approvedByPercentual(grades);
    return (
      <div class={css.container}>
        <h4>Cálculos</h4>
        <div className={css.calculationsContainer}>
          <p>
            Nota Total: <span>{this.sumGrades(grades)}</span>
          </p>
          <p>
            Percentual Total: <span>{this.percentualGrades(grades)}</span>
          </p>
          <p>
            Aprovação pela média (60%)?{" "}
            <span className={resultByAverage === "Sim" ? css.green : css.red}>
              {resultByAverage}
            </span>
          </p>
          <p>
            Aprovação pelo percentual total (70%)?{" "}
            <span
              className={resultByPercentual === "Sim" ? css.green : css.red}
            >
              {resultByPercentual}
            </span>
          </p>
        </div>
      </div>
    );
  }
}
