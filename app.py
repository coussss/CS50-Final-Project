from flask import Flask, render_template, url_for
import csv

app = Flask(__name__)

@app.route("/")
def home():
    with open("blackjack-hard-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        cards_dict=[]

        for i in range(11):
            card = rows[0][i]
            cards_dict.append(card)

    
    return render_template("index.html", cards_dict = rows[(9-1)][(3-1)])