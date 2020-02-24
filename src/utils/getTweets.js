import querystring from 'querystring';
import axios from 'axios';

export default async function getTweets(newHashtags) {
  if (newHashtags.length > 0) {
    const { data } = await axios
      .get(
        `${process.env.REACT_APP_API_URL}/tweets?${querystring.stringify({
          hashtags: newHashtags,
        })}`
      )
      .catch(err => {
        throw err.response.data.error;
      });

    return data;
  }

  return [];
}
