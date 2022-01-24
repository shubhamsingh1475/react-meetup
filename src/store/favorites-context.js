import { createContext, useState } from "react";

const FavoriteContext = createContext({
    favorites: [],
    totalFavorites: 0,
    addFavorite: (favoriteMeetup) => { },
    removeFavorite: (meetupId) => { },
    isItemFavorite: (meetupId) => { },
    getFavories: () => { }
});


export function FavoritesContextProvider(props) {
    const [userFavorites, setUserFavorites] = useState([])


    function addFavoriteHandler(favoriteMeetup) {
        setUserFavorites((prevUserFavorite) => {
            return prevUserFavorite.concat(favoriteMeetup);
        })
        
        fetch('https://react-getting-started-default-rtdb.firebaseio.com/favorites.json', {
            method: 'POST',
            body: JSON.stringify(favoriteMeetup),
            headers: {
                'Content-type': 'application/json'
            }
        }
        ).then(response => {
            return response.json();
        }).then(data => {
            getFavorites();
        })
    }

    function getFavorites() {
        fetch('https://react-getting-started-default-rtdb.firebaseio.com/favorites.json')
            .then(response => {
                return response.json();
            }).then(data => {
                const meetups = [];

                for (const key in data) {
                    const meetup = {
                        id: key,
                        ...data[key]
                    }
                    meetups.push(meetup);
                }

                setUserFavorites(meetups);
            });
    }

    function removeFavoriteHandler(meetupId) {
        setUserFavorites((prevUserFavorite) => {
            return prevUserFavorite.filter(meetup => meetup.id !== meetupId);
        })
    }

    function ItemIsFavorite(meetupId) {
        return userFavorites.some(meetup => meetup.id === meetupId);
    }

    const context = {
        favorites: userFavorites,
        totalFavorites: userFavorites.length,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        isItemFavorite: ItemIsFavorite,
        getFavories: getFavorites
    };

    return <FavoriteContext.Provider value={context}>
        {props.children}
    </FavoriteContext.Provider>
}

export default FavoriteContext;