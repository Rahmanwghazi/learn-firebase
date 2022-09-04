import { useState, useEffect } from 'react';
import { db } from './firebase';
import { addDoc, collection, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import'./App.css';

function App() {
  const [user, setUser] = useState([]);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  const userRef = collection(db, 'users');

  useEffect(() => {
    onSnapshot(userRef, (querySnapshot) => {
      setUser(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const addUser = async () => {
    await addDoc(userRef, { name: newName, age: Number(newAge), isHighlighted: false });
  }

  const increaseAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newAge = { age: age + 1 };
    await updateDoc(userDoc, newAge);
  }

  const toggleHighlight = async (id, isHighlighted) => {
    const userDoc = doc(db, "users", id);
    const status = { isHighlighted: !isHighlighted };
    await updateDoc(userDoc, status);
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
      <table>
        <th> Name </th>
        <th> Age </th>
        <th>Action</th>
        {
          user.map(user => (
            <tr>
              {
                console.log(user.data)
              }
              <td className={user.data.isHighlighted ? 'highlight' : null}>{user.data.name}</td>
              <td>{user.data.age}</td>
              <button onClick={() => { increaseAge(user.id, user.data.age) }}>Increase Age</button>
              <button onClick={() => { deleteUser(user.id) }}>Delete</button>
              <button onClick={() => { toggleHighlight(user.id, user.data.isHighlighted) }}>Highlight</button>
            </tr>
            // <h1>{user.data.name}</h1>
            // <h2>{user.data.age}</h2>
            // <button onClick={() => { increaseAge(user.id, user.data.age) }}>increase</button>
            // <button onClick={() => { deleteUser(user.id) }}>Delete</button>
            // </>
          ))
        }
      </table>
    </div>
  );
}

export default App;
