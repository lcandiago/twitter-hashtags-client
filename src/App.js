import React, { useState, useRef, useEffect } from 'react';

import getTweets from './utils/getTweets';

import Hashtag from './components/Hashtag';
import Tweet from './components/Tweet';

import './App.css';

function App() {
  const [hashtags, setHashtags] = useState([]);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const inputEl = useRef(null);

  useEffect(() => {
    inputEl.current.focus();

    const localHashtags = localStorage.getItem('hashtags');

    async function setInitialData() {
      const parsedHashtags = JSON.parse(localHashtags);

      setHashtags(parsedHashtags);

      try {
        const fetchedTweets = await getTweets(parsedHashtags);
        setTweets(fetchedTweets);
      } catch (err) {
        setError(err);
      }
    }

    if (localHashtags) {
      setInitialData();
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    e.persist();

    const { value } = inputEl.current;

    if (value.length === 0) {
      setError('You have to type some hashtag!');
      return;
    }

    if (hashtags.includes(value)) {
      setError('Duplicated hashtag!');
      return;
    }

    setError('');

    const newHashtag = value.startsWith('#') ? value.split('#')[1] : value;

    const newHashtags = [...hashtags, newHashtag];

    setHashtags(newHashtags);

    localStorage.setItem('hashtags', JSON.stringify(newHashtags));

    inputEl.current.value = '';
    inputEl.current.focus();

    try {
      const fetchedTweets = await getTweets(newHashtags);
      setTweets(fetchedTweets);
    } catch (err) {
      setError(err);
    }
  }

  async function removeHashtag(hashtag) {
    const newHashtags = hashtags.filter(h => h !== hashtag);

    setHashtags(newHashtags);

    localStorage.setItem('hashtags', JSON.stringify(newHashtags));

    try {
      const fetchedTweets = await getTweets(newHashtags);
      setTweets(fetchedTweets);
    } catch (err) {
      setError(err);
    }
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

      {error.length > 0 && (
        <div className="error">
          <span className="error__message">{error}</span>
        </div>
      )}

      {hashtags.length > 0 && (
        <ul className="hashtagList">
          {hashtags.map(hashtag => (
            <Hashtag key={hashtag} onClick={() => removeHashtag(hashtag)}>
              {hashtag}
            </Hashtag>
          ))}
        </ul>
      )}

      {tweets.length > 0 && (
        <ul className="tweetList">
          {tweets.map(tweet => (
            <Tweet key={tweet.id} tweet={tweet} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
