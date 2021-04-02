from api.db.users.database import MONGO_DETAILS
import motor.motor_asyncio
from bson.objectid import ObjectId

MONGO_DETAILS = 'mongodb://localhost:27017'

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.posts

posts_collection = database.get_collection('posts_collection')

# async def g


def post_helper(post) -> dict:
    return{
        'id': str(post['_id']),
        'user_id': str(post['user_id']),
        'title': post['title'],
        'body': post['body'],
        'author': post['author'],
        'post_img': post['post_img'],
        'published_on': post['published_on']
    }


async def puslish_post(post_data: dict, user_id, username) -> dict:
    post_data['user_id'] = ObjectId(user_id)
    post_data['author'] = username
    post = await posts_collection.insert_one(post_data)
    new_post = await posts_collection.find_one(
        {
            '_id': post.inserted_id,
        }
    )
    return post_helper(new_post)


async def retrieve_posts():
    posts = []
    async for post in posts_collection.find():
        posts.append(post_helper(post))
    return posts
