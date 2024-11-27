import "./app-filter.css";

const AppFilter = (props) => {
  const buttonsData = [
    { label: "Все сотрудники", value: "all" },
    { label: "На повышение", value: "rise" },
    { label: "З/П больше 1000$", value: "high-salary" },
  ];

  const buttons = buttonsData.map(({ value, label }) => {
    const active = props.filter === value;

    return (
      <button
        type="button"
        key={value}
        className={`btn  ${active ? "btn-light" : "btn-outline-light"}`}
        onClick={() => props.onFilterSelect(value)}
      >
        {label}
      </button>
    );
  });

  return <div className="btn-group">{buttons}</div>;
};

export default AppFilter;
