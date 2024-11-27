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
        { name: "Joy Smith", salary: 800, increase: false, rise: true, id: 1 },
        {
          name: "Andri Vale",
          salary: 3000,
          increase: true,
          rise: false,
          id: 2,
        },
        {
          name: "Jone Black",
          salary: 8000,
          increase: false,
          rise: false,
          id: 3,
        },
      ],
      term: "",
      filter: "all",
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

  // onToggleProps = (id, props) => {
  //   this.setState(({ data }) => ({
  //     data: data.map((item) =>
  //       item.id === id ? { ...item, [props]: !item[props] } : item
  //     ),
  //   }));
  // };
  onToggleProps = (id, prop, value) => {
    this.setState(({ data }) => ({
      data: data.map((item) =>
        item.id === id
          ? prop === "salary" // Если изменяется зарплата, обновляем значение
            ? { ...item, salary: value }
            : { ...item, [prop]: !item[prop] }
          : item
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

  searchEmp = (items, term) => {
    if (items.length === 0) return items;

    return items.filter((item) => {
      return item.name.indexOf(term) > -1;
    });
  };

  onUpdateSearch = (term) => {
    this.setState({ term });
  };

  filterPost = (items, filter) => {
    switch (filter) {
      case "rise":
        return items.filter((item) => item.rise);
      case "high-salary":
        return items.filter((item) => item.salary > 1000);
      default:
        return items;
    }
  };

  onFilterSelect = (item) => {
    this.setState({ filter: item });
  };

  render() {
    const { data, term, filter } = this.state;
    const { totalEmployees, increasedEmployees } = this.calculateSummary();
    const visibleData = this.filterPost(this.searchEmp(data, term), filter);

    return (
      <div className="app">
        <AppInfo
          totalEmployees={totalEmployees}
          increasedEmployees={increasedEmployees}
        />

        <div className="search-panel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>

        <EmployeesList
          data={visibleData}
          onDelete={this.deleteItem}
          onToggleProps={this.onToggleProps}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
