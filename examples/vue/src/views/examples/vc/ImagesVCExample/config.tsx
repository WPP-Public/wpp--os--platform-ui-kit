import {
  WppEmpty404,
  WppEmptyCards,
  WppEmptyContent,
  WppEmptyDataviz,
  WppEmptyError,
  WppEmptyFolder,
  WppEmptyNoAccess,
  WppEmptyNoConnection,
  WppEmptyNothingFound,
  WppEmptyNotifications,
  WppEmptyTable,
} from '@platform-ui-kit/components-library-vue'

export const images = [
  {
    title: 'Empty Images',
    images: [
      {
        name: '404',
        html: <WppEmpty404 />,
      },
      {
        name: 'cards',
        html: <WppEmptyCards />,
      },
      {
        name: 'content',
        html: <WppEmptyContent />,
      },
      {
        name: 'dataviz',
        html: <WppEmptyDataviz />,
      },
      {
        name: 'error',
        html: <WppEmptyError />,
      },
      {
        name: 'folder',
        html: <WppEmptyFolder />,
      },
      {
        name: 'no access',
        html: <WppEmptyNoAccess />,
      },
      {
        name: 'no connection',
        html: <WppEmptyNoConnection />,
      },
      {
        name: 'nothing found',
        html: <WppEmptyNothingFound />,
      },
      {
        name: 'notifications',
        html: <WppEmptyNotifications />,
      },
      {
        name: 'table',
        html: <WppEmptyTable />,
      },
    ],
  },
  {
    title: 'Empty Images with custom size',
    images: [
      {
        name: '404, width=250',
        html: <WppEmpty404 width={250} />,
      },
      {
        name: 'table, height=100',
        html: <WppEmptyTable height={100} />,
      },
    ],
  },
]
