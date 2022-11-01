import './App.css';
import ControlGrid from './ControlGrid';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <ControlGrid rows={5} cols={6} />
      </header>
    </div>
  );
}

export default App;
