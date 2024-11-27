import { Component } from "react";

import "./employees-add-form.css";

class EmployeesAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", salary: "" };
  }
  onValueChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, salary } = this.state;

    if (name.trim() === "" || salary.trim() === "") {
      this.setState({ error: "Пожалуйста, заполните все поля!" });
      return;
    }

    this.props.onAdd(name, salary);
    this.setState({
      name: "",
      salary: "",
      error: "",
    });
  };

  render() {
    const { name, salary, error } = this.state;

    return (
      <div className="app-add-form">
        <h3>Добавьте нового сотрудника</h3>
        <form className="add-form d-flex">
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Как его зовут?"
            name="name"
            value={name}
            onChange={this.onValueChange}
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="З/П в $?"
            name="salary"
            value={salary}
            onChange={this.onValueChange}
          />
          <button
            type="submit"
            className="btn btn-outline-light"
            onClick={this.onSubmit}
          >
            Добавить
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    );
  }
}

export default EmployeesAddForm;
