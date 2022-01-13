import React, { useState } from "react";
import { Input } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/img/logo-name.svg";
import styled from "@emotion/styled";
import { resetRoute } from "utils";
import { TopicList } from "components/topic";

const { Search } = Input;

const getQueryString = (name: string) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return "";
};

const replaceParamVal = (par: string, par_value: string) => {
  const destiny = window.location.href;
  var pattern = par + "=([^&]*)";
  var replaceText = par + "=" + par_value;
  if (destiny.match(pattern)) {
    var tmp = "/\\" + par + "=[^&]*/";
    // eslint-disable-next-line
    tmp = destiny.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (destiny.match("[?]")) {
      return destiny + "&" + replaceText;
    } else {
      return destiny + "?" + replaceText;
    }
  }
};

const updateUrl = (key: string, value: string) => {
  var newurl = replaceParamVal(key, value);
  //向当前url添加参数，没有历史记录
  window.history.replaceState(
    {
      path: newurl,
    },
    "",
    newurl
  );
};

export const SearchPage = () => {
  let [keywords, setKeywords] = useState(getQueryString("kw"));

  const onSearch = (value: string) => {
    setKeywords(value);
    updateUrl("kw", value);
  };

  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <SearchContainer>
        <SoftwareLogo
          onClick={resetRoute}
          width={"18rem"}
          color={"rgb(38, 132, 255)"}
          cursor={"pointer"}
        />
        <Search
          style={{ width: "600px" }}
          allowClear
          enterButton="搜索一下"
          size="large"
          onSearch={onSearch}
          defaultValue={keywords}
        />
      </SearchContainer>
      <Main>
        <MainContainterLeft>
          <TopicList kw={keywords} />
        </MainContainterLeft>
        <MainContainterRight>{/* 热搜 */}</MainContainterRight>
        <div style={{ clear: "both" }}></div>
      </Main>
    </div>
  );
};

const Main = styled.div`
  width: 1120px;
  margin: 20px auto;
  padding-top: 87px;
  background-color: #f7f7f7;
`;
const MainContainterLeft = styled.div`
  width: 740px;
  float: left;
`;
const MainContainterRight = styled.div`
  width: 360px;
  float: right;
`;

const SearchContainer = styled.div`
  width: 100%;
  height: 87px;
  position: fixed;
  top: 0;
  padding: 20px 0;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 10%);
  background-color: #fff;
  z-index: 1;
`;
