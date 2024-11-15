def add_game(game):
    with open("Highlight Rows with Recent Dates and Specific Games-1.6.user.js", encoding="UTF-8") as buy_order_script:
        script = buy_order_script.read()
        script =  script.replace(f''',

    ];''', f''',
        "{game}",\n
    ];''')


    with open("Highlight Rows with Recent Dates and Specific Games-1.6.user.js", "w", encoding="UTF-8") as new_script:
        new_script.write(script)


with open("data/games.txt", encoding="UTF-8") as games:
    games = games.readlines()
    for game in games:
        if game:
            add_game(game.strip())

