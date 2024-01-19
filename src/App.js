import { useLocalStorage } from './hooks/useLocalStorage/useLocalStorage.ts';
import './App.css';

function App() {
  const [count, setCount] = useLocalStorage('count', 0)

  return (
    <div className="App">
      <h1>{count}</h1>
      <div className="wrapper">
        <button onClick={() => setCount(prev => prev + 1)}>
          +
        </button>
        <button onClick={() => setCount(prev => prev - 1)}>
          -
        </button>
      </div>
    </div>
  );
}

export default App;
