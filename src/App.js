import { Route, Routes } from 'react-router-dom'
import { useContext ,useEffect} from 'react';
import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupPage from './pages/NewMeetup';
import FavoritesPage from './pages/Favorites';
import Layout from './components/layout/Layout';
import FavoriteContext from './store/favorites-context';


function App() {

  const favoritesCtx = useContext(FavoriteContext);

  useEffect(() => {
    favoritesCtx.getFavories();
  },[])
  
  return (

    <Layout>
      <Routes>
        <Route exact path="/" element={<AllMeetupsPage />} />
        <Route exact path="/new-meetup" element={<NewMeetupPage />} />
        <Route exact path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Layout>

  );
}

export default App;