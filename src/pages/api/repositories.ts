import type { NextApiRequest, NextApiResponse } from 'next';
import { Page } from '@/types/Page';
import { Repo } from '@/types/Repo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page<Repo>[]>
) {
  const token = process.env.GITHUB_TOKEN;
  const { q, page } = req.query;
  console.log(123, page);
  const response = await fetch(
    `${
      process.env.API_URL
    }/search/repositories?q=${q}&per_page=${20}&page=${page}`,
    {
      headers: {
        Authorization: `token ${token}`,
      },
    }
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  res.status(200).json(data);
}
