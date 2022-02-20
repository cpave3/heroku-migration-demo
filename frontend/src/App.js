import * as React from 'react';

function App() {

  const [vegetables, setVegetables] = React.useState([]);

  // call the API once when the page loads
  React.useEffect(() => {
    const getVegetables = async () => {
      const data = await fetch(`${window.location.origin}/api/vegetables`).then(response => response.json());
      setVegetables(data.vegetables);
    }
    getVegetables();
  }, []);

  return <div>
    { vegetables.length > 0 ? (<ul>
      {vegetables.map(vegetable => <li style={{ paddingBottom: 12 }}>
        name: {vegetable.name} <br />
        color: {vegetable.color}
      </li>)}
    </ul>) : 'loading...'}
  </div>;
}

export default App;
