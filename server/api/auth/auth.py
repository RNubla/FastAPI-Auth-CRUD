from fastapi import security
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta


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

    def enconde_token(self, user_id, user_fullname, username, user_email):
        # def enconde_token(self, username, user_email):
        payload = {
            'exp':  datetime.utcnow() + timedelta(days=0, minutes=0.5),
            'iat': datetime.utcnow(),
            'user_id': user_id,
            'username': username,
            'user_fullname': user_fullname,
            'email': user_email
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
            # print(payload)
            # return payload['sub']
            return payload
        except jwt.ExpiredSignatureError:
            """ IF TOKEN PASSED 5 MIN, IT WILL RAISE AN EXCEPTION """
            raise HTTPException(
                status_code=401, detail='Signature has expired')
        except jwt.InvalidTokenError as e:
            """ IF PASSWORD DOESNT MATCH THE HASHED PASSWORD, IT WILL RAISE AN EXCEPTION """
            raise HTTPException(
                status_code=401, detail='Invalid token'
            )

    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)
