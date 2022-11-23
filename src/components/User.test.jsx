import { fireEvent, render, screen } from '@testing-library/react';

import User from './User';

const changeComponentState = jest.fn();
let componentState = '';

const context = describe;

describe('User', () => {
  beforeEach(() => {
    const myInformation = {
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
          id: 1,
          content: 'GOAT 그 자체',
        },
      ],

      likedPosts: [
        {
          id: 1,
          postInformation: {
            title: '포르투갈 16강 진출 실패',
            content: '포르투갈 대한민국에게 2:0으로 지면서 월드컵 조별 리그 탈락...',
          },
          createdAt: '2022-11-24',
          hit: 3123,
        },
      ],
    };

    render(<User
      myInformation={myInformation}
      changeComponentState={changeComponentState}
      componentState={componentState}
    />);
  });

  context('when check my information page', () => {
    it('render my information', () => {
      screen.getAllByText('messi');
      screen.getByText('작성글 수 1');
      screen.getByText('작성 댓글 수 2');
    });
  });

  context('when click written post button', () => {
    beforeEach(() => {
      componentState = '작성글';
    });

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

  context('when click written comment button', () => {
    beforeEach(() => {
      componentState = '작성 댓글';
    });

    it('changeComponentState function called', () => {
      fireEvent.click(screen.getByText('작성 댓글'));

      expect(changeComponentState).toBeCalled();
    });

    it('render comments', () => {
      screen.getByText('메시가 월드컵을 우승하다니...!');
      screen.getByText('GOAT 그 자체');
      screen.getByText('호날두는 조별탈락..');
    });
  });

  context('when click liked post button', () => {
    beforeEach(() => {
      componentState = '좋아요한 글';
    });

    it('changeComponentState function called', () => {
      fireEvent.click(screen.getByText('좋아요한 글'));

      expect(changeComponentState).toBeCalled();
    });

    it('render liked posts', () => {
      screen.getByText('포르투갈 16강 진출 실패');
      screen.getByText('2022-11-24');
      screen.getByText(3123);
    });
  });
});
