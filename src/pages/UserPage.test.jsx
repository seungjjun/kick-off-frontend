import { fireEvent, render, screen } from '@testing-library/react';

import UserPage from './UserPage';

const navigate = jest.fn();
const fetchMyInformation = jest.fn();
const setComponentState = jest.fn();
const changeComponentState = jest.fn();

const deletePost = jest.fn();

let location = {};

let componentState = '';
let myInformation = {};

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },

  useLocation() {
    return location;
  },
}));

jest.mock('../hooks/useUserStore', () => () => ({
  fetchMyInformation,
  setComponentState,
  changeComponentState,
  myInformation,
  componentState,
}));

jest.mock('../hooks/usePostStore', () => () => ({
  deletePost,
}));
const context = describe;

describe('UserPage', () => {
  beforeEach(() => {
    myInformation = {
      user: {
        name: 'messi',
        profileImage: 'image',
      },
      posts: [
        {
          id: 1,
          postInformation: {
            title: '메시 그는 신인가?',
            content: '카타르 월드컵 아르헨티나 우승',
          },
          createdAt: '2022-11-22',
          hit: 1000,
        },
      ],

      comments: [
        {
          id: 1,
          content: '메시가 월드컵을 우승하다니...!',
        },
        {
          id: 2,
          content: '호날두는 조별탈락..',
        },
      ],

      recomments: [
        {
          content: 'GOAT 그 자체',
        },
      ],
    };

    location = {
      pathname: '/users',
      search: '?id=1',
    };

    componentState = '작성글';

    render(<UserPage />);
  });

  context('when check my information page', () => {
    it('render my information', () => {
      screen.getAllByText('messi');
      screen.getByText('작성글 수 1');
      screen.getByText('작성 댓글 수 2');
    });
  });

  context('when click written post button', () => {
    it('changeComponentState function called', () => {
      fireEvent.click(screen.getByText('작성글'));

      expect(changeComponentState).toBeCalled();
    });

    it('render posts', () => {
      screen.getByText('메시 그는 신인가?');
      screen.getByText('2022-11-22');
      screen.getByText('1000');
    });
  });
});
