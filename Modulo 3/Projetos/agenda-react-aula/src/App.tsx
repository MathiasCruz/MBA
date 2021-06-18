import { GetCalendars } from './Backend/backend';

function App() {
  GetCalendars().then(resp => {
    for (const event of resp) {
      console.log(event);
    }
  });
  return <p>ola</p>;
}

export default App;
