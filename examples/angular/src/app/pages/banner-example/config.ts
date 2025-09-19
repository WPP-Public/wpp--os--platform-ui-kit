export const breadcrumb_items = [
  {
    label: 'First Level (eg client)',
    path: '/first_level',
  },

  {
    label: 'Second Level (eg market)',
    path: '/second_level',
  },

  {
    label: 'Third Level (eg brand)',
    path: '/third_level',
  },

  {
    label: 'Application Name',
    path: '/fourth_level',
  },
]

export const topbar_items = [
  {
    label: 'Market overview',
    value: 'marketOverview',
    path: '/market-overview',
  },
  {
    label: 'Data management',
    value: 'dataManagement',
    path: '/data-management',
  },
  {
    label: 'Consumer intelligence',
    value: 'consumerIntelligence',
    path: '/consumer-intelligence',
  },
  {
    label: 'Audience studio',
    value: 'audienceStudio',
    path: '/audience-studio',
  },
  {
    label: 'Activation wizard',
    value: 'activationWizard',
    children: [
      {
        label: 'Bishop',
        value: 'bishop',
        path: '/bishop',
      },
      {
        label: 'Mystic Muse',
        value: 'mysticMuse',
        path: '/mystic-muse',
      },
    ],
  },
  {
    label: 'Reporting',
    value: 'reporting',
    path: '/reporting',
  },
]

const description =
  'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt exercitationem iste, voluptatum, quia\n' +
  'explicabo laboriosam rem adipisci voluptates cumque, veritatis atque nostrum corrupti ipsa asperiores\n' +
  'harum? Dicta odio aut hic.'

export const cards = [
  {
    title: 'Design',
    description,
    src: 'https://images.unsplash.com/photo-1658863025658-4a259cc68fc9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1925&q=80',
  },
  {
    title: 'Devices',
    description,
    src: 'https://images.unsplash.com/photo-1491947153227-33d59da6c448?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
  },
  {
    title: 'Place for work',
    description,
    src: 'https://images.unsplash.com/photo-1519332978332-21b7d621d05e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    title: 'Place for rest',
    description,
    src: 'https://images.unsplash.com/photo-1519710889408-a67e1c7e0452?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
  {
    title: 'What you can read',
    description,
    src: 'https://images.unsplash.com/photo-1535058314881-56b6eb96bd69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
  },
  {
    title: 'Good to make plans, but not for me?',
    description,
    src: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
  },
]
