# Ahneta Advies (1:1 clone)

A pixel-faithful clone of the live marketing site https://www.ahneta.nl/, a Dutch
belastingadvies (tax advisory) firm serving MKB-ondernemers and particulieren.

Unlike `clients/ahneta-client` (a from-scratch redesign inspired by ahneta.nl's content),
this is a literal one-to-one clone: same text, same images, same fonts, same UI, same
animations, generated directly from the live site's rendered DOM using
[ditto.site](https://github.com/ion-design/ditto.site) (a capture-to-code compiler:
Playwright browser capture -> deterministic Next.js/Tailwind codegen), then hand-verified
and touched up page by page against the live site at desktop and mobile widths.

See `AGENTS.md` for conventions and stack notes.

The Next.js app lives in `website/`.

## Pages cloned

All 17 public marketing pages: home, aangifte-ib, administratie, bedrijven, blog (+ 2
posts), contactus, cookie-policy, estate-planning, ondernemersplan, onze-diensten,
over-ons, particulieren, pricing, privacy, startende-ondernemer.

Deliberately excluded, per scope: the Odoo backend login (`/web/login`), password reset,
and other backend/utility routes. In-page links to those now point at the real
`https://www.ahneta.nl/...` URLs instead of a local route.
