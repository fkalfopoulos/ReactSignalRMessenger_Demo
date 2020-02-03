import { useState } from 'react';

const MyComponent = () => {
  const [ avatar, setAvatar ] = useState('anonymous.png');
  return (
    <img
      alt="Avatar"
      onClick={() => {
        const newAvatar = prompt("Enter your avatar URL:");
        setAvatar(newAvatar);
      }}
      src={avatar}
    />
  );
};