// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Page } from 'src/types/Page';
import { Repo } from 'src/types/Repo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Page<Repo>[]>
) {
  const token = process.env.GITHUB_TOKEN;
  const headers = token
    ? {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    : undefined;
  const { owner, repo } = req.query;
  const response = await fetch(
    `${process.env.API_URL}/repos/${owner}/${repo}/languages`,
    headers
  );
  if (!response.ok) throw new Error(response.statusText);

  const data = await response.json();
  res.status(200).json(data);
}
