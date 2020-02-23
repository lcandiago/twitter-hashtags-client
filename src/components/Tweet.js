import React from 'react';

export default function Tweet({ tweet }) {
  return <li>{tweet.full_text}</li>;
}
