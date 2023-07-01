import Auth from '@/components/Auth';
import { db, auth, storage } from '@/config/firebase';
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';

export default function Home() {
  const [movieList, setMovieList] = useState<any[]>([]);
  const moviesCollectionRef = collection(db, 'movies');
  const [newMovieTitle, setNewMovieTitle] = useState<string>('');
  const [newReleaseDate, setNewReleaseDate] = useState<number>(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>('');
  const [fileUpload, setFileUpload] = useState<any>(null);

  const getMovieList = async () => {
    try {
      const data = await getDocs(collection(db, 'movies'));
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setMovieList(filteredData);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth.currentUser?.uid
      });
      getMovieList();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteMovie = async (deleteId: any) => {
    const movieDoc = doc(db, 'movies', deleteId);
    await deleteDoc(movieDoc);
    await getMovieList();
  };

  const updateMovie = async (updateId: any) => {
    const movieDoc = doc(db, 'movies', updateId);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
      await setFileUpload(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="text-center">
      <Auth />
      <div>
        <input
          placeholder="Movie title..."
          required
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          required
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <label>Received an Oscar</label>
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie, index) => (
          <div key={index}>
            <h1 style={{ color: movie.receivedAnOscar ? 'green' : 'red' }}>{movie.title}</h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            <input placeholder="new title..." onChange={(e) => setUpdatedTitle(e.target.value)} />
            <button onClick={() => updateMovie(movie.id)}>Update Title</button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" accept="image/*" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}
