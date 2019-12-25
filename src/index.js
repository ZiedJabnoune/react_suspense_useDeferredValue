import React, { Suspense, useState, useDeferredValue } from "react";
import ReactDOM from "react-dom";

import { Spinner, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";
import createResource from "./RandomNum";

const Num = ({ resource }) => {
  const num = resource.num.read();
  return <div>{num}</div>;
};

const init = createResource();

function App() {
  const [resource, setResource] = useState(init);
  const deferredResource = useDeferredValue(resource, { timeoutMs: 2500 });
  const isStale = deferredResource !== resource;

  const [resource2, setResource2] = useState(init);

  const refresh = () => {
    setResource(createResource());
  };

  const refresh2 = () => {
    setResource2(createResource());
  };

  return (
    <div className="App">
      <div id="test" style={{ border: "1px solid", margin: "10px" }}>
        <Suspense fallback={<Spinner animation="border" />}>
          <div style={{ color: isStale ? "pink" : "black" }}>
            <Num resource={deferredResource} />
          </div>
        </Suspense>
        <div>
          <Button style={{ margin: "10px" }} onClick={refresh}>
            Refresh (useDeferredValue)
          </Button>
        </div>
      </div>
      <div style={{ border: "1px solid", margin: "10px" }}>
        <Suspense fallback={<Spinner animation="grow" />}>
          <div>
            <Num resource={resource2} />
          </div>
        </Suspense>
        <div>
          <Button style={{ margin: "10px" }} onClick={refresh2}>
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
