import React, { useState } from 'react';
import styled from 'styled-components';
import { useInterval } from 'react-use';

function RainDrop(props) {
  const [emojisToRender, setEmojisToRender] = useState([{ offset: 0, key: 0, emoji: '' }]);

  useInterval(() => {
    if (emojisToRender.length > 20) {
      emojisToRender.shift();
    }
    const offset = Math.floor(Math.random() * 2000);
    const key = offset + Math.random() * 1000000;

    const emoji = '💧';
    emojisToRender.push({ offset, key, emoji });
    setEmojisToRender([...emojisToRender]);
  }, 100);

  const handleAnimation = () => {
    return (
      <SuperContainer>
        {emojisToRender.map(({ key, emoji, offset }) => {
          return (
            <EmojiContainer key={key} offset={offset}>
              {emoji}
            </EmojiContainer>
          );
        })}
      </SuperContainer>
    );
  };

  return <>{props.showAnimation ? handleAnimation() : null}</>;
}

export default RainDrop;

const SuperContainer = styled.div.attrs((props) => ({
  style: {
    display: props.flex,
    alignItems: props.center,
  },
}))`
  width: 100%;
`;

const EmojiContainer = styled.div`
  @keyframes falldown {
    0% {
      margin-top: 0;
    }
    100% {
      margin-top: 1000px;
    }
  }

  z-index: 9999;
  position: absolute;
  top: 80px;
  left: ${(props) => props.offset}px;

  font-size: 24px;
  animation-name: falldown;
  animation-duration: 4s;
`;
