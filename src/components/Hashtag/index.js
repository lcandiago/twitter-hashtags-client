import React from 'react';

import './styles.css';

export default function Hashtag({ children, onClick }) {
  return (
    <li title="Click to remove" className="hashtag" onClick={onClick}>
      {`#${children}`}
    </li>
  );
}
