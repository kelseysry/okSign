import { useState } from "react";


function MessageForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
    const [phoneType, setPhoneType] = useState('');

  return (
    <div>
      <h2>Contact Us</h2>
      <form>

      <div>
  <label htmlFor='phone'>Phone:</label>
  <input
    id='phone'
    name='phone'
    type='text'
    onChange={e => setPhone(e.target.value)}
    value={phone}
  />
  <select
    name='phoneType'
    onChange={e => setPhoneType(e.target.value)}
    value={phoneType}
  >
    <option value='' disabled>Select a phone type...</option>
    <option>Home</option>
    <option>Work</option>
    <option>Mobile</option>
  </select>
</div>


        <div>
          <label htmlFor='name'>Name:</label>
          <input id='name' type='text' value={name} />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input id='email' type='text' value={email} />
        </div>
        <div>
          <label htmlFor='phone'>Phone:</label>
          <input id='phone' type='text' value={phone} />
        </div>
        <div>
        <label htmlFor='comments'>Comments:</label>
        <textarea
          id='comments'
          name='comments'
          onChange={(e) => setComments(e.target.value)}
          value={comments}
  />
</div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default MessageForm;
