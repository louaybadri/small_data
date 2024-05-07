import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { useState } from 'react';
import StreamChart from './components/chart_stream';
import MapChart from './components/map';
function App() {
  const [batchOrSteam, setBatchOrSteam] = useState("Batch")

  return (
    <div className="App">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>

      <div style={{ height: "50px", display: "flex", alignItems: "center", justifyItems: "center" }}>
        <Nav className="mr-auto" >
          <Nav.Link href="#home" onClick={
            () => {
              setBatchOrSteam("Batch")
            }
          } >Batch</Nav.Link>
          <Nav.Link href="#link"
            onClick={
              () => {
                setBatchOrSteam("Stream")
              }
            }
          >Steam</Nav.Link>
        </Nav>

      </div>
      {/* {batchOrSteam === "Stream" && <StreamChart />}
      {batchOrSteam === "Batch" && <BatchChart />} */}
      <MapChart />
    </div>
  );
}

export default App;
