import { SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'
import { ctaButtonHtml, ctaBlockHtml } from '@/lib/emailTemplate'

export interface SequenceStep {
  day: number
  subject: string
  bodyHtml: (params: { firstName: string; toolUrl: string }) => string
}

export interface ToolSequence {
  toolName: string
  toolUrl: string
  steps: SequenceStep[]
}

const p = (html: string) => `<p style="margin:0 0 16px 0;">${html}</p>`

const trialButtons = () => `
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px 0;">
    <tr>
      <td style="padding-right:8px;">${ctaButtonHtml(SHOPIFY_URL, 'Shopify — Free Trial', 'teal')}</td>
      <td>${ctaButtonHtml(WOOCOMMERCE_URL, 'WooCommerce — Free Trial', 'purple')}</td>
    </tr>
  </table>
  ${p('<span style="font-size:13px;color:rgb(107,114,128);">Free 14-day trial. No credit card required.</span>')}
`

// Tools without an entry here simply don't get follow-up emails yet
// (see api/dl/route.ts and the cron route).
export const FOLLOW_UP_SEQUENCES: Record<string, ToolSequence> = {
  'ecommerce-profit-margin-calculator': {
    toolName: 'Profit Margin Calculator',
    toolUrl: 'https://tool1.getverveai.com/',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Profit Margin Calculator',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Profit Margin Calculator — here’s your link (bookmark it, you’ll probably use it more than once):')}
          ${ctaBlockHtml(toolUrl, 'Open the Calculator →', 'teal')}
          ${p('Quick tip: start with your Landed COGS on the first tab. Most merchants underestimate this by 15–20% because they forget to factor in freight, duties, and warehousing — which throws off every margin calculation downstream.')}
          ${p('Once you’ve got that number, the Profit Calculator tab shows your real margin after transaction fees, CAC, and refunds — the stuff that quietly eats into “healthy” margins.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can pull this data automatically for every SKU — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to do this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already used the Profit Margin Calculator to check your numbers — nice work.')}
          ${p('Here’s the thing: pulling accurate landed costs, fees, and CAC for every SKU by hand doesn’t scale past a handful of products.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it pulls your real sales data to show true profit margins per SKU — updated continuously, no spreadsheets.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: automate your profit tracking',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Profit Margin Calculator.')}
          ${p('If you’re still calculating margins by hand, you’re spending time on something Verve AI already does automatically — in real time, per SKU, straight from your Shopify or WooCommerce store.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the calculator manually? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'inventory-days-calculator': {
    toolName: 'Inventory Days Calculator',
    toolUrl: 'https://tool2.getverveai.com/',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Inventory Days Calculator',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Inventory Days Calculator — here’s your link:')}
          ${ctaBlockHtml(toolUrl, 'Open the Calculator →', 'teal')}
          ${p('Quick tip: run this monthly for your top 20% of SKUs by revenue — that’s where inventory days swings matter most for cash flow. Compare your result against the industry benchmarks table on the same page to see if you’re running lean or sitting on excess stock.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can calculate this automatically for every SKU — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to check this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already used the Inventory Days Calculator to check how efficiently your stock is moving — nice work.')}
          ${p('Here’s the thing: re-entering opening/closing inventory and COGS by hand every month doesn’t scale past a handful of SKUs.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it tracks inventory days per SKU continuously, using your real sales data — no spreadsheets.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: automate your inventory tracking',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Inventory Days Calculator.')}
          ${p('If you’re still checking this by hand, you’re spending time on something Verve AI already does automatically — in real time, per SKU, straight from your Shopify or WooCommerce store.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the calculator manually? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'reorder-point-calculator': {
    toolName: 'Reorder Point Calculator',
    toolUrl: 'https://www.getverveai.com/tools/reorder-point-calculator',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Reorder Point Calculator',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Reorder Point Calculator — here’s your link:')}
          ${ctaBlockHtml(toolUrl, 'Open the Calculator →', 'teal')}
          ${p('Quick tip: recalculate your reorder points whenever demand shifts, lead times change, or you update your safety stock — stale reorder points are one of the most common causes of stockouts.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can calculate reorder points automatically for every SKU — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to recalculate this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already used the Reorder Point Calculator to find your number — nice work.')}
          ${p('Here’s the thing: reorder points go stale fast. Demand shifts, lead times change, and recalculating by hand for every SKU doesn’t scale.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it recalculates reorder points continuously for every SKU, using your real demand and lead time data.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: automate your reorder points',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Reorder Point Calculator.')}
          ${p('If you’re still recalculating this by hand, you’re spending time on something Verve AI already does automatically — for every SKU, updated as your sales data comes in.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the calculator manually? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'safety-stock-calculator': {
    toolName: 'Safety Stock Calculator',
    toolUrl: 'https://www.getverveai.com/blog/safety-stock-calculator',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Safety Stock Calculator',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Safety Stock Calculator — here’s your link:')}
          ${ctaBlockHtml(toolUrl, 'Open the Calculator →', 'teal')}
          ${p('Quick tip: your service level target matters more than most people think — going from 95% to 99% roughly doubles your required buffer. Start at 95% unless stockouts are especially costly for that SKU.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can calculate safety stock automatically for every SKU — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to size this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already used the Safety Stock Calculator to size your buffer — nice work.')}
          ${p('Here’s the thing: demand variability changes over time, and recalculating safety stock by hand for every SKU doesn’t scale.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it recalculates safety stock continuously for every SKU, using your real demand data.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: automate your safety stock',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Safety Stock Calculator.')}
          ${p('If you’re still sizing this by hand, you’re spending time on something Verve AI already does automatically — for every SKU, updated as your sales data comes in.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the calculator manually? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'inventory-control-excel': {
    toolName: 'Inventory Control Template',
    toolUrl: 'https://docs.google.com/spreadsheets/d/1WvfS3RR-oZx-ozB5n3ZbZ5neu7zKNRvQx02GZ4BvZvk/edit?usp=drivesdk',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Inventory Control Template',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Inventory Control Template — here’s your copy:')}
          ${ctaBlockHtml(toolUrl, 'Open the Template →', 'teal')}
          ${p('Quick tip: make a copy to your own Google Drive before editing (File → Make a copy) so your changes save properly.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can keep this updated automatically from your live sales data — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to update this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already got the Inventory Control Template set up — nice work.')}
          ${p('Here’s the thing: keeping a spreadsheet updated as stock moves, orders come in, and SKUs change doesn’t scale past a handful of products.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it tracks inventory in real time, across every SKU — no spreadsheet to maintain.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: retire the spreadsheet',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Inventory Control Template.')}
          ${p('If you’re still updating it by hand, you’re spending time on something Verve AI already does automatically — in real time, across your whole catalogue.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the spreadsheet? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'sales-forecast-template': {
    toolName: 'Sales Forecast Template',
    toolUrl: 'https://docs.google.com/spreadsheets/d/1gdjpQOaCkQuYAnMN_hWkWBZdCplU4AyfxWP5Y4Vq5CM/edit?usp=drivesdk',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Sales Forecast Template',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Sales Forecast Template — here’s your copy:')}
          ${ctaBlockHtml(toolUrl, 'Open the Template →', 'teal')}
          ${p('Quick tip: make a copy to your own Google Drive before editing (File → Make a copy), and update it at least monthly — forecasts go stale fast during seasonal swings.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can forecast demand automatically from your live sales data — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to forecast this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already got the Sales Forecast Template set up — nice work.')}
          ${p('Here’s the thing: manually updating forecasts as demand shifts and seasonality kicks in doesn’t scale past a handful of SKUs.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it forecasts demand continuously for every SKU, using your real sales data.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: automate your demand forecasting',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Sales Forecast Template.')}
          ${p('If you’re still forecasting by hand, you’re spending time on something Verve AI already does automatically — for every SKU, updated as your sales data comes in.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the spreadsheet? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
  'cashflow-forecast-template': {
    toolName: 'Cashflow Forecast Template',
    toolUrl: 'https://docs.google.com/spreadsheets/d/1pwJcHzAPcxTcuXhi897NdonHj9pXmCNmClMvCM8YEoc/edit?usp=drivesdk',
    steps: [
      {
        day: 0,
        subject: 'Here’s your Cashflow Forecast Template',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('Thanks for grabbing the Cashflow Forecast Template — here’s your copy:')}
          ${ctaBlockHtml(toolUrl, 'Open the Template →', 'teal')}
          ${p('Quick tip: make a copy to your own Google Drive before editing (File → Make a copy), and revisit it monthly — cash timing shifts fast around inventory purchases and seasonal spikes.')}
          ${p('Talk soon,<br>The Verve AI team')}
          ${p('<span style="font-size:13px;color:rgb(107,114,128);">P.S. If you’re on Shopify or WooCommerce, Verve AI can help you plan purchasing around your real cash position — no manual entry. More on that soon.</span>')}
        `,
      },
      {
        day: 5,
        subject: 'You don’t have to update this by hand',
        bodyHtml: ({ firstName }) => `
          ${p(`Hi ${firstName},`)}
          ${p('You’ve already got the Cashflow Forecast Template set up — nice work.')}
          ${p('Here’s the thing: keeping a cashflow forecast accurate as sales, purchasing, and expenses shift doesn’t scale on a spreadsheet you have to update by hand.')}
          ${p('<b>Verve AI does it automatically.</b> Connect your Shopify or WooCommerce store and it factors your real sales and inventory data straight into purchasing decisions — no spreadsheet to maintain.')}
          ${trialButtons()}
          ${p('The Verve AI team')}
        `,
      },
      {
        day: 15,
        subject: 'Last call: plan cashflow automatically',
        bodyHtml: ({ firstName, toolUrl }) => `
          ${p(`Hi ${firstName},`)}
          ${p('It’s been two weeks since you grabbed the Cashflow Forecast Template.')}
          ${p('If you’re still updating it by hand, you’re spending time on something Verve AI helps automate — real inventory and sales data driving smarter purchasing and cash decisions.')}
          ${trialButtons()}
          ${p(`<span style="font-size:13px;color:rgb(107,114,128);">Prefer to keep using the spreadsheet? <a href="${toolUrl}" style="color:rgb(0,201,167);">It’s still here →</a></span>`)}
          ${p('The Verve AI team')}
        `,
      },
    ],
  },
}

export const SEQUENCE_DAYS = [0, 5, 15] as const
