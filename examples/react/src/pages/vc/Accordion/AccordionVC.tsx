import React, { useState } from 'react'
import {
  WppAccordion,
  WppAvatar,
  WppCheckbox,
  WppSelect,
  WppTypography,
  WppTag,
  WppButton,
} from '@platform-ui-kit/components-library-react'

import styles from './AccordionVC.module.scss'

export const AccordionVCPage = () => {
  const [showTags, setShowTags] = useState(false)
  const [value, setValue] = useState('')
  const [value2, setValue2] = useState('')

  return (
    <div className={styles.container} data-testid="accordions-container">
      <div className={styles.button}>
        <WppButton onClick={() => setShowTags(!showTags)}>{showTags ? 'Hide Tags' : 'Show Tags'}</WppButton>
      </div>
      <div className={styles.items}>
        <div className={styles.accordions}>
          <h2 className={styles.title}> S Size Accordions</h2>
          <WppAccordion text="Accordion with text" size="s" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion expanded" size="s" expanded withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}

            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
          </WppAccordion>

          <WppAccordion text="Accordion with single select" size="s" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}

            <WppSelect
              dropdownConfig={{ popperOptions: { strategy: 'fixed' } }}
              onWppChange={(event: CustomEvent) => {
                setValue(event.detail.value)
              }}
              value={value}
              list={[
                {
                  value: 'test',
                  label: 'test',
                },
                {
                  value: 'test2',
                  label: 'test2',
                },
                {
                  value: 'test3',
                  label: 'test3',
                },
              ]}
            ></WppSelect>
          </WppAccordion>

          <WppAccordion text="Accordion with counter" size="s" counter={3} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion w/o divider" size="s" withDivider={false} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="s" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="s" expanded counter={3} text="All In Accordion" withTag={showTags}>
            <div>
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 2' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="s" data-testid="truncated-accordion" withTag={showTags}>
            <div style={{ display: 'inline-flex' }} slot="header">
              <WppTypography type="s-strong" class={styles.truncation}>
                Test Truncation Test Truncation Test Truncation Test Truncation Test Truncation
              </WppTypography>
            </div>
            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="s" withTag={showTags} disabled={true}>
            <div slot="header">Accordion with disabled state</div>
            <WppTag slot="tags" label="Neutral" variant="positive" />
          </WppAccordion>
        </div>

        <div className={styles.accordions}>
          <h2 className={styles.title}>L Size Accordions</h2>
          <WppAccordion text="Accordion with text" size="l" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion expanded" size="l" expanded withTag={showTags}>
            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion with counter" size="l" counter={3} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion w/o divider" size="l" withDivider={false} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="l" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="l" expanded counter={3} text="All In Accordion" withTag={showTags}>
            <div>
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 2' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>
        </div>

        <div className={styles.accordions}>
          <h2 className={styles.title}>2XL Size Accordions</h2>
          <WppAccordion text="Accordion with text" size="2xl" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion expanded" size="2xl" expanded withTag={showTags}>
            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion with counter" size="2xl" counter={3} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion w/o divider" size="2xl" withDivider={false} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="2xl" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="2xl" expanded counter={3} text="All In Accordion" withTag={showTags}>
            <div>
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 2' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>
        </div>
      </div>

      <div className={styles.items}>
        <div className={styles.accordions}>
          <h2 className={styles.title}>M Size Accordions</h2>
          <WppAccordion text="Accordion with text" size="m" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion expanded" size="m" expanded withTag={showTags}>
            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion with counter" size="m" counter={3} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion w/o divider" size="m" withDivider={false} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="m" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="m" expanded counter={1} text="List of users" withTag={showTags}>
            <div className={styles.list}>
              <WppAvatar
                className={styles.avatar}
                size="s"
                name="Sri Rani"
                color="var(--wpp-dataviz-color-cat-dark-1)"
              />
              <div className={styles.info}>
                <WppTypography type="s-body">Sri Rani</WppTypography>
                <WppTypography type="xs-body">sri.rani@groupm.com</WppTypography>
              </div>

              <WppSelect
                className={styles.select}
                required
                data-testid="users"
                onWppChange={(event: CustomEvent) => {
                  setValue2(event.detail.value)
                }}
                value={value2}
                list={[
                  {
                    value: 1,
                    label: 'Item 1',
                    slots: [{ type: 'wpp-icon-plus', props: { slot: 'left' } }],
                  },
                ]}
              ></WppSelect>
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="m" expanded counter={3} text="All In Accordion" withTag={showTags}>
            <div>
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 2' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>
        </div>

        <div className={styles.accordions}>
          <h2 className={styles.title}>XL Size Accordions</h2>
          <WppAccordion text="Accordion with text" size="xl" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion expanded" size="xl" expanded withTag={showTags}>
            <div className={styles.expanded}>
              <WppCheckbox labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 2' }} />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} required />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion with counter" size="xl" counter={3} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion text="Accordion w/o divider" size="xl" withDivider={false} withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="xl" withTag={showTags}>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>

          <WppAccordion size="xl" expanded counter={3} text="All In Accordion" withTag={showTags}>
            <div>
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 1' }} required />
              <WppCheckbox className={styles.checkbox} labelConfig={{ text: 'Option 2' }} required />
              <WppCheckbox labelConfig={{ text: 'Option 3' }} />
            </div>
            {showTags && (
              <>
                <WppTag slot="tags" label="Neutral" variant="neutral" />
              </>
            )}
          </WppAccordion>
        </div>
      </div>
    </div>
  )
}
