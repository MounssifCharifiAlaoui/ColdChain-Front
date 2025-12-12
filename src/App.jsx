import Routes from "./Routes"
import { DataProvider } from "./context/DataProvider"
import './App.css'

function App() {
  
  return (
    <div className="App">
    <DataProvider>
      <Routes />
    </DataProvider>
    </div>
  )
}

export default App
