import { QueryClientProvider, QueryClient } from 'react-query';
import CitySearch from '../molecules/CitySearch.component';
import '../Styles/Colors.styles.css';
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <CitySearch />
    </QueryClientProvider>
  );
}

export default App;
// const [cities, setCities] = useState<CityEntity[]>([]);
// useEffect(() => {
//   fetchCities().then(response => setCities(response));
// }, []);
