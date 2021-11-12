import React, {useState} from 'react';
import Today from './pages/Today';
import Stock from './pages/Stock';
import User from './pages/User';
import Header from './components/Header';

import './App.css';

function App() {
	const [page, setPage] = useState('today');

	return <div className="App">
		<Header page={page} setPage={setPage} />
		<main>
			{page === 'today' && <Today />}
			{page === 'stock' && <Stock />}
		</main>
	</div>
}

export default App;
