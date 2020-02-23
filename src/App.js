import React, { useState, useRef } from 'react';
import querystring from 'querystring';
import axios from 'axios';

import Hashtag from './components/Hashtag';
import Tweet from './components/Tweet';

import './App.css';

function App() {
  const [hashtags, setHashtags] = useState([]);
  const [tweets, setTweets] = useState([]);

  const inputEl = useRef(null);

  async function getTweets(newHashtags) {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/tweets?${querystring.stringify({
        newHashtags,
      })}`
    );

    return data;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    e.persist();

    const newHashtags = [...hashtags, inputEl.current.value];

    setHashtags(newHashtags);

    inputEl.current.value = '';

    const fetchedTweets = await getTweets(newHashtags);
    setTweets(fetchedTweets);
  }

  return (
    <div className="container">
      <h1 className="logo">Twitter Hashtags</h1>

      <form className="hashtagForm" onSubmit={handleSubmit}>
        <label htmlFor="hashtag" className="hashtagForm__label">
          Hashtag
        </label>
        <input
          ref={inputEl}
          id="hashtag"
          type="text"
          placeholder="Which hashtag do you want to follow?"
          className="hashtagForm__input"
        />

        <button type="submit" className="hashtagForm__button">
          Add Hashtag
        </button>
      </form>

      {hashtags.length > 0 && (
        <ul>
          {hashtags.map(hashtag => (
            <Hashtag key={hashtag}>{hashtag}</Hashtag>
          ))}
        </ul>
      )}

      {tweets.length > 0 && (
        <ul>
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
