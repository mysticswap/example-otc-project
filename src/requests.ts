import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

export async function getNewTokenData(user: string) {
  const url = `${process.env.MYSTIC_API_URL}/otc/points-traded?user=${user}`;
  const request = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.MYSTIC_CLIENT_KEY}`,
    },
  });

  return request.data;
}
