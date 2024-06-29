import data from "./data/category-relation.json";
import categories from "./data/id-to-name-map.json";
import DropdownCheckbox from "./components/DropdownCheckbox";
import "./App.css";

function App() {
  return (
    <div className="App">
      <DropdownCheckbox data={data.relationships} categories={categories} />
    </div>
  );
}

export default App;
