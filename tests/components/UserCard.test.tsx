import { render, screen } from '@testing-library/react';
import UserCard from '@/components/UserCard'; // Adjust the path as needed
import { User } from '@/types/User';
import { Page } from '@/types/Page';

const mockPage: Page<User> = {
  items: [
    {
      id: 1,
      login: 'yahia',
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      html_url: 'https://github.com/yahia',
    },
    {
      id: 2,
      login: 'labeeb',
      avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
      html_url: 'https://github.com/labeeb',
    },
  ],
};

describe('UserCard', () => {
  it('renders user cards with avatar and username link', () => {
    render(<UserCard page={mockPage} />);

    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByText('yahia')).toBeInTheDocument();
    expect(screen.getByText('labeeb')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'yahia' })).toHaveAttribute(
      'href',
      'https://github.com/yahia'
    );

    expect(screen.getByRole('link', { name: 'labeeb' })).toHaveAttribute(
      'href',
      'https://github.com/labeeb'
    );
  });
});
