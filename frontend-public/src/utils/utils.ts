export const convertAuth = (val: number): string =>
  ['Normal user', 'Author', 'Admin'][val - 1] || 'Unknown role';

export const mockPost = [
  {
    id: 'someId',
    title: 'Create RESTful API with Express.js',
    content: '<p>Lorem ipsum dolor sit amer',
    image: 'https://i.imgur.com/23pjpQW.jpg',

    publishedAt: '2024-09-28',
    editedAt: '2024-09-28',

    categories: [
      { id: 'someId', name: 'Express' },
      { id: 'someId3', name: 'Api' },
      { id: 'someId4', name: 'Generated' },
      { id: 'someId2', name: 'Nodejs' },
    ],
    User: { id: 'someId', name: 'Long author name' },
  },
  {
    id: 'someId2',
    title: 'Create RESTful API with Express.js',
    content: '<p>Lorem ipsum dolor sit amer',
    image: 'https://i.imgur.com/23pjpQW.jpg',

    publishedAt: '2024-09-28',
    editedAt: '2024-09-28',

    categories: [
      { id: 'someId', name: 'Express' },
      { id: 'someId3', name: 'Api' },
      { id: 'someId4', name: 'Generated' },
      { id: 'someId2', name: 'Nodejs' },
    ],
    User: { id: 'someId', name: 'Long author name' },
  },
  {
    id: 'someId3',
    title: 'Create RESTful API with Express.js',
    content: '<p>Lorem ipsum dolor sit amer',
    image: 'https://i.imgur.com/23pjpQW.jpg',

    publishedAt: '2024-09-28',
    editedAt: '2024-09-28',

    categories: [
      { id: 'someId', name: 'Express' },
      { id: 'someId3', name: 'Api' },
      { id: 'someId4', name: 'Generated' },
      { id: 'someId2', name: 'Nodejs' },
    ],
    User: { id: 'someId', name: 'Long author name' },
  },
  {
    id: 'someId4',
    title: 'Create RESTful API with Express.js',
    content: '<p>Lorem ipsum dolor sit amer',
    image: 'https://i.imgur.com/23pjpQW.jpg',

    publishedAt: '2024-09-28',
    editedAt: '2024-09-28',

    categories: [
      { id: 'someId', name: 'Express' },
      { id: 'someId3', name: 'Api' },
      { id: 'someId4', name: 'Generated' },
      { id: 'someId2', name: 'Nodejs' },
    ],
    User: { id: 'someId', name: 'Long author name' },
  },
  {
    id: 'someId5',
    title: 'Create RESTful API with Express.js',
    content: '<p>Lorem ipsum dolor sit amer',
    image: 'https://i.imgur.com/23pjpQW.jpg',

    publishedAt: '2024-09-28',
    editedAt: '2024-09-28',

    categories: [
      { id: 'someId', name: 'Express' },
      { id: 'someId3', name: 'Api' },
      { id: 'someId4', name: 'Generated' },
      { id: 'someId2', name: 'Nodejs' },
    ],
    User: { id: 'someId', name: 'Long author name' },
  },
];
