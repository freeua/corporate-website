const stationInfoWindowContent = station => `
<div class="infoWrapper">
  <div class="sslInfoCompanyName">${station.company_name}</div>
  <div class="info-field">
    <span class="field-title">Address:</span>
    <span class="field-value"><a target="_blank" rel="noopener noreferrer" href="https://maps.google.com/maps?q=${station.latitude},${station.longitude}">${station.street_name}</a></span>
  </div>
  <div class="info-field">
    <span class="field-title">Tel:</span>
    <span class="field-value"><a href="tel:${station.mobile}">${station.mobile}</a></span>
  </div>
</div>
`;

export default stationInfoWindowContent;
