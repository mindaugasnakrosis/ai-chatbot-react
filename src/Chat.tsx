import axios from "axios";
import { useEffect, useState } from "react";
import ChatBot, { Loading } from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const theme = {
  background: "#f5f8fb",
  fontFamily: "Sans Serif",
  headerBgColor: "rgb(0, 87, 255)",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "rgb(245, 245, 245)",
  botFontColor: "rgb(0, 0, 0)",
  userBubbleColor: "rgb(0, 87, 255)",
  userFontColor: "#fff",
};

const options = [
  "Can you tell me some details about Château Lafite Rothschild 2009 and 2010 differences?",
  "What are top fine wines for investing in Burgundy region?",
  "Can you list me the most popular vintages and wine names of Champagne fine wines?",
  "I have something else to ask",
];
const formatStringToChunks = (str: string) => {
  const regExp = /[a-zA-Z|\d]/g;
  const mapped = str.split("\n");
  const emptyRemoved = mapped.reduce((acc, cur) => {
    if (regExp.test(cur)) {
      acc.push(cur);
      return acc;
    }
    return acc;
  }, [] as any);

  const normalized = emptyRemoved.map((x: string) =>
    x
      .replace(/\+/g, "")
      .replace(/'/g, "")
      .replace(/"/g, "")
  );
  return normalized;
};

const messageStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
} as any;

const ChatBotApiWrapper = (props: any) => {
  console.log(props);
  const [messages, setMessages] = useState<string[] | null>(null);
  useEffect(() => {
    const fetchAndSetMessage = async () => {
      const res: any = await axios.post("http://localhost:8080/user-message", {
        message: props.previousStep.message,
      });
      setMessages(formatStringToChunks(res.data.content));
    };
    fetchAndSetMessage();
    //eslint-disable-next-line
  }, []);
  return (
    <div style={messageStyle}>
      {messages ? messages.map((message) => <div>{message}</div>) : <Loading />}
    </div>
  );
};

const Chat = (props: any) => {
  const steps = [
    {
      id: "1",
      message: "Hello, how can I help you today?",
      trigger: "2",
    },
    {
      id: "2",
      options: [
        { value: 1, label: options[0], trigger: "3" },
        { value: 2, label: options[1], trigger: "3" },
        { value: 3, label: options[2], trigger: "3" },
        { value: 4, label: options[3], trigger: "3" },
      ],
    },
    // {
    //   id: "2",
    //   user: true,
    //   trigger: "3",
    // },
    {
      id: "3",
      component: <ChatBotApiWrapper />,
      asMessage: true,
      delay: 0,
      trigger: "4",
    },
    {
      id: "4",
      user: true,
      trigger: "5",
    },
    {
      id: "5",
      component: <ChatBotApiWrapper />,
      asMessage: true,
      delay: 0,
      trigger: "6",
    },
    {
      id: "6",
      user: true,
      trigger: "7",
    },
    {
      id: "7",
      component: <ChatBotApiWrapper />,
      asMessage: true,
      delay: 0,
      trigger: "8",
    },
    {
      id: "8",
      user: true,
      trigger: "9",
    },
    {
      id: "9",
      component: <ChatBotApiWrapper />,
      asMessage: true,
      delay: 0,
      trigger: "10",
    },
    {
      id: "10",
      user: true,
      trigger: "11",
    },
    {
      id: "11",
      component: <ChatBotApiWrapper />,
      asMessage: true,
      delay: 0,
      trigger: "12",
    },
    {
      id: "12",
      user: true,
      end: true,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <ChatBot floating steps={steps} style={{ textAlign: "start", fontSize: 18 }} />
    </ThemeProvider>
  );
};

export default Chat;
