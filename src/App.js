import './App.css'
import Game from './pages/Game.js'
import {Provider as AppProvider} from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Game/>
      </div>
    </AppProvider>
  );
}

export default App;
