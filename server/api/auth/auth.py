from fastapi import security
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datatime, timedelta


class AuthHandler():
    """ Initialize instances  """
    security = HTTPBearer()
    # This will allow of hashing of the user's password
    password_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
    secret = 'SECRET'

    """ GET HASHED PASSWORD """

    def get_hashed_password(self, password):
        return self.password_context.hash(password)

    """GET AND VERIFIY THE PASSWORD  IF PLAIN PASS IS A MATCH WITH THE HASHED PASS"""

    def get_verify_password(self, plaintext_password, hashed_password):
        return self.password_context.verify(plaintext_password, hashed_password)

    """ ENCODE TOKEN  """

    def enconde_token(self, user_id):
        payload = {
            'expiration':  datatime.utcnow() + timedelta(days=0, minutes=5),
            'iat': datatime.utcnow(),
            'sub': user_id
        }

        return jwt.encode(
            payload,
            self.secret,
            algorithm='HS256'
        )

    """ DECODE TOKEN """

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignature:
            # IF TOKEN PASSED 5 MIN, IT WILL RAISE AN EXCEPTION
            raise HTTPException(
                status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            # IF PASSWORD DOESNT MATCH THE HASHED PASSWORD, IT WILL RAISE AN EXCEPTION
            raise HTTPException(
                status_code=401, detail='Invalid token'
            )

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)
