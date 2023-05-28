import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from "react-native";

import ChatBubble from "./ChatBubble";
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: [
        {
          msg: "Hii, I'm SharveshGPT.  I'm built with OPENAI API for Internship Project you can ask me anything!! 😊",
          type: "from"
        }
      ],
      msgInput: "",
      isloading: false
    };
  }

  componentDidMount() {
    this.queryText.focus();
  }

  // Code to handle return key press.
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      // console.log("here")
      this.fetchOpenAIChatData();
    }
  }

  //chatgpt fetch

  fetchOpenAIChatData = async () => {
    if (this.state.msgInput !== "") {

      const update2 = {
        chatData: this.state.chatData.concat({
          msg: this.state.msgInput,
          type: "to"
        }),
        msgInput: ""
      }
      this.setState(update2, () => {
        setTimeout(() => {
          this.scrollView.scrollToEnd({ animated: true })
        }, 100);
      });
      this.setState({ isloading: true })

      let data = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `${this.state.msgInput}` },
        ],
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer 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`,
        },
        data: data,
      };
      setTimeout(async () => {
        let completion = await axios(config)
          .then(response => {
            let output = response.data.choices[0].message.content;

            const update = {
              chatData: this.state.chatData.concat({
                msg: output,
                type: 'from'
              })
            }
            this.setState(update, () => {
              setTimeout(() => {
                this.scrollView.scrollToEnd({ animated: true })
              }, 100);
            });
          })
        this.setState({ isloading: false })
      }, 4000)
      // console.log(this.state.chatData)

    }
  };

  //Code to handle to sendMessage



  render() {
    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "#3a3a3a",
            padding: 10,
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', left: 60 }}>
            <ImageBackground source={require('./images/logo.png')} style={{ width: 60, height: 60,top:21 }} />
            <Text style={{ fontSize: 25, color: '#ffffff', fontWeight: 'bold', left: 5,top:38 }}>Sharvesh GPT</Text>
          </View>
        </View>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true });
          }}
        >
          {

            this.state.chatData.map((item, index) => {
              return (
                <ChatBubble
                  key={index}
                  bubbleType={item.type === "from" ? "right" : "left"}
                  msg={item.msg}
                />
              );
            })}
          {(this.state.isloading) ? <ImageBackground source={require('./images/load.gif')} style={{ width: 100, height: 100 }} /> : null}
        </ScrollView>

        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#bdc3c7",
            flexDirection: "row"
          }}
        >
          <TextInput
            ref={(input) => { this.queryText = input; }}
            placeholder="Please type your message..."
            onChangeText={text => {
              this.setState({ msgInput: text });
            }}
            value={this.state.msgInput}
            style={{
              width: "80%",
              padding: 10,
              backgroundColor: "#ecf0f1",
              fontSize: 20
            }}
            onSubmitEditing={this._handleKeyDown}
          />
          <TouchableOpacity
            style={{
              height: "auto",
              width: "20%",
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              this.fetchOpenAIChatData();
            }}
            disabled={this.state.isloading ? true : false}
          >
            <Text
              style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold" }}
            >
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default App;