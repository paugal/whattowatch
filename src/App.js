import './style/App.css';
import SelectTree from './components/SelectTree';
import Recomendations from './components/Recomendations'

function App() {

  return (
    <div className="App">
      <div className="centeredDiv">
        <SelectTree/>
        <Recomendations/>
      </div>
    </div>
  );
}
export default App;
