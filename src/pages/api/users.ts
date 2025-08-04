// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Page } from 'src/types/Page';
import { User } from 'src/types/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page<User>[]>
) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token
    ? {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    : undefined;
  const { q, pageParam } = req.query;
  const response = await fetch(
    `${
      process.env.API_URL
    }/search/users?q=${q}&per_page=${20}&page=${pageParam}`,
    headers
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  res.status(200).json(data);
}
