import { SITE_URL, SHOPIFY_URL, WOOCOMMERCE_URL } from '@/lib/content'

interface RenderEmailOptions {
  preheader: string
  bodyHtml: string
  leadId: string
}

export function renderEmailHtml({ preheader, bodyHtml, leadId }: RenderEmailOptions): string {
  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?lead=${encodeURIComponent(leadId)}`

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background-color:rgb(245,245,245);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <span style="display:none;font-size:1px;color:rgb(245,245,245);line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</span>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgb(245,245,245);padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
          <tr>
            <td style="height:4px;background:linear-gradient(90deg, rgb(0,201,167), rgb(128,72,245));font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td style="padding:32px 32px 8px 32px;">
              <span style="font-weight:800;font-size:18px;color:rgb(19,33,68);">Verve<span style="color:rgb(0,201,167);">AI</span></span>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 32px 32px 32px;color:rgb(55,65,81);font-size:15px;line-height:1.6;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px;background-color:rgb(245,245,245);color:rgb(107,114,128);font-size:12px;line-height:1.6;">
              <p style="margin:0 0 8px 0;">
                <a href="${SHOPIFY_URL}" style="color:rgb(107,114,128);text-decoration:underline;">Verve AI for Shopify</a>
                &nbsp;&middot;&nbsp;
                <a href="${WOOCOMMERCE_URL}" style="color:rgb(107,114,128);text-decoration:underline;">Verve AI for WooCommerce</a>
              </p>
              <p style="margin:0;">
                <a href="${unsubscribeUrl}" style="color:rgb(107,114,128);text-decoration:underline;">Unsubscribe</a>
                from these emails.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function ctaButtonHtml(href: string, label: string, variant: 'teal' | 'purple' = 'teal'): string {
  const bg = variant === 'teal' ? 'rgb(0,201,167)' : 'rgb(128,72,245)'
  return `<a href="${href}" style="display:inline-block;background-color:${bg};color:#ffffff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:9999px;text-decoration:none;">${label}</a>`
}
