```tsx
import { WppBreadcrumb } from '@wppopen/components-library-react';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Home',
    path: '/'
  },

  {
    label: 'Alfa',
    path: '/alfa'
  },

  {
    label: 'Bravo (International Radiotelephony Spelling Alphabet)',
    path: '/alfa/bravo'
  },

  {
    label: 'Charlie',
    path: '/alfa/bravo/charlie'
  },

  {
    label: 'Delta (International Radiotelephony Spelling Alphabet)',
    path: '/alfa/bravo/charlie/delta'
  },

  {
    label: 'Echo',
    path: '/alfa/bravo/charlie/delta/echo'
  },

  {
    label: 'Foxtrot',
    path: '/alfa/bravo/charlie/delta/echo/foxtrot'
  }
];

export const BreadcrumbExample = () => {
  const navigate = useNavigate();

  const handleRouteChange = (event: CustomEvent) => {
    navigate(event.detail);
  };

  return (
    <WppBreadcrumb items={items} middleTruncation onWppChange={handleRouteChange} />
  );
};
```
