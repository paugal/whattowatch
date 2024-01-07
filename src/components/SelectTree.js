import '../style/App.css';
import SearchBar from './SearchBar';

function SelectTree() {

  return (
    <div className="contentContainer" id='home'>
        <h1>What To Watch</h1>

        <SearchBar/>
        <SearchBar/>
        <SearchBar/>

        <div className='botonesStart'>
        <button>Buscar</button>
        <button>Resetear</button>
        </div>
    
    </div>
  );
}

export default SelectTree;
