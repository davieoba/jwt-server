[generate-random-secret](https://generate-secret.vercel.app/256)

## TODO
1. create protected routes
2. send the token has a cookie to the user
3. implement server session with jwt token and redis
4. use short token validity period
5. token revocation & blacklisting
6. prevent crsf 

[jwt-best-practices](https://curity.io/resources/learn/jwt-best-practices/)
[o-auth-jwt-best-practice](https://auth0.com/docs/secure/tokens/token-best-practices)

access token are given to the users and they are usually short lived
 
refresh token: so when an access token has expired, the refresh token will (if it has not expired itself) generate another access token, this is very interesting because it shows that the server must keep track of who is who and therefore is no longer stateless.