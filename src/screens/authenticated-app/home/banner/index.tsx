/* @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import LeftImg from "assets/img/banner-1.png";
import RighrImg1 from "assets/img/banner-2.jpg";
import RighrImg2 from "assets/img/banner-3.jpg";

export const Banner = () => {
  return (
    <BannerContainer>
      <Left>
        <div css={leftStyle}></div>
        <Title>震惊！矿大某研究生竟然...</Title>
      </Left>
      <Right>
        <div css={rightStyle} style={{ backgroundImage: `url(${RighrImg1})` }}>
          <MiniTitle>
            <span>恭喜我校某同学获得大奖</span>
          </MiniTitle>
        </div>
        <div css={rightStyle} style={{ backgroundImage: `url(${RighrImg2})` }}>
          <MiniTitle>
            <span>校长你好呀</span>
          </MiniTitle>
        </div>
      </Right>
      <div style={{ clear: "both" }}></div>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 740px;
  height: 228px;
  padding: 20px 18px 20px 19px;
  background: #fff;
  border-radius: 4px;
`;
const Left = styled.div`
  float: left;
  width: 470px;
  height: 100%;
  margin-right: 10px;
  position: relative;
  cursor: pointer;
`;
const Right = styled.div`
  float: right;
  width: 223px;
`;
const leftStyle = css`
  width: 100%;
  height: 100%;
  background-image: url(${LeftImg});
  background-size: 100% 100%;
  border-radius: 5px;
`;
const Title = styled.p`
  color: #fff;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  line-height: 16px;
  font-weight: 500;
  font-size: 1.6rem;
`;
const rightStyle = css`
  position: relative;
  height: 89px;
  margin-bottom: 10px;
  overflow: hidden;
  cursor: pointer;
  background-size: 100% 100%;
  border-radius: 4px;
  &:hover {
    p {
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      padding: 40px 12px 12px;
    }
  }
`;

const MiniTitle = styled.p`
  width: 100%;
  height: 40px;
  margin: 0 auto;
  color: #fff;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.6));
  transition: background 0.3s ease;
  position: absolute;
  bottom: 0;
  padding: 12px;
  line-height: 16px;
  font-size: 1rem;
`;
