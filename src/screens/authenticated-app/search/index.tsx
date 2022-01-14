import React, { useEffect, useState } from "react";
import { Input, List } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/img/logo-name.svg";
import styled from "@emotion/styled";
import { resetRoute } from "utils";
import { TopicList } from "components/topic";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

const { Search } = Input;

// 解析url参数
const getQueryString = (name: string) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return "";
};

// 获取替换url参数
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

// 无感更新url
const updateUrl = (key: string, value: string) => {
  var newurl = replaceParamVal(key, value);
  window.history.replaceState(
    {
      path: newurl,
    },
    "",
    newurl
  );
};

interface HotSearch {
  keywords: string;
}
// 获取热搜词
const useHotSearch = () => {
  const client = useHttp();
  const { run, ...result } = useAsync<HotSearch[]>();

  useEffect(() => {
    run(client("/search"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
};

export const SearchPage = () => {
  let [keywords, setKeywords] = useState(getQueryString("kw"));
  let [kw, setKw] = useState(getQueryString("kw"));

  const onSearch = (value: string) => {
    setKw(value);
    setKeywords(value);
    updateUrl("kw", value);
  };

  const { data: hotSearch } = useHotSearch();

  return (
    <div style={{ width: "100%" }}>
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
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
      </SearchContainer>
      <Main>
        <MainContainterLeft>
          <TopicList kw={kw} />
        </MainContainterLeft>
        <MainContainterRight>
          <List
            style={{ backgroundColor: "#FFF" }}
            size="small"
            header={<h4 style={{ paddingLeft: "7px" }}>热搜词</h4>}
            bordered={false}
            dataSource={hotSearch || []}
            renderItem={(item, idx) => (
              <List.Item onClick={() => onSearch(item.keywords)}>
                <span style={{ cursor: "pointer" }}>
                  <span
                    style={
                      idx < 3
                        ? { color: "#f26d5f", fontWeight: 800 }
                        : { color: "#ff8200" }
                    }
                  >
                    {idx + 1}
                  </span>
                  <span style={{ paddingLeft: "12px", fontSize: "12px" }}>
                    {item.keywords}
                  </span>
                </span>
              </List.Item>
            )}
          />
        </MainContainterRight>
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
