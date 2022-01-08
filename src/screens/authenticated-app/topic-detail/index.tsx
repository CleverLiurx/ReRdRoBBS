import React, { ReactNode, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { Comment, Avatar, Tooltip, Image, Button } from "antd";
import { useHttp } from "utils/http";
import moment from "moment";
import { useAsync } from "utils/use-async";
import { Reply, Topic } from "types/topic";
import { UserMini } from "types/user";
import PariseImg from "assets/img/parise.png";
import starImg from "assets/img/star.png";
import { SmileOutlined, PictureOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import E from "wangeditor";
import { useNavigate } from "react-router";

let editor: E | null = null;

interface ParamType {
  topicId: string | undefined;
  type: string;
}

const useDetails = (param: string) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Topic>();

  useEffect(() => {
    run(client(`/topic/${param}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
export const TopicDetail = () => {
  useDocumentTitle("文章详情");

  const id = window.location.pathname.split("topic/")[1];
  let { data: topicItem } = useDetails(id);

  useEffect(() => {
    // 注：class写法需要在componentDidMount 创建编辑器
    if (!topicItem?.richContent) return;
    editor = new E("#editor");

    editor.config.menus = [];
    editor.config.showFullScreen = false;

    /**一定要创建 */
    editor.create();
    editor.disable();

    editor.txt.html(topicItem?.richContent);

    return () => {
      // 组件销毁时销毁编辑器  注：class写法需要在componentWillUnmount中调用
      editor?.destroy();
    };
  }, [topicItem]);
  let navigate = useNavigate();
  const actions = topicItem ? [<div></div>] : [<div></div>];
  return (
    <Main>
      <MainContainterLeft>
        <ContainerLeft>
          <div>
            {topicItem ? (
              <>
                <Comment
                  actions={actions}
                  author={<span>{topicItem.createBy.username}</span>}
                  avatar={
                    <span
                      onClick={() =>
                        navigate(`/personal/${topicItem?.createBy._id}`)
                      }
                    >
                      <Avatar src={topicItem.createBy.avator} alt="Han Solo" />
                    </span>
                  }
                  content={
                    <>
                      {topicItem.richContent ? (
                        <>
                          <h2 style={{ fontSize: "20px", marginTop: "20px" }}>
                            {topicItem.title}
                          </h2>
                          <WEditor id="editor" />
                        </>
                      ) : (
                        <>
                          <p>{topicItem.content}</p>
                          {topicItem.topicImage.map((img) => (
                            <Image
                              key={img._id}
                              src={img.url}
                              preview={false}
                            />
                          ))}
                        </>
                      )}
                    </>
                  }
                  datetime={
                    <span>
                      <span style={{ paddingRight: "10px" }}>
                        {moment(topicItem.createTime).fromNow()}
                      </span>
                      来自
                      <span
                        style={{ color: "#EA540B", cursor: "pointer" }}
                        onClick={() =>
                          navigate(`/class/${topicItem?.classFrom._id}`)
                        }
                      >
                        {topicItem.classFrom.classname}
                      </span>
                    </span>
                  }
                />
                <HandleBtn topicItem={topicItem}></HandleBtn>
              </>
            ) : null}
          </div>
          {/* <Editor></Editor> */}
          {topicItem?._id ? <ReplyCart topicId={topicItem?._id || ""} /> : null}
        </ContainerLeft>
      </MainContainterLeft>
      <MainContainterRight>
        <Author user={topicItem?.createBy} />
      </MainContainterRight>
    </Main>
  );
};

const HandleBtn = ({ topicItem }: { topicItem: Topic }) => {
  let [topic, setTopic] = useState(topicItem);
  const TopicHandle = (param: ParamType) => {
    const client = useHttp();
    client(`/${param.type}`, {
      data: { topicId: param.topicId },
      method: "PATCH",
    }).then(setTopic);
  };

  return (
    <div style={{ margin: "10px" }}>
      <Tooltip
        key="comment-basic-parise"
        title={topic.hadParise ? "取消点赞" : "点赞"}
      >
        <span
          onClick={() => {
            TopicHandle({ topicId: topic?._id, type: "parise" });
          }}
        >
          {/* <LikeOutlined style={{ color: topic.hadParise ? "#EA540B" : "" }} /> */}
          <PImg
            style={
              topic.hadParise
                ? {
                    border: "1px solid #EA540B",
                    background: "rgba(255,125,65,.1)",
                  }
                : {}
            }
          >
            <img src={PariseImg} alt="" />
            <span>{topic.praiseCount}</span>
          </PImg>
        </span>
      </Tooltip>
      <Tooltip
        key="comment-basic-star"
        title={topic.hadStar ? "取消收藏" : "收藏"}
      >
        <span
          onClick={() => {
            TopicHandle({ topicId: topic?._id, type: "star" });
          }}
        >
          <PImg
            style={
              topic.hadStar
                ? {
                    border: "1px solid #EA540B",
                    background: "rgba(255,125,65,.1)",
                  }
                : {}
            }
          >
            <img src={starImg} alt="" />
            <span>{topic.starCount}</span>
          </PImg>
        </span>
      </Tooltip>
    </div>
  );
};

const Author = ({ user }: { user?: UserMini }) => {
  // const { user } = useAuth();
  let navigate = useNavigate();
  return (
    <ContainerRight>
      <img
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          margin: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/personal/${user?._id}`)}
        src={user?.avator}
        alt={user?.username}
      />
      <div style={{ color: "#9B9B9B", fontSize: "1.2rem", margin: "5px" }}>
        {user?.username}
      </div>
      <div style={{ color: "#9B9B9B", fontSize: "1.2rem", margin: "5px" }}>
        {user?.email || "暂无邮箱"}
      </div>
      <div style={{ marginTop: "20px" }}>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.topicCount}</div>
          <div>文章</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.bePraiseCount}</div>
          <div>被点赞</div>
        </div>
        <div style={{ width: "33.33%", display: "inline-block" }}>
          <div style={{ color: "#EA540B" }}>{user?.record.beStarCount}</div>
          <div>被收藏</div>
        </div>
      </div>
    </ContainerRight>
  );
};

const ReplyCart = ({ topicId }: { topicId: string }) => {
  let [activeReply, setActiveReply] = useState({
    topicId,
    pid: "",
    // centent: ""
  });

  // const [replyArr, setReplayArr] = useState(replys)

  const useReply = () => {
    const client = useHttp();
    const { run, ...result } = useAsync<Reply[]>();

    useEffect(() => {
      run(client(`/reply/${topicId}`));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return result;
  };
  let navigate = useNavigate();
  const { data: replys, setData } = useReply();

  const ExampleComment = ({
    children,
    reply,
  }: {
    children?: ReactNode;
    reply?: Reply;
  }) => (
    <Comment
      actions={
        reply?.hasChild
          ? [
              <span
                key="comment-nested-reply-to"
                onClick={() =>
                  setActiveReply({ ...activeReply, pid: reply?._id })
                }
              >
                回复
              </span>,
            ]
          : []
      }
      author={<span>{reply?.createBy.username}</span>}
      avatar={
        <img
          src={reply?.createBy.avator}
          style={
            !reply?.hasChild
              ? { width: "20px", height: "20px", borderRadius: "50%" }
              : { width: "32px", height: "32px", borderRadius: "50%" }
          }
          onClick={() => navigate(`/personal/${reply?.createBy._id}`)}
          alt="Avactor"
        />
      }
      content={<p style={{ fontSize: "1.3rem" }}>{reply?.content}</p>}
    >
      {activeReply.pid === reply?._id ? (
        <Editor
          topicId={activeReply.topicId}
          pid={activeReply.pid}
          callback={(data) => {
            setActiveReply({ ...activeReply, pid: "" });
            setData(data);
          }}
        />
      ) : null}
      {children}
    </Comment>
  );
  return (
    <div>
      <Editor
        topicId={activeReply.topicId}
        pid={""}
        callback={(data) => {
          setData(data);
        }}
      />
      {replys?.map((r1) => {
        return (
          <ExampleComment key={r1._id} reply={r1}>
            {r1.reply.map((r2) => {
              return <ExampleComment key={r2._id} reply={r2} />;
            })}
          </ExampleComment>
        );
      })}
    </div>
  );
};

const Editor = ({
  topicId,
  pid,
  callback,
}: {
  topicId: string;
  pid: string;
  callback?: (replys: Reply[]) => void;
}) => {
  let [value, setValue] = useState("");
  const client = useHttp();
  const publishReply = () => {
    client("/reply", {
      data: { topicId, pid, content: value },
      method: "POST",
    }).then((data) => {
      setValue("");
      callback && callback(data);
    });
  };
  return (
    <TextBody>
      <TextArea
        autoSize={{ minRows: 2, maxRows: 2 }}
        bordered={false}
        placeholder="评论一下～"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Contral>
        <SmileOutlined style={{ paddingRight: "20px" }} />
        <PictureOutlined />
        <ReplyBtn onClick={publishReply} type="primary" shape="round">
          发布
        </ReplyBtn>
      </Contral>
      <div style={{ clear: "both" }}></div>
    </TextBody>
  );
};

const Main = styled.div`
  width: 1120px;
  margin: 20px auto 0;
`;
const MainContainterLeft = styled.div`
  width: 740px;
  float: left;
`;
const MainContainterRight = styled.div`
  width: 360px;
  float: right;
`;

const ContainerRight = styled.div`
  margin-bottom: 20px;
  width: 360px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding-left: 20px;
  text-align: center;
`;
const ContainerLeft = styled.div`
  width: 740px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  padding: 15px;
`;

const TextBody = styled.div`
  border-radius: 5px;
  height: 95px;
  border: 1px solid #eee;
  &:hover {
    border: 1px solid #ea540b;
  }
`;

const Contral = styled.div`
  margin: 8px 0 5px 10px;
  color: #666;
`;

const ReplyBtn = styled(Button)`
  border: none;
  height: 25px;
  font-size: 1.4rem;
  float: right;
  margin-right: 20px;
`;

const WEditor = styled.div`
  /* margin-top: 20px; */
  & > .w-e-toolbar {
    z-index: auto !important;
    border: none !important;
  }
  & > .w-e-text-container {
    border: none !important;
    z-index: auto !important;
    height: auto !important;
  }
`;

const PImg = styled.div`
  width: 60px;
  height: 32px;
  display: inline-block;
  margin-right: 12px;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 0px 9px;
  &:hover {
    border: 1px solid #ea540b;
  }

  img {
    width: 24px;
    height: 24px;
    margin: 3px 4px 0 0;
  }

  span {
    color: #999;
    float: right;
    line-height: 32px;
  }
`;
