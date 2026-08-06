import json
from difflib import get_close_matches

with open('data.json', 'r') as file:
    data = json.load(file)

def get_response(user_input):
    user_input = user_input.lower().strip()

    # Remove common punctuation
    for ch in ["?", ".", ",", "!", "'"]:
        user_input = user_input.replace(ch, "")

    questions = [item["question"].lower() for item in data]

    match = get_close_matches(user_input, questions, n=1, cutoff=0.5)

    if match:
        for item in data:
            if item["question"].lower() == match[0]:
                return item["answer"]

    return "I'm sorry, I don't understand that question."