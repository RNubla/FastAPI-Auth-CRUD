# FastAPI-Auth-CRUD

This is for learning purposes on creating a CRUD app using FastAPI and VueJS

docker build --rm -t myimage .  
docker run -d --name mycontainer -p 8000:8000 myimage
docker rmi $(docker images -f "dangling=true" -q) ---- Deletes docker images that has the none tag

docker build --rm -t frontend .
docker run -it -p 8080:8080 --rm --name frontend-app frontend
