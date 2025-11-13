<template>
  <div v-show="!isProductSpecification" class="dS-box">
    <div class="dS-logo" @click="drawer = !drawer"><span>AI</span></div>
    <el-drawer 
        :visible.sync="drawer" 
        @close="handleClose" 
        direction="rtl"
        :append-to-body="true"
        :modal-append-to-body="false"
        title="有什么不懂的可以问我"
    >
        <div>
            <!-- 内容 -->
             <div id="deepsekbox">
                <div class="chat-container">
                <div class="chat-content">
                    <div class="chatBox">
                    <div v-if="errorMessage" class="error-message">
                        {{ errorMessage }}
                    </div>
                    <div class="chat-messages">
                        <div v-for="(message, index) in currentMessages" :key="index" class="message">
                        <div v-if="message.sender === 'user'" class="user-message-container">
                            <article class="message-content user-message">{{ message.text }}</article>
                            <img src="@img/avatar.png" class="avatar user-avatar" alt="用户头像">
                        </div>
                        <div v-else class="bot-message-container">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAMFBMVEVHcExNa/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5Na/5glKuKAAAAD3RSTlMA05QmPhvxp+O+dGJWhBD9rd47AAAA0UlEQVQokcWR2RbDIAhEARXXhP//26IYY9o+9pzOQ9C5LkwE+K9CiaTllIfrCJkRReTUWRMyu/VPlKU+rVodOJ+TTvBmwg7Aa83djAAkD3kAXsMg8k6dDehj46LZ9xvZO3+knVIRqaNfSaN4wxGKLWgGr8jjfMRJw/BYM5m6yzKjmYVywL6XzmgRp7N+493WPE3bXltX5nw5ONeFee1941zeqaDivB96vYLGOkby3moO8KSJejfxtPdLG/W82hRslPMBu8rEXOCbQqu1ha/o13oBhAwQQ4gEzPgAAAAASUVORK5CYII="
                        class="dplogo"
                        ></img>
                            <path fill="var(--dsw-alias-brand-primary)" d="M33.615 2.598c-.36-.176-.515.16-.726.33-.072.055-.132.127-.193.193-.526.562-1.14.93-1.943.887-1.174-.067-2.176.302-3.062 1.2-.188-1.107-.814-1.767-1.766-2.191-.498-.22-1.002-.441-1.35-.92-.244-.341-.31-.721-.433-1.096-.077-.226-.154-.457-.415-.496-.282-.044-.393.193-.504.391-.443.81-.614 1.702-.598 2.605.04 2.033.898 3.652 2.603 4.803.193.132.243.264.182.457-.116.397-.254.782-.376 1.179-.078.253-.194.308-.465.198-.936-.391-1.744-.97-2.458-1.669-1.213-1.173-2.31-2.467-3.676-3.48a16.254 16.254 0 0 0-.975-.668c-1.395-1.354.183-2.467.548-2.599.382-.138.133-.612-1.102-.606-1.234.005-2.364.42-3.803.97a4.34 4.34 0 0 1-.66.193 13.577 13.577 0 0 0-4.08-.143c-2.667.297-4.799 1.558-6.365 3.712C.116 8.436-.327 11.378.215 14.444c.57 3.233 2.22 5.91 4.755 8.002 2.63 2.17 5.658 3.233 9.113 3.03 2.098-.122 4.434-.403 7.07-2.633.664.33 1.362.463 2.518.562.892.083 1.75-.044 2.414-.182 1.04-.22.97-1.184.593-1.36-3.05-1.421-2.38-.843-2.99-1.311 1.55-1.834 3.918-5.093 4.648-9.531.072-.49.164-1.18.153-1.577-.006-.242.05-.336.326-.364a5.903 5.903 0 0 0 2.187-.672c1.977-1.08 2.774-2.853 2.962-4.978.028-.325-.006-.661-.35-.832ZM16.39 21.73c-2.956-2.324-4.39-3.089-4.982-3.056-.554.033-.454.667-.332 1.08.127.407.293.688.526 1.046.16.237.271.59-.161.854-.952.589-2.607-.198-2.685-.237-1.927-1.134-3.537-2.632-4.673-4.68-1.096-1.972-1.733-4.087-1.838-6.345-.028-.545.133-.738.676-.837A6.643 6.643 0 0 1 5.086 9.5c3.017.441 5.586 1.79 7.74 3.927 1.229 1.217 2.159 2.671 3.116 4.092 1.02 1.509 2.115 2.946 3.51 4.125.494.413.887.727 1.263.958-1.135.127-3.028.154-4.324-.87v-.002Zm1.417-9.114a.434.434 0 0 1 .587-.408c.06.022.117.055.16.105a.426.426 0 0 1 .122.303.434.434 0 0 1-.437.435.43.43 0 0 1-.432-.435Zm4.402 2.257c-.283.116-.565.215-.836.226-.421.022-.88-.149-1.13-.358-.387-.325-.664-.506-.78-1.073-.05-.242-.022-.617.022-.832.1-.463-.011-.76-.338-1.03-.265-.22-.603-.28-.974-.28a.8.8 0 0 1-.36-.11c-.155-.078-.283-.27-.161-.508.039-.077.227-.264.271-.297.504-.286 1.085-.193 1.623.022.498.204.875.578 1.417 1.107.553.639.653.815.968 1.295.25.374.476.76.632 1.2.094.275-.028.5-.354.638Z"></path>
                            <article
                            class="message-content bot-message"
                            v-html="renderMarkdown(message.text)"
                            :data-completed="message.completed || !isStreaming"
                            ></article>
                        </div>
                        </div>
                    </div>
                    <div class="chat-input">
                        <textarea
                        v-model="inputMessage"
                        placeholder="请输入您的问题"
                        @keyup.enter.exact="handleSend"
                        rows="4"
                        :disabled="isStreaming"
                        />
                        <button @click="handleButtonClick" :disabled="!inputMessage.trim() && !isStreaming">
                        {{ isStreaming ? '停止生成' : '发送' }}
                        </button>
                        <br></br>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </el-drawer>
  </div>
</template>
<script>
import { DrawerProps } from 'element-ui'
import marked from 'marked';
import DOMPurify from 'dompurify';
import { postStream } from '@/util/deepSeek';
export default {
  name: "deepSeek",
  components: {DrawerProps},
  props: [],
  data() {
    return {
      drawer:false,

      currentMessages: [],
      inputMessage: "",
      errorMessage: "",
      currentBotMessage: '',
      isStreaming: false,
      abortController: null,
      conversationId: null,
      // 头像URL可以存储在data中以便动态更改
      userAvatar: '',
      botAvatar: '',
      isProductSpecification:false,
    };
  },
  computed: {
  },
  watch: {
    $route(to, from) {
       if (to.name == "productSpecification") {
        this.isProductSpecification=true;
       }
    }
  },

  mounted() {
    // var cureentPage=this.$route.path;
    // if(cureentPage.comtains('productSpecification')){
    //   isProductSpecification=true;
    // }
  },
  created() {
    this.generateConversationId();
    
  },
  methods: {
    handleClose() {
        this.drawer=false
    },
    generateConversationId() {
      this.conversationId = 'conv-' + Date.now();
    },
 
    renderMarkdown(content) {
      content = content || '';
      content = content.replace(/<think>/g, '<div class="thinking-container"><img src="https://cdn-icons-png.flaticon.com/512/1055/1055687.png" class="thinking-icon"><span class="deepThink">');
      if (!content.includes('</think>')) {
        content = content.concat('</span></div>');
      }
      if (content.includes('</think>')) {
        content = content.replace(/<\/span><\/div>/g, '');
        content = content.replace(/<\/think>/g, '</span></div>');
      }
      const html = marked(content);
      const sanitizedHtml = DOMPurify.sanitize(html);
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = sanitizedHtml.toString();
      const deepThinkElements = tempDiv.querySelectorAll('.deepThink');
      deepThinkElements.forEach((element) => {
        if (element.textContent.trim() === '') {
          element.textContent = '暂无推理过程';
        }
      });
      return tempDiv.innerHTML;
    },
    async handleSend() {
      if (!this.inputMessage.trim() || this.isStreaming) return;
      this.abortController = new AbortController();
      const userMessage = {
        sender: 'user',
        text: this.inputMessage,
        conversationId: this.conversationId
      };
      this.currentMessages.push(userMessage);
      const botMessageIndex = this.currentMessages.length;
      this.currentMessages.push({
        sender: 'system',
        text: '',
        completed: false,
        conversationId: this.conversationId
      });
      const conversationHistory = this.buildConversationHistory();
      this.inputMessage = '';
      this.isStreaming = true;
      this.currentBotMessage = '';
      try {
        const response = await postStream({
          messages: conversationHistory,
          model: "deepseek-chat",
          stream: true,
          conversation_id: this.conversationId
        }, {
          signal: this.abortController.signal
        });
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (this.isStreaming) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          const lines = text.split('\n\n').filter(line => line.trim());
          for (const line of lines) {
            if (line.trim() === 'data: [DONE]') {
              this.finishGeneration(botMessageIndex);
              return;
            }
            if (line.startsWith('data: ')) {
              try {
                const jsonStr = line.substring(6);
                const data = JSON.parse(jsonStr);
                if (data.choices?.[0]?.delta?.content) {
                  this.currentBotMessage += data.choices[0].delta.content;
                  this.$set(this.currentMessages, botMessageIndex, {
                    sender: 'system',
                    text: this.currentBotMessage,
                    completed: false,
                    conversationId: this.conversationId
                  });
                  this.$nextTick(() => {
                    const container = this.$el.querySelector('.chat-messages');
                    container.scrollTop = container.scrollHeight;
                  });
                }
              } catch (e) {
                console.error('解析JSON出错:', e);
              }
            }
          }
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('流式请求出错:', error);
          this.errorMessage = '请求出错: ' + error.message;
          this.$set(this.currentMessages, botMessageIndex, {
            sender: 'system',
            text: '请求出错: ' + error.message,
            completed: true,
            conversationId: this.conversationId
          });
        }
      } finally {
        if (this.isStreaming) {
          this.finishGeneration(botMessageIndex);
        }
      }
    },
    buildConversationHistory() {
      const currentConversationMessages = this.currentMessages.filter(
        msg => msg.conversationId === this.conversationId
      );
      const recentMessages = currentConversationMessages.slice(-10);
      return recentMessages.map(message => {
        return {
          role: message.sender === 'user' ? 'user' : 'assistant',
          content: message.text
        };
      });
    },
    finishGeneration(index) {
      this.isStreaming = false;
      if (this.abortController) {
        this.abortController.abort();
        this.abortController = null;
      }
      this.$set(this.currentMessages, index, {
        ...this.currentMessages[index],
        completed: true
      });
    },
    handleButtonClick() {
      if (this.isStreaming) {
        this.finishGeneration(this.currentMessages.length - 1);
      } else {
        this.handleSend();
      }
    },
    startNewConversation() {
      this.generateConversationId();
    }
  },
};
</script>

<style scoped lang="less">
/deep/ .el-drawer__wrapper{
    z-index: 99!important;
    display: block;
}
@media screen and (max-width: 1199px) {
  .dS-box{
    display: none;
  }
}
.dS-box{
    .dS-logo{
        width: 60px;
        height: 60px;
        background-color: rgb(234, 50, 0);
        position: fixed;
        right: 1.9%;
        top: 46%;
        z-index: 99;
        cursor: pointer;
        box-shadow:4px 4px 15px #1e1e1e;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            font-size: xx-large;
            color: white;
        }
        transition: all 0.5s ease;
    }
    .dS-logo:hover{
      transform: scale(1.2, 1.2);
    }
}
#deepsekbox {
  margin-top: 50px;
  display: flex;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
}
.dplogo{
  height: 26px;
  width: 26px;
}
.chat-container {
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.chat-content {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
.chatBox {
  display: flex;
  flex-direction: column;
  height: 92%;
  width: 100%;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
}
.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 8px;
  text-align: center;
}
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
}
.message {
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
}
.user-message-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
}
.bot-message-container {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: flex-start;
  gap: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.user-avatar {
  border: 2px solid #2196f3;
}
.bot-avatar {
  border: 2px solid #4caf50;
}
.message-content {
  max-width: calc(80% - 50px);
  padding: 10px 15px;
  border-radius: 18px;
  line-height: 1.4;
  word-wrap: break-word;
}
.user-message {
  background-color: #e3f2fd;
  margin-left: 20%;
}
.bot-message {
  background-color: #f5f5f5;
  margin-right: 20%;
}
.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
}
.chat-input textarea {
  flex: 1;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-right: 12px;
  resize: none;
  min-height: 60px;
  max-height: 150px;
  font-family: inherit;
  font-size: 14px;
}
.chat-input textarea:focus {
  outline: none;
  border-color: #2196f3;
}
.chat-input button {
  padding: 0 20px;
  height: 48px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}
.chat-input button:hover {
  background-color: #1976d2;
}
.chat-input button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}
.bot-message:not([data-completed="true"]):after {
  content: "|";
  animation: blink 1s infinite;
  color: #666;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
/* 深度思考样式 */
.deepThink {
  color: #666;
  font-style: italic;
  background-color: #f0f0f0;
  padding: 8px 12px;
  border-radius: 8px;
  display: inline-block;
  margin-top: 5px;
}
.thinking-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 5px 0;
}
.thinking-icon {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}
</style>
