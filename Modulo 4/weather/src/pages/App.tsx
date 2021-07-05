import { useState, useEffect } from 'react';
import fetchCities from '../api';
import { CityEntity } from '../api/Entities/entityDefinition';
import CitySearch from '../molecules/CitySearch.component';
import '../Styles/Colors.styles.css';
function App() {
  const [cities, setCities] = useState<CityEntity[]>([]);
  useEffect(() => {
    fetchCities().then(response => setCities(response));
  }, []);
  return <CitySearch />;
}

export default App;
