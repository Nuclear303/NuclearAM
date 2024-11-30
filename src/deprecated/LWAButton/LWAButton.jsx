
export default function LWAButton(){
    function onClick() {
        let options ={};
        options.scope = "profile";
        options.pkce = true;
        options.client_secret = "amzn1.oa2-cs.v1.916443024c766699b5d769992cdf20b0d420cf631e685c6673cfce4d561212d6";
        amazon.Login.authorize(options, function(response) {
            if ( response.error ) {
             alert('oauth error ' + response.error);
             return;
            }
            amazon.Login.retrieveToken(response.code, function(response) {
              if ( response.error ) {
                alert('oauth error ' + response.error);
                return;
              }
              alert('Access Token: ' + response.access_token);
            });
          });
    }
    return(
        <button id="LWAButton" onClick= {onClick} >Login with Amazon</button>
    )
}