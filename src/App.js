import React, {useEffect, useState} from 'react';
import sign from './assets/sign.gif'

function App() {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const appStyle = {
    backgroundColor: "#282c34",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "calc(8px + 1vmin)",
    color: "white",
    minHeight: "100vh",
    textAlign: "center",
    padding: "10px",
  };

  const h1Style = {
    fontSize: "1.5em",
    opacity: opacity,
    transition: 'opacity 1s ease-in-out',
    
    marginBottom: "10px",
  };

  const h3Style = {
    fontSize: "1em",
    opacity: opacity,
    transition: 'opacity 1s ease-in-out',
  };

  return (
    <div className="App" style={appStyle}>
      <h1 style={h1Style}>Do sign easily</h1>
      <h3 style={h3Style}>Try out your signature here</h3>
      <img src={sign} alt='sign'/>
    </div>
  );
}

export default App;