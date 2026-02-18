import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Avatar Group',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['xs', 's'],
      control: { type: 'select' },
    },
    variant: {
      control: { type: 'select' },
      options: {
        users: 'circle',
        logos: 'square',
      },
    },
    avatars: {
      control: 'object',
    },
    maxAvatarsToDisplay: {
      type: 'number',
    },
    withTooltip: { control: { type: 'boolean' } },
    tooltipConfig: {
      control: { type: 'object' },
    },
  },
};
const users = [
  {
    name: 'Citlalli Tuva',
    src: '',
    interactable: false,
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk=',
    interactable: false,
  },
  {
    name: 'Wickaninnish Harald',
    src: 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    interactable: false,
  },
  {
    name: 'Gustaf Marcus',
    src: '',
    interactable: false,
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Andrea Sawayn',
    src: '',
    interactable: false,
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Rose Langworth MD',
    src: '',
    interactable: false,
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Shawna Paucek',
    src: '',
    interactable: false,
  },
  {
    name: 'Tabitha Shields',
    src: '',
    interactable: false,
  },
  {
    name: 'Wanda Sauer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeMpwKiGNl4E_gUr53S0bNRoHJpb4szojDA&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Wesley Bins',
    src: '',
    interactable: false,
  },
  {
    name: 'Cilla Kristofer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHqAKFjZSoxbCMRKJODZiVHcx2s9FFrG8hw&usqp=CAU',
    interactable: false,
  },
  {
    name: 'Henrik Yvonne',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROC1QdTfNU6-qVxfpduwsUGu2n5bviGFTwg&usqp=CAU',
    interactable: false,
  },
];
const interactableUsers = [
  {
    name: 'Citlalli Tuva',
    src: '',
    interactable: true,
  },
  {
    name: 'Nicte Lalawethika',
    src: 'https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk=',
    interactable: true,
  },
  {
    name: 'Wickaninnish Harald',
    src: 'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg',
    interactable: true,
  },
  {
    name: 'Gustaf Marcus',
    src: '',
    interactable: true,
  },
  {
    name: 'Helga Karla',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rikard Linn',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTXXnMACt3bMOQZHKpikVvGoepV47RtMwTO7PMtquzKEGgcH7dx1YWuUjvbmq7TYJf3SQ&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Andrea Sawayn',
    src: '',
    interactable: true,
  },
  {
    name: 'Antonia Stoltenberg',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNcHLXeAdAZw7zgMneKviIMbyN9iu-XPByGg&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Edmond Schaefer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiB6O_lfxeRec_iL5xnCkXpYVSKcbR2ouoMA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Lynda Lynch',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPrWps2upGevuvXZxkp1g52wwo0C00x6BZFKk-hJV5SQvcylGNjr0hnDgO0btsRBnWwuc&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Rose Langworth MD',
    src: '',
    interactable: true,
  },
  {
    name: 'Ryan Kozey',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmijLXXeVuoV8O4bTS2DTFK1e8zsIeo_7H8w&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Shawna Paucek',
    src: '',
    interactable: true,
  },
  {
    name: 'Tabitha Shields',
    src: '',
    interactable: true,
  },
  {
    name: 'Wanda Sauer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzeMpwKiGNl4E_gUr53S0bNRoHJpb4szojDA&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Wesley Bins',
    src: '',
    interactable: true,
  },
  {
    name: 'Cilla Kristofer',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoHqAKFjZSoxbCMRKJODZiVHcx2s9FFrG8hw&usqp=CAU',
    interactable: true,
  },
  {
    name: 'Henrik Yvonne',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQROC1QdTfNU6-qVxfpduwsUGu2n5bviGFTwg&usqp=CAU',
    interactable: true,
  },
];
const logos = [
  {
    name: 'Apple',
    src: 'https://media.tenor.com/ulzkSxwJiDMAAAAC/apple-logo.gif',
    interactable: false,
  },
  {
    name: 'Microsoft',
    src: 'https://media.tenor.com/ms9n5oYamMAAAAAC/microsoft-microsoft-logo.gif',
    interactable: false,
  },
  {
    name: 'Facebook',
    src: 'https://media.tenor.com/quphSIVh9n0AAAAC/facebook-fb.gif',
    interactable: false,
  },
  {
    name: 'Netflix',
    src: 'https://media.tenor.com/QJNoPeq9WmUAAAAC/netflix-intro-netflix.gif',
    interactable: false,
  },
  {
    name: 'Tesla',
    src: 'https://cdn.dribbble.com/users/2242484/screenshots/4634202/logotesla.gif',
    interactable: false,
  },
  {
    name: 'Nike',
    src: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg',
    interactable: false,
  },
  {
    name: 'Adidas',
    src: 'https://i.pinimg.com/originals/e8/5d/22/e85d22b3e4d48944de66184b61a95435.gif',
    interactable: false,
  },
  {
    name: 'Coca-Cola',
    src: 'https://media1.giphy.com/media/guzrC1Nlaw9Tv4QWpo/giphy.gif?cid=6c09b952e9farbo95aaklaldebkkb578uurbqkn8mg9yk2cq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g',
    interactable: false,
  },
  {
    name: 'McDonald’s',
    src: 'https://media1.giphy.com/media/L6coiWj8ENrVe/giphy.gif',
    interactable: false,
  },
  {
    name: 'Disney',
    src: 'https://i.gifer.com/6j1q.gif',
    interactable: false,
  },
  {
    name: 'Starbucks',
    src: 'https://media.tenor.com/uWemcnjoT-UAAAAC/starbucks-logo.gif',
    interactable: false,
  },
  {
    name: 'Spotify',
    src: 'https://media.tenor.com/jI4KHrrLPAUAAAAC/spotify-logo.gif',
    interactable: false,
  },
];
const interactableLogos = [
  {
    name: 'Apple',
    src: 'https://media.tenor.com/ulzkSxwJiDMAAAAC/apple-logo.gif',
    interactable: true,
  },
  {
    name: 'Microsoft',
    src: 'https://media.tenor.com/ms9n5oYamMAAAAAC/microsoft-microsoft-logo.gif',
    interactable: true,
  },
  {
    name: 'Facebook',
    src: 'https://media.tenor.com/quphSIVh9n0AAAAC/facebook-fb.gif',
    interactable: true,
  },
  {
    name: 'Netflix',
    src: 'https://media.tenor.com/QJNoPeq9WmUAAAAC/netflix-intro-netflix.gif',
    interactable: true,
  },
  {
    name: 'Tesla',
    src: 'https://cdn.dribbble.com/users/2242484/screenshots/4634202/logotesla.gif',
    interactable: true,
  },
  {
    name: 'Nike',
    src: 'https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5362a828-0f5b-4d17-a6c5-d0677dc89baa_1000x1000.jpeg',
    interactable: true,
  },
  {
    name: 'Adidas',
    src: 'https://i.pinimg.com/originals/e8/5d/22/e85d22b3e4d48944de66184b61a95435.gif',
    interactable: true,
  },
  {
    name: 'Coca-Cola',
    src: 'https://media1.giphy.com/media/guzrC1Nlaw9Tv4QWpo/giphy.gif?cid=6c09b952e9farbo95aaklaldebkkb578uurbqkn8mg9yk2cq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g',
    interactable: true,
  },
  {
    name: 'McDonald’s',
    src: 'https://media1.giphy.com/media/L6coiWj8ENrVe/giphy.gif',
    interactable: true,
  },
  {
    name: 'Disney',
    src: 'https://i.gifer.com/6j1q.gif',
    interactable: true,
  },
  {
    name: 'Starbucks',
    src: 'https://media.tenor.com/uWemcnjoT-UAAAAC/starbucks-logo.gif',
    interactable: true,
  },
  {
    name: 'Spotify',
    src: 'https://media.tenor.com/jI4KHrrLPAUAAAAC/spotify-logo.gif',
    interactable: true,
  },
];
export const AvatarGroup = {
  render: args => {
    console.log('Args', args);
    const getData = () => {
      if (args.variant === 'circle') {
        console.log('Users', users);
        return users;
      }
      if (args.variant === 'square') {
        console.log('Logos', logos);
        return logos;
      }
      return [];
    };
    return html ` <wpp-avatar-group-v3-5-0
      .size="${args.size}"
      .variant="${args.variant}"
      .avatars="${getData()}"
      .maxAvatarsToDisplay="${args.maxAvatarsToDisplay}"
      .withTooltip="${args.withTooltip}"
      .tooltipConfig="${args.tooltipConfig}"
      @wppSelectItem="${(e) => console.log('onWppSelectItem', e)}"
    />`;
  },
  args: {
    size: 'xs',
    variant: 'circle',
    tooltipConfig: {
      placement: 'bottom',
    },
    maxAvatarsToDisplay: 6,
    withTooltip: true,
    avatars: users,
  },
};
export const AvatarGroupInteractable = {
  render: args => {
    const getData = () => {
      if (args.variant === 'circle')
        return interactableUsers;
      if (args.variant === 'square')
        return interactableLogos;
    };
    return html ` <wpp-avatar-group-v3-5-0
      .size="${args.size}"
      .variant="${args.variant}"
      .avatars="${getData()}"
      .maxAvatarsToDisplay="${args.maxAvatarsToDisplay}"
      .withTooltip="${args.withTooltip}"
      .tooltipConfig="${args.tooltipConfig}"
      @wppSelectItem="${(e) => console.log('onWppSelectItem', e)}"
    />`;
  },
  args: {
    size: 'xs',
    variant: 'circle',
    tooltipConfig: {
      placement: 'bottom',
    },
    maxAvatarsToDisplay: 6,
    withTooltip: true,
    avatars: interactableUsers,
  },
};
