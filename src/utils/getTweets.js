import querystring from 'querystring';
import axios from 'axios';

export default async function getTweets(newHashtags) {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/tweets?${querystring.stringify({
      hashtags: newHashtags,
    })}`
  );

  return data;
}
