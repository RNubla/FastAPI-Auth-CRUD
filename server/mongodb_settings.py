import os
from os.path import join, dirname
from dotenv import load_dotenv

dotnenv_path = join(dirname(__file__), '.env')
environment = load_dotenv(dotnenv_path)
# print(os.environ['MONGO_DB'])
mongo_db_env = os.environ['MONGO_DB']
# print(mongo_db_env)
