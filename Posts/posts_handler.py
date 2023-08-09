import os
import json

# Replace 'path/to/your/directory' with the actual path of your directory
directory_path = './Posts/'
file_list = []

for root, _, files in os.walk(directory_path):
    for file in files:
        if(file.__contains__('.html')):
            file_list.append(os.path.join(root, file))

with open('./Posts/posts.json', 'w') as json_file:
    json.dump(file_list, json_file)