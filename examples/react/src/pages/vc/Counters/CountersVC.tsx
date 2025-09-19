import React, { useState } from 'react'
import { WppCounter, WppTypography } from '@platform-ui-kit/components-library-react'
import { CounterChangeEventDetail } from '@platform-ui-kit/components-library'
import styles from './CountersVC.module.scss'

export const CountersVCPage = () => {
  const initiallyValue = 1

  const [value, setValue] = useState(initiallyValue)
  const [formattedNumber, setFormattedNumber] = useState(String(initiallyValue))

  const handleCounterChange = (event: CustomEvent<CounterChangeEventDetail>) => {
    console.log(`Counter ${event.detail.name ?? 'main-counter'} changed to:`, event.detail.value)
    const number = event.detail.value
    const formatted = String(number).replace(/(.)(?=(\d{3})+$)/g, '$1 ')

    setValue(number)
    setFormattedNumber(formatted)
  }

  const logCounterChange = (event: CustomEvent<CounterChangeEventDetail>) => {
    console.log(`Counter ${event.detail.name ?? 'unnamed'} changed to:`, event.detail.value)
  }

  return (
    <div className={styles.container}>
      <div className={styles.counters}>
        <div className={styles.info}>
          <h3>Counter</h3>
          <WppCounter
            name="counter1"
            min={10}
            value={value}
            onWppChange={handleCounterChange}
            className={styles.counter}
            max={1000000}
            data-testid="hover-counter"
            format={{
              searchValue: /(.)(?=(\d{3})+$)/g,
              replaceValue: '$1 ',
            }}
          />
          <WppTypography tag="span" type="m-strong" className={styles.message}>
            Our current value is: {formattedNumber}
          </WppTypography>
        </div>

        <div>
          <h3>Counter in mid state</h3>
          <WppCounter name="counter2" value={5} autoFocus data-testid="focus-counter" onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with info message</h3>
          <WppCounter name="counter3" message="Info message" onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with warning message</h3>
          <WppCounter name="counter4" message="Warning message" messageType="warning" onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with error message</h3>
          <WppCounter name="counter5" message="Error message" messageType="error" onWppChange={logCounterChange} />
        </div>
      </div>

      <div className={styles.counters}>
        <div>
          <h3>Counter with truncation</h3>
          <WppCounter
            name="counter6"
            message="Error message"
            messageType="error"
            maxMessageLength={10}
            data-testid="counter-with-tooltip"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter with disabled state</h3>
          <WppCounter name="counter7" disabled onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with label message</h3>
          <WppCounter name="counter8" labelConfig={{ text: 'Label' }} onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Required Counter</h3>
          <WppCounter name="counter9" labelConfig={{ text: 'Label' }} required onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with max value</h3>
          <WppCounter name="counter10" value={99} max={99} required onWppChange={logCounterChange} />
        </div>
      </div>

      <div className={styles.counters}>
        <div>
          <h3>Counter without buttons</h3>
          <WppCounter
            name="counter11"
            required
            withButtons={false}
            value={5}
            data-testid="counter-without-buttons"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter with info</h3>
          <WppCounter
            name="counter12"
            required
            withButtons={false}
            value={5}
            message="Info message"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter with warning</h3>
          <WppCounter
            name="counter13"
            required
            withButtons={false}
            value={5}
            message="Warning message"
            messageType="warning"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter with error</h3>
          <WppCounter
            name="counter14"
            required
            withButtons={false}
            value={5}
            message="Error message"
            messageType="error"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter with info icon</h3>
          <WppCounter
            name="counter15"
            value={50}
            max={99}
            required
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Counter',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            onWppChange={logCounterChange}
          />
        </div>
      </div>

      <div className={styles.counters}>
        <div>
          <h3>Counter S size</h3>
          <WppCounter
            name="counter16"
            value={5}
            size="s"
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Counter',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Counter disabled S size</h3>
          <WppCounter name="counter17" disabled size="s" onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Warning Counter S size</h3>
          <WppCounter
            name="counter18"
            message="Warning message"
            messageType="warning"
            size="s"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>Error Counter S size</h3>
          <WppCounter
            name="counter19"
            message="Error message"
            messageType="error"
            size="s"
            onWppChange={logCounterChange}
          />
        </div>

        <div>
          <h3>No buttons S size</h3>
          <WppCounter name="counter20" size="s" withButtons={false} onWppChange={logCounterChange} />
        </div>

        <div>
          <h3>Counter with Step of 0.1</h3>
          <WppCounter name="counter21" value={1.5} step={0.1} size="s" onWppChange={logCounterChange} />
        </div>
      </div>
    </div>
  )
}
