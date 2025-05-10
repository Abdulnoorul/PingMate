import React, { useEffect, useState } from 'react'
import { db, auth } from '../Firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import '../CSS/Chat.css'

function Chat() {

  const [user] = useAuthState(auth)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    const messageRef = collection(db, 'chats', 'room1', 'messages')
    await addDoc(messageRef, {
      sender: user.uid,
      message: newMessage.trim(),
      timestamp: serverTimestamp()
    });
    setNewMessage('')
  }

  //fetching the users
    useEffect(()=>{
      const fetchUsers =  ()=>{
          const userCollection = collection(db, "users")
        
          onSnapshot(userCollection, (snapshot)=>{
            const userList = snapshot.docs.map(doc=>doc.data())
            setUsers(userList)
            console.log(userList)
          })
      };
      fetchUsers();
    }, [])
  
  //fetching the messages
  useEffect(()=>{
    const msgRef = collection(db,'chats','room1','messages');
    const q = query(msgRef, orderBy('timestamp'))

    const unsubscribe = onSnapshot(q,(snapshot)=> {
      const msgs = snapshot.docs.map((doc)=>doc.data());
      setMessages(msgs)
    });
    return()=> unsubscribe();    
  },[])

  const logOut = () => {
    signOut(auth).then(() => {
      navigate("/")
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});
  }
  
  return (
    <>
      <div className="chmain">
        
        <div className="chead"><h1>Chatting Section</h1></div>

        <div className="chats">
          {messages.length === 0 ? (<p>No message available</p>) : (
            messages.map((msg, index) => {
              const sender = users.find((u) => u.uid.trim() === msg.sender.trim());
              const senderName = sender ? sender.name : 'Unknown'
              return (
                <div className="some" key={index} style={{textAlign:user.uid===msg.sender? 'right':'left'}}>
                  <strong>{senderName} : </strong>
                  {msg.message}
                </div>
              )
            })
          )}
        </div>

        <form action="" onSubmit={handleSendMessage} id='cform'>
          <input
            type="text"
            placeholder='Enter your message'
            value={newMessage}
            onChange={(event) => { setNewMessage(event.target.value) }}
            id='chbtn'
          />
          
          <button type='submit' id='cbtn'>Send</button>

        </form>
        <button onClick={logOut} id='chlbtn' >Logout</button>
      </div>
    </>
  )
}

export default Chat
