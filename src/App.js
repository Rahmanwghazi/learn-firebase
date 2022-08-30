import { useEffect, useState } from 'react';
import { db } from './firebase';
import { addDoc, collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const userRef = collection(db, 'users');

  useEffect(() => {
    const getUser = async () => {
      const data = await getDocs(userRef);
      setUser(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }
    getUser();
  }, [userRef]);

  const addUser = async () => {
    await addDoc(userRef, { name: newName, age: Number(newAge) });
  }

  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newAge = { age: age + 1 };
    await updateDoc(userDoc, newAge);
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  }

  console.log(user);

  return (
    <div className="App">
      <input placeholder='name' onChange={e => { setNewName(e.target.value) }}></input>
      <input placeholder='age' onChange={e => { setNewAge(e.target.value) }}></input>
      <button onClick={addUser}>Add</button>
      {
        user.map(user => (
          <>
            {/* <p>{user.id}</p> */}
            <h1>{user.name}</h1>
            <h2>{user.age}</h2>
            <button onClick={() => { increaseAge(user.id, user.age) }}>increase</button>
            <button onClick={() => { deleteUser(user.id) }}>Delete</button>
          </>
        ))
      }
    </div>
  );
}

export default App;
