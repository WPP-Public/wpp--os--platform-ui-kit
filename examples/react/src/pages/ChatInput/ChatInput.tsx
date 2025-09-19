import styles from './ChatInput.module.scss'
import { WppActionButton, WppChatInput, WppSelect } from '@platform-ui-kit/components-library-react'
import { FileItemType } from '@platform-ui-kit/components-library'
import { useState } from 'react'

const messages = [
  "What is the best way to market a product in today's digital landscape while maintaining a balance between online and offline strategies? I need cost-effective approaches for a mid-sized company.",
  'How to create a marketing strategy that aligns with business objectives while considering current market conditions and target audience demographics? I need a framework that can adapt quarterly.',
  "What are the latest trends in digital marketing that are showing the highest ROI in 2023? I'm particularly interested in which social platforms are performing best for B2B companies in the tech sector",
  'How to measure the success of a marketing campaign beyond simple metrics like clicks and impressions? I need to demonstrate real business impact to my executive team next month.',
  'What are the best tools for social media marketing that can help with content scheduling, audience analysis, and performance reporting within a reasonable budget for a startup?',
  'How can small businesses effectively compete with larger corporations in the digital marketing space? I run a local retail business and need to maximize my limited marketing resources.',
  'What role does content marketing play in the customer journey, and how can we optimize our content strategy to address different stages from awareness to purchase for a SaaS product?',
  'How are privacy regulations changing the landscape of digital marketing? I need to ensure our marketing tactics remain compliant while still effectively reaching our target audience.',
  "What metrics should B2B companies focus on when evaluating their marketing performance compared to B2C businesses? Our sales cycles average 3-6 months with multiple decision-makers involved, making traditional attribution models less effective. I need to develop a comprehensive dashboard that can show marketing's contribution to pipeline development and closed deals over time.",
  "How can we effectively integrate our marketing automation platform with our CRM system to create a seamless customer experience while gaining better insights into campaign effectiveness? We currently use separate systems that don't communicate well, resulting in data silos and inconsistent reporting. I need a solution that provides a single source of truth for customer interactions across marketing and sales touchpoints.",
]

const SELECT_LIST = [
  {
    id: 1,
    label: 'GPT-4.1',
    value: 'gpt4.1',
  },
  {
    id: 2,
    label: 'Claude sonnet 3.5',
    value: 'claudesonnet3.5',
  },
  {
    id: 3,
    label: 'GPT-4o',
    value: 'gpt4o',
  },
]

const ChatInput = () => {
  const [disable, setDisable] = useState(false)
  const [disableDebounce, setDisableDebounce] = useState(true)
  const [chatValue, setChatValue] = useState('')

  const randomizeMessage = () => messages[Math.floor(Math.random() * messages.length)]

  const handleSendMessage = (event: CustomEvent<{ message: string; attachments?: FileItemType[] }>) => {
    const { message, attachments } = event.detail

    console.log('🚀 ~ handleSendMessage ~ Message sent:', message)
    console.log('🚀 ~ handleSendMessage ~ Attachments:', attachments)

    setChatValue('')
  }

  const handleChange = (event: CustomEvent) => {
    console.log('value :>> ', event.detail)
  }

  const handleMessageChanged = (event: CustomEvent) => {
    console.log('🚀 ~ handleMessageChange ~ Message changed:', event.detail)
    setChatValue(event.detail.value)
  }

  return (
    <>
      <div className={styles.chatContainer}>
        <WppChatInput
          enableAttach
          onWppSend={handleSendMessage}
          disabled={disable}
          onWppMessageChanged={handleMessageChanged}
          debounceEnabled={disableDebounce}
          fileUploadConfig={{
            acceptConfig: {},
            accept: [],
            size: 50,
            maxFiles: 5,
            // multiple: true,
            // showOnlyNewErrors: true,
            // accept:['.png', '.jpg', '.jpeg', '.pdf']
            // showOnlyNewErrors:true // Optional: Replace old errors with new ones
            // acceptConfig:{
            //   'image/png': ['.png'],
            //   'image/jpeg': ['.jpg', '.jpeg'],
            //   'application/pdf': ['.pdf'],
            // }
          }}
          charactersLimit={200}
          withSelect
          textValue={chatValue}
        >
          <WppSelect
            type="text"
            onWppChange={handleChange}
            placeholder="Select models"
            slot="select"
            disabled={disable}
            list={SELECT_LIST}
          ></WppSelect>
        </WppChatInput>

        <WppChatInput
          enableAttach
          onWppSend={handleSendMessage}
          disabled={disable}
          size="s"
          debounceEnabled={disableDebounce}
          fileUploadConfig={{
            acceptConfig: {},
            accept: [],
            size: 50,
          }}
          charactersLimit={200}
          withSelect
          textValue={chatValue}
        >
          <WppSelect
            type="text"
            onWppChange={handleChange}
            placeholder="Select models"
            slot="select"
            disabled={disable}
            list={SELECT_LIST}
          ></WppSelect>
        </WppChatInput>
      </div>

      <div className={styles.actionsContainer}>
        <WppActionButton slot="actions" onClick={() => setDisable(!disable)}>
          Disable
        </WppActionButton>

        <WppActionButton onClick={() => setChatValue(randomizeMessage())}>Change Input Message</WppActionButton>

        <WppActionButton onClick={() => setDisableDebounce(!disableDebounce)}>
          Debounce - {disableDebounce ? 'On' : 'Off'}
        </WppActionButton>
      </div>
    </>
  )
}

export default ChatInput
