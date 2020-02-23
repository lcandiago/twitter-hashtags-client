import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';

import App from './App';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

function buildTweet(overrides) {
  return {
    id: 1,
    text: 'TEST_TWEET_TEXT',
    user: {
      name: 'TEST_TWEET_USERNAME',
      screen_name: 'TEST_TWEET_SCREENNAME',
    },
    created_at: 'Sun Feb 23 08:54:09 +0000 2020',
    ...overrides,
  };
}

test('add hashtags, search tweets and render result', async () => {
  const id = 1231502493416329200;
  const full_text = 'Javascript is AWESOME!!! #javascript';
  const user = {
    name: 'Lorenzo Candiago',
    screen_name: 'lorenzocandiago',
  };
  const created_at = 'Sun Feb 23 08:54:09 +0000 2020';

  axios.get.mockResolvedValueOnce({
    data: [buildTweet({ id, full_text, user, created_at })],
  });

  const { getByText, getByLabelText } = render(<App />);

  const input = getByLabelText(/hashtag/i);
  const button = getByText(/add hashtag/i);

  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();

  const hashtag = 'javascript';

  fireEvent.change(input, {
    target: {
      value: hashtag,
    },
  });

  fireEvent.click(button);

  const hashtagItem = getByText(hashtag);
  expect(hashtagItem).toBeInTheDocument();

  const tweetMessage = await waitForElement(() => getByText(full_text));

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(tweetMessage).toBeInTheDocument();
});
