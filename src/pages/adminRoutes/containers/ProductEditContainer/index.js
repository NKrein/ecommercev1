import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Navigate, useParams } from 'react-router-dom';
import ProductEdit from '../../components/ProductEdit';
import Loader from '../../../commonComponents/Loader';
import { getFirestore, getStorage } from '../../../../firebase';
import { Alert } from 'react-bootstrap';


const ProductEditContainer = () => {

  const { currentUser } = useContext(AuthContext);
  const { productId } = useParams();

  const [product, setProduct] = useState();
  const [dataLoaded, setDataLoaded] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [img, setImg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  useEffect(() => {

    const db = getFirestore();
    const itemCollection = db.collection('item');
    const item = itemCollection.doc(productId)

    setLoading(true);

    item.get().then((doc) => {
      if (doc.data()) {
        setProduct({ id: doc.id, ...doc.data() });
      } else {
        setError('No hay coincidencia con el id');
      }
    })
      .catch(error => {
        console.log('error al traer item', error);
        setError('Error al traer item');
      })
      .finally(() => {
        setLoading(false);
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId])


  useEffect(() => {

    const item = getFirestore().collection('item').doc(productId)

    if (img && dataLoaded) {
      setLoading(true);
      //Get existing img ref 
      const urlRef = getStorage().refFromURL(`${product.img}`);
      const deleteImg = urlRef.delete();
      
      //Delete existing img
      deleteImg.then(() => {
        setSuccess('Imagen anterior eliminada')
      }).catch((err)=>{
        setError('Error al eliminar imagen anterior');
        console.log('Error ->', err);
      });

      //Get new img ref 
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
            item.update({ img: url })
              .then(() => { setSuccess('Imagen cargada correctamente.') })
              .catch(() => { setError('Error al cargar Imagen') })
              .finally(() => { setLoading(false) });
          });
      })
    }

    if (dataLoaded) {
      setLoading(true);
      dataLoaded.name && item.update({ name: dataLoaded.name })
        .then(() => { setSuccess('Actualizado') })
        .catch(() => { setError('Error al acualizar Nombre') })
        .finally(() => { setLoading(false) });
      setLoading(true);
      dataLoaded.category && item.update({ category: dataLoaded.category })
        .then(() => { setSuccess('Actualizada') })
        .catch(() => { setError('Error al acualizar Categoría') })
        .finally(() => { setLoading(false) });
      setLoading(true);
      dataLoaded.stock && item.update({ stock: dataLoaded.stock })
        .then(() => { setSuccess('Actualizado') })
        .catch(() => { setError('Error al acualizar Stock') })
        .finally(() => { setLoading(false) });
      setLoading(true);
      dataLoaded.price && item.update({ price: dataLoaded.price })
        .then(() => { setSuccess('Actualizado') })
        .catch(() => { setError('Error al acualizar Precio') })
        .finally(() => { setLoading(false) });
      setLoading(true);
      dataLoaded.description && item.update({ description: dataLoaded.description })
        .then(() => { setSuccess('Actualizada') })
        .catch(() => { setError('Error al acualizar Descripción') })
        .finally(() => { setLoading(false) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataLoaded])

  if (currentUser) {
    return (
      <>
        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant='success' onClose={() => setSuccess('')} dismissible>{success}</Alert>}
        {
          !loading ? <ProductEdit
            setDataLoaded={setDataLoaded}
            img={img}
            uploadProgress={uploadProgress}
            setImg={setImg}
            product={product}
            requiredField={false} />
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

export default ProductEditContainer;