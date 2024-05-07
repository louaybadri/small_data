import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import StreamChart from './components/chart_stream';
import BatchChart from './components/chart_batch';
import MapBatchChart from './components/map_batch';
import MapStreamChart from './components/map_stream';
import "./navbar.css";
function App() {
  const [batchOrSteam, setBatchOrSteam] = useState("StreamMap")

  return (
    <div className="App">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

      <div style={{ height: "50px", display: "flex", alignItems: "center", justifyItems: "center" }}>
        <Nav className="mr-auto flex column align-items-center w-100" style={{ justifyContent: "space-evenly" }}>
          <div className={"navbarItem " + (batchOrSteam === "StreamChart" ? "active" : "")} onClick={() => { setBatchOrSteam("StreamChart") }} >StreamChart</div>
          <div className={"navbarItem " + (batchOrSteam === "StreamMap" ? "active" : "")} onClick={() => { setBatchOrSteam("StreamMap") }} >StreamMap</div>
          <div className={"navbarItem " + (batchOrSteam === "BatchChart" ? "active" : "")} onClick={() => { setBatchOrSteam("BatchChart") }} >BatchChart</div>
          <div className={"navbarItem " + (batchOrSteam === "BatchMap" ? "active" : "")} onClick={() => { setBatchOrSteam("BatchMap") }}>BatchMap</div>
        </Nav>

      </div>
      {batchOrSteam === "StreamChart" && <StreamChart />}
      {batchOrSteam === "StreamMap" && <MapStreamChart />}
      {batchOrSteam === "BatchChart" && <BatchChart />}
      {batchOrSteam === "BatchMap" && <MapBatchChart />}
    </div>
  );
}

export default App;
