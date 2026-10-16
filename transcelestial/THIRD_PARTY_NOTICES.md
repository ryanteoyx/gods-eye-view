# Prototype sources and licences

This separately built application includes only the following content. The rest of the upstream repository is not packaged or served.

* `src/geo.js`: unmodified God’s Eye View `server/providers/common/geo.js`, MIT, copyright 2026 Bilawal Sidhu. Source commit f0a1b22dc82c6c5cd9690d07c1cdb297818da86f. The included UPSTREAM-LICENSE.txt retains the licence and clarifies upstream data carve-outs.
* `src/data/world.json`: Natural Earth 1:110m country geometry, public domain; properties reduced to country names. Source: https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson . Terms: https://www.naturalearthdata.com/about/terms-of-use/ . Retrieved 15 October 2026. General geography, not precise infrastructure boundaries.
* Optional USGS earthquake GeoJSON: fetched directly from USGS only when Refresh USGS is selected. USGS-produced public data; attribution retained. https://www.usgs.gov/information-policies-and-instructions/copyrights-and-credits . Provider data can be revised. No photographs or other third-party multimedia are included.
* Research seed: original concise factual summaries and analyst hypotheses with links to publicly available primary sources. These are not open licences to the underlying websites. No full articles, publisher images, private data or proprietary databases are reproduced. Automated collection of those websites is not implemented.
* Planned GDELT and SEC adapters are described but not connected; their individual terms and access rules apply before implementation.

No Google Maps, Cesium ion, OpenSky, TeleGeography cable data, Bhote Koshi imagery/coordinates, Google News RSS, Open-Meteo, AIS, LinkedIn scraping or paid model API is used by this build. Natural Earth geography is bundled; there is no third-party map tile request. No external fonts or analytics are used.

The full upstream fork retains its original history and licences. Do not deploy its default app assuming this prototype’s source policy covers it. Build only this directory with `npm run build` for the reviewed source set.

Tender watch addition, 16 October 2026: portal descriptions and two past-deadline UNGM examples are original short factual summaries with source references. No tender documents, account data or personal contacts are copied. TED documents anonymous API reuse, but no adapter is installed. Other portals retain their own access and reuse restrictions; GeBIZ ingestion is held for clarification.
