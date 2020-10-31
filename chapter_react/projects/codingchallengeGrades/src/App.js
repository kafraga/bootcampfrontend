import React, { Component } from "react";
import Calculations from "./components/calculations/Calculations";
import Grades from "./components/grades/Grades";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      grades: [
        {
          id: 1,
          description: "Módulo 01 - Fundamentos (0-100)",
          grade: 100,
        },
        {
          id: 2,
          description: "Módulo 02 - Angular (0-100)",
          grade: 100,
        },
        {
          id: 3,
          description: "Módulo 03 - React (0-100)",
          grade: 100,
        },
        {
          id: 4,
          description: "Módulo 04 - Vue (0-100)",
          grade: 100,
        },
        {
          id: 5,
          description: "Módulo 05 - Desafio Final (0-100)",
          grade: 100,
        },
      ],
    };
  }
  handleGradeChange = (grade) => {
    const { grades } = this.state;
    console.log(grade);
    for (let i = 0; i < grades.length; i++) {
      if (grades[i].id === grade.id) {
        grades[i].grade = grade.grade;
      }
    }
    this.setState({
      grades,
    });
  };

  render() {
    const { grades } = this.state;
    return (
      <div>
        <h3>Controle de Notas do Bootcamp IGTI com React</h3>
        <div className="gradesContainer">
          <Grades
            onGradesChange={this.handleGradeChange}
            grades={grades}
          ></Grades>

          <Calculations grades={grades}></Calculations>
        </div>
      </div>
    );
  }
}
