FROM python:3.7

RUN pip install fastapi uvicorn

EXPOSE 8000

COPY ./server /server
WORKDIR /server
RUN pip install -r requirements.txt
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
# CMD ["python", "main.py"]
CMD ["python","./main.py"]