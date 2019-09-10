# SimpleRobinHood
A simple Node.js application to interact with RobinHood. 

## Requirements
1. Node.js
2. Express
3. RobinHood API:

        $ npm install robinhood
## Install
1. Clone or download the zip
2. Unzip in your favorite folder
3. Go to the folder and type:

        $ nodejs server.js
4. Open the browser to access the application at :

        http:://127.0.0.1:8080/simplerobinhood/index.html

## Access token 

The application is configured with my personal access token, which may expire at any moment. As RobinHood do not provide an official API, the current solutions are based on reverse engineering their website. 

To use your own access token, do the following:

1. Get your device_token:
  - Go to robinhood.com and log in (logout if already logged in)
  - Open the web development tool of your browser 
  - Go to the Network tab (3rd from the right for Firefox)
  - Enter "token" in the input line at the top where it says "Filter URLs"
  - Click the result 
  - Go to "Params" tab on the right. There you will see all the new JSON parameters for your specific login. Copy device_token.

1. Execute in a Linux or Mac terminal:

        $ curl -v https://api.robinhood.com/oauth2/token/ -H "Accept: application/json" -d "client_id=c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS&expires_in=86400&grant_type=password&password=YOUR_PASSWORD&scope=internal&username=YOUR_USEN_NAME&device_token=YOUR_DEVICE_TOKEN&challenge_type=sms"
        
1. Using the code you received in your cell phone, type:

        $ curl -v https://api.robinhood.com/challenge/YOUR_CODE/respond -H "Accept: application/json" -d "challenge=YOUR_CODE&respond="

1. Get the access_token:

        $ curl -v https://api.robinhood.com/oauth2/token/ -H "Accept: application/json" -d "client_id=c82SH0WZOsabOXGP2sxqcj34FxkvfnWRZBKlBjFS&expires_in=86400&grant_type=password&password=YOUR_PASSWORD&scope=internal&username=YOUR_USEN_NAME&device_token=YOUR_DEVICE_TOKEN&challenge_type=sms&X-ROBINHOOD-CHALLENGE-RESPONSE-ID=YOUR_CODE"
        
 1. Replace my access token by yours in the file <install_dir>/server.js 
