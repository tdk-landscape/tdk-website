---
title: Public claims registry - TDK CLI
layout: default
---

<div class="aw">
  <section class="aw-section" style="padding-top: 10rem;">
    <div class="aw-wrap aw-docs">
      {% include docs-sidebar.html %}

      <article class="aw-docs-body">
        <h1>Public claims registry</h1>
        <p class="aw-lead">The canonical claim wording, evidence, and limits are maintained in the <a href="https://github.com/tdk-landscape/tdk-cli-core/blob/main/docs/claims.md">TDK CLI repository</a>. Public site numbers link here so readers can inspect the source and caveats.</p>

        <p>TDK CLI turns a <code>service.json</code> per service into a local Docker stack, with Tilt (the local development tool) watching services and live-updating containers as you code. It is not a deploy tool and not a Compose replacement. Production stays on Helm.</p>

        <h2>14-service demo</h2>

        <blockquote><p>14 tiny services healthy in 4.6s on a 16 GB M1 after images existed. Not a cold boot.</p></blockquote>

        <h2>100-service bench</h2>

        <blockquote><p>100 generated <code>/health</code> stubs, ~20 lines each, healthy through Traefik in 472s on a clean Ubuntu runner (<a href="https://github.com/tdk-landscape/tdk-cli-core/actions/runs/36395860088">run</a>). Not an ERP.</p></blockquote>

        <h2>Onboarding</h2>

        <p>Designed so <code>tdk doctor</code> and <code>tdk up</code> replace a setup wiki. Not measured on a hiring cohort.</p>

        <h2>ROI calculator</h2>

        <p>Inputs are user-set. Output is arithmetic, not savings.</p>
      </article>
    </div>
  </section>
</div>
