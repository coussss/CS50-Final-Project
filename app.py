from flask import Flask, render_template, redirect, request
import csv

app = Flask(__name__)

def softTotal(dealer_total, player_total):
    with open("blackjack-soft-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        return(rows[(player_total-12)][(dealer_total-1)])
    
def splitTotal(dealer_total, player_total):
    with open("blackjack-split-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        return(rows[(player_total-3)][(dealer_total-1)])
    
def hardTotal(dealer_total, player_total):
    with open("blackjack-hard-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        return(rows[(player_total-1)][(dealer_total-1)])

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

    dealer_card = int(request.form.get("dealer-card"))
    player_card_1 = int(request.form.get("player-card-1"))
    player_card_2 = int(request.form.get("player-card-2"))

    player_decision = None

    
    with open("blackjack-hard-totals.csv", 'r') as csv_file:
        reader = csv.reader(csv_file)
        rows = list(reader)

        cards_dict=[]

        for i in range(1, 11):
            card = rows[0][i]
            cards_dict.append(card)

    if player_card_1 == 11 or player_card_2 == 11:
        player_soft_total = player_card_1 + player_card_2

        player_decision = softTotal(dealer_card, player_soft_total)

        return render_template("index.html", cards_dict = cards_dict, test = player_decision) 

    elif player_card_1 == player_card_2:
        player_split_total = player_card_1 + player_card_2

        player_decision = splitTotal(dealer_card, player_split_total)

        return render_template("index.html", cards_dict = cards_dict, test = player_decision) 
    
    else:
        player_hard_total = player_card_1 + player_card_2

        player_decision = hardTotal(dealer_card, player_hard_total)

        return render_template("index.html", cards_dict = cards_dict, test = player_decision) 