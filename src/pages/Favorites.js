import { useContext } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import FavoriteContext from '../store/favorites-context';

function FavoritesPage() {
  
  const favoritesCtx = useContext(FavoriteContext);

  let contents;

  if(favoritesCtx.totalFavorites===0){
    contents=<p>You got no favorites yet. Start adding some?</p>
  }
  else{
    contents= <MeetupList meetups={favoritesCtx.favorites}/>;
  }

  return (
    <section>
      <h1>My Favorites</h1>
      {contents}
    </section>
  );
}

export default FavoritesPage;