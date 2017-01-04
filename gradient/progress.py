from pymongo import MongoClient
import time

host = 'localhost'
port = 27017

# Setup connection
client = MongoClient(host, port)
db = client["gradient"]
collection = db['progress']


def registerProgress(name):
    data = {}
    data["name"] = name
    data["current"] = 0
    data["max"] = 100
    data["time"] = time.time()
    collection.insert_one(data)


def updateProgress(name, curIter, maxIter):
    data = {}
    data["name"] = name
    data["current"] = curIter
    data["max"] = maxIter
    data["time"] = time.time()
    collection.insert_one(data)





