import classes from './MeetupItem.module.css'
import Card from '../ui/Card';
import { useContext } from 'react';
import FavoriteContext from '../../store/favorites-context';

function MeetupItem(props) {
    const favoritesCtx = useContext(FavoriteContext);

    const itemIsFavourite=favoritesCtx.isItemFavorite(props.id);

    function toggleFavoritesStateHandler() {
        if(itemIsFavourite){
            favoritesCtx.removeFavorite(props.id);
        }
        else{
            favoritesCtx.addFavorite({
                id:props.id,
                title:props.title,
                address:props.address,
                image:props.image,
                description:props.description
            })
        }
    }

    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title} loading='lazy' />
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                    <p>{props.description}</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={toggleFavoritesStateHandler}>{itemIsFavourite?'Remove from Favorite': 'To Favorites'}</button>
                </div>
            </Card>
        </li>

    );
}

export default MeetupItem;