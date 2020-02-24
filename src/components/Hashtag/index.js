import React from 'react';

import './styles.css';

export default function Hashtag({ children }) {
  return <li className="hashtag">{`#${children}`}</li>;
}
