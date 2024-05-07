import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import StreamChart from './components/chart_stream';
import BatchChart from './components/chart_batch';
import MapChart from './components/map';
function App() {
  const [batchOrSteam, setBatchOrSteam] = useState("BatchChart")

  return (
    <div className="App">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

      <div style={{ height: "50px", display: "flex", alignItems: "center", justifyItems: "center" }}>
        <Nav className="mr-auto flex column align-items-center w-100" style={{ justifyContent: "space-evenly" }}>
          <div onClick={() => { setBatchOrSteam("StreamChart") }} >StreamChart</div>
          <div onClick={() => { setBatchOrSteam("StreamMap") }} >StreamMap</div>
          <div onClick={() => { setBatchOrSteam("BatchChart") }} >BatchChart</div>
          <div onClick={() => { setBatchOrSteam("BatchMap") }}>BatchMap</div>
        </Nav>

      </div>
      {batchOrSteam === "StreamChart" && <StreamChart />}
      {batchOrSteam === "StreamMap" && <StreamChart />}
      {batchOrSteam === "BatchChart" && <BatchChart />}
      {batchOrSteam === "BatchMap" && <MapChart />}
    </div>
  );
}

export default App;
