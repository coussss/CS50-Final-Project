from flask import Flask, render_template, redirect, request
import csv

app = Flask(__name__)

@app.route("/")
def home():
    with open("blackjack-hard-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        cards_dict=[]

        for i in range(1, 11):
            card = rows[0][i]
            cards_dict.append(card)

    
    return render_template("index.html", cards_dict = cards_dict)

@app.route("/generate", methods=["GET", "POST"])
def generate():

    with open("blackjack-hard-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        cards_dict=[]

        for i in range(1, 11):
            card = rows[0][i]
            cards_dict.append(card)

    dealer_card = request.form.get("dealer-card")
    player_card_1 = request.form.get("player-card-1")
    player_card_2 = request.form.get("player-card-2")

    if dealer_card == "A":
        dealer_card = 11
    if player_card_1 == "A":
        player_card_1 = 11
    if player_card_2 == "A":
        player_card_2 = 11

    dealer = int(dealer_card)
    player = int(player_card_1) + int(player_card_2)

    return render_template("index.html", cards_dict = cards_dict, test = rows[(player-1)][(dealer-1)])