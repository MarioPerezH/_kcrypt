export const environment = {
  API_BASE_URL: 'http://pbiclient.qa.nubicua.net/api/',
  LOGOUT_URL : 'http://pbiclient.qa.nubicua.net/pbireportserver/logon.aspx',
  PBISERVER_URL : 'http://pbiclient.qa.nubicua.net/pbireports',
  PBIDESKTOP_URL: 'https://www.microsoft.com/en-us/download/details.aspx?id=57271',
  production: true,
  callbackRedirectLogOut:(router, url)=>{
      window.location.href = url;
  }
};
