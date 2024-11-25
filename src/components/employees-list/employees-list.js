import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

const EmployeesList = ({ data, onDelete }) => {
  const elements = data.map((item) => {
    const { id, ...itemProps } = item;
    return (
      <EmployeesListItem
        key={id}
        {...itemProps}
        onDelete={() => onDelete(id)}
      />
      //    {...itemProps}  то же , что и    key={item.name} name={item.name} salary={item.salary}
    );
  });

  return <ul className="app-list list-group">{elements}</ul>;
};

export default EmployeesList;
