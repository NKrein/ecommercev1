import React, {useState, useEffect} from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ItemList from '../../components/ItemList';
import Loader from '../../../commonComponents/Loader';
import { getFirestore } from '../../../../firebase';
import Home from '../../components/Home';


const HomeContainer = ({greetings}) => {

  const [loading, setLoading] = useState(false);
  const [arrayItems, setArrayItems] = useState([]);
  const [err, setErr] = useState(false);

  const { category } = useParams();

  useEffect(()=>{
    setLoading(true);
    const db = getFirestore();
    const itemCollection = category? db.collection('item').where('category', '==', `${category}`) : db.collection('item');

    itemCollection.get().then((querySnapshot) => {
      if (querySnapshot.size === 0){
        console.log('no results');
      } else {
        setArrayItems(querySnapshot.docs.map(doc =>[doc.id, doc.data()]));
      }
    })
    .catch(error => {
      console.log('error', error);
      setErr(true);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [category]);

  if (err) return <Navigate to='/error' />

  return(
    <Home greetings='Bienvenidos a Dharma Tienda!'/>
  )
}

export default HomeContainer;