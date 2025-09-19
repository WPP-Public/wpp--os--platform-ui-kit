import * as fs from 'fs'
import { request } from '@playwright/test'

function getTestsExecutionResult() {
  const playwrightReportPath = './test-results/test-results.json'
  const rawData: any = fs.readFileSync(playwrightReportPath)

  return JSON.parse(rawData)
}

function getTestReportLink() {
  const gitlabPagesUrl = 'https://2sixty.gitlab.io/-/chaos/osmium/public/tools/platform-ui-kit'
  const reportUrl = `${gitlabPagesUrl}/-/jobs/${process.env.CI_JOB_ID}/artifacts/playwright-report/index.html`

  return reportUrl
}

function testReportPayload() {
  const executionResult = getTestsExecutionResult()
  const browsers = executionResult.config.projects.map((browser: { name: string }) => browser.name).join(', ')
  const uiFramework = process.env.UI_FRAMEWORK || 'react'
  const executionSummary = executionResult.stats
  const status = executionSummary.unexpected === 0 ? '🟢 PASSED' : '🔴 FAILED'
  const all =
    executionSummary.expected + executionSummary.skipped + executionSummary.unexpected + executionSummary.flaky
  const passRatio = all === 0 ? 0 : Number((executionSummary.expected / all) * 100).toFixed(2)
  const teamsMessage: any = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
          type: 'AdaptiveCard',
          version: '1.6',
          body: [
            {
              type: 'TextBlock',
              size: 'large',
              weight: 'bolder',
              text: process.env.CI_PROJECT_NAME,
              style: 'heading',
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `${status} [${process.env.CI_JOB_NAME} job](${process.env.CI_JOB_URL}) (triggered by ${process.env.GITLAB_USER_NAME})`,
              wrap: true,
            },
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Environment:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Browser:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Duration:',
                      spacing: 'none',
                      wrap: true,
                    },
                  ],
                },
                {
                  type: 'Column',
                  width: 'stretch',
                  items: [
                    {
                      type: 'TextBlock',
                      text: `docker ${uiFramework}`,
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: browsers || ' ',
                      spacing: 'none',
                      wramp: true,
                    },
                    {
                      type: 'TextBlock',
                      text: new Date(executionSummary.duration).toISOString().slice(11, 19),
                      spacing: 'none',
                      wrap: true,
                    },
                  ],
                },
              ],
            },
            {
              type: 'ColumnSet',
              columns: [
                {
                  type: 'Column',
                  width: 'auto',
                  items: [
                    {
                      type: 'TextBlock',
                      text: 'Total:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Passed:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Failed:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Flaky:',
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: 'Skipped:',
                      spacing: 'none',
                      wrap: true,
                    },
                  ],
                },
                {
                  type: 'Column',
                  width: 'stretch',
                  items: [
                    {
                      type: 'TextBlock',
                      text: all,
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: `${executionSummary.expected} (${passRatio} %)`,
                      spacing: 'none',
                      wramp: true,
                    },
                    {
                      type: 'TextBlock',
                      text: executionSummary.unexpected,
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: executionSummary.flaky,
                      spacing: 'none',
                      wrap: true,
                    },
                    {
                      type: 'TextBlock',
                      text: executionSummary.skipped,
                      spacing: 'none',
                      wrap: true,
                    },
                  ],
                },
              ],
            },
          ],
          actions: [
            {
              type: 'Action.OpenUrl',
              title: 'Open Playwright Report',
              url: getTestReportLink(),
              role: 'button',
            },
          ],
        },
      },
    ],
  }

  return teamsMessage
}

async function postTeamsReport(payload: any) {
  console.info('Sending the report to Teams...')
  if (!process.env.MS_TEAMS_E2E_WEBHOOK_URL) {
    console.error('MS_TEAMS_E2E_WEBHOOK_URL environment variable is unset. Failed to send report to Teams.')

    return
  }
  const apiRequest = await request.newContext()

  try {
    const response = await apiRequest.post(process.env.MS_TEAMS_E2E_WEBHOOK_URL, {
      data: payload,
      failOnStatusCode: true,
    })

    console.info(`The message to the Teams channel has been sent: ${response.ok()}`)
  } catch (error) {
    console.error(`The message to the Teams channel has not been sent: \n${error}`)
  }
}

export const sendExecutionReportToTeamsChannel = async () => {
  try {
    const payload = testReportPayload()

    return postTeamsReport(payload)
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`)
  }
}
