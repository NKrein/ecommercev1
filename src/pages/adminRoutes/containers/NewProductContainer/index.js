import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProductEdit from '../../components/ProductEdit';
import Loader from '../../../commonComponents/Loader';
import { getFirestore, getStorage } from '../../../../firebase';
import { Alert } from 'react-bootstrap';


const NewProductContainer = () => {

  const { currentUser } = useContext(AuthContext);

  const [productInfo, setProductInfo] = useState();
  const [dataLoaded, setDataLoaded] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [img, setImg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {
    if (img&&dataLoaded) {
      const storageRef = getStorage().ref(`products/${img.name}`);
      const task = storageRef.put(img);
      //Add file in Storage
      task.on('state_chaged', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, err => {
        setError('Error al cargar imagen.');
        console.log('Error ->', err);
      }, () => {
        //Get url
        setError('');
        getStorage()
          .ref('products')
          .child(img.name)
          .getDownloadURL()
          .then(url => {
            //Add url into product info
            setProductInfo({...dataLoaded, img: url});
            setSuccess('Imagen cargada correctamente.');
          });
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded])

  useEffect(() => {
    //if product info, add new item
    if (productInfo) {
      setLoading(true);
      const db = getFirestore();
      const itemCollection = db.collection('item');
      itemCollection.add(productInfo)
      .then(item => { 
        setError('');
        setSuccess(`Producto guardado con id ${item.id}`);
      }).catch(err => {
        setError('Error al agregar producto');
        console.log('Error ->', err);
      }).finally(() => { 
        setLoading(false)
        setTimeout(() => { setSuccess('') }, 3000);
        setProductInfo('');
      })  
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productInfo])


  if (currentUser) {
    return (
      <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {
          !loading? <ProductEdit 
                      setDataLoaded={setDataLoaded} 
                      img={img} 
                      uploadProgress={uploadProgress}
                      setImg={setImg} /> 
                    : <Loader />
        }
        
      </>
    )
  } else {
    return (
      <Navigate to='/admin' />
    )
  }

}

export default NewProductContainer;