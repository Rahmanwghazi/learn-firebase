import { useState, useEffect } from 'react';
import { db } from './firebase';
import { addDoc, collection,query, orderBy, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
function App() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const userRef = collection(db, 'users');

  useEffect(() => {
    const q = query(userRef, orderBy('name'));
    onSnapshot(q, (querySnapshot) => {
      setUser(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])

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

  return (
    <div className="App">
      <input placeholder='name' onChange={e => { setNewName(e.target.value) }}></input>
      <input placeholder='age' onChange={e => { setNewAge(e.target.value) }}></input>
      <button onClick={addUser}>Add</button>
      {
        user.map(user => (
          <>
            {/* <p>{user.id}</p> */}
            <h1>{user.data.name}</h1>
            <h2>{user.data.age}</h2>
            <button onClick={() => { increaseAge(user.id, user.data.age) }}>increase</button>
            <button onClick={() => { deleteUser(user.id) }}>Delete</button>
          </>
        ))
      }
    </div>
  );
}

export default App;
