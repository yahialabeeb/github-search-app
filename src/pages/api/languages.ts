import type { NextApiRequest, NextApiResponse } from 'next';
import { Page } from '@/types/Page';
import { Repo } from '@/types/Repo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page<Repo>[]>
) {
  const token = process.env.GITHUB_TOKEN;
  const { owner, repo } = req.query;

  const response = await fetch(
    `${process.env.API_URL}/repos/${owner}/${repo}/languages`,
    {
      headers: {
        Authorization: token ? `token ${token}` : '',
      },
    }
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  res.status(200).json(data);
}
