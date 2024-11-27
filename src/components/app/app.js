import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Jone Smith", salary: 800, increase: false, rise: true, id: 1 },
        {
          name: "Smite Vale",
          salary: 3000,
          increase: true,
          rise: false,
          id: 2,
        },
        {
          name: "Jone Smith",
          salary: 8000,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
    };
    this.maxId = 4;
  }

  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      increase: false,
      rise: false,
      id: this.maxId++,
    };
    this.setState(({ data }) => {
      return { data: [...data, newItem] };
    });
  };
  deleteItem = (id) => {
    this.setState(({ data }) => {
      return { data: data.filter((item) => item.id !== id) };
    });
  };

  onToggleProps = (id, props) => {
    this.setState(({ data }) => ({
      data: data.map((item) =>
        item.id === id ? { ...item, [props]: !item[props] } : item
      ),
    }));
  };

  calculateSummary() {
    const { data } = this.state;
    const totalEmployees = data.length;
    const totalSalary = data.reduce((sum, item) => sum + item.salary, 0);
    const increasedEmployees = this.state.data.filter(
      (item) => item.increase
    ).length;

    return { totalEmployees, totalSalary, increasedEmployees };
  }

  render() {
    const { totalEmployees, increasedEmployees } = this.calculateSummary();

    return (
      <div className="app">
        <AppInfo
          totalEmployees={totalEmployees}
          increasedEmployees={increasedEmployees}
        />

        <div className="search-panel">
          <SearchPanel />
          <AppFilter />
        </div>

        <EmployeesList
          data={this.state.data}
          onDelete={this.deleteItem}
          onToggleProps={this.onToggleProps}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
