import os

def add_game(game):
    with open("Highlight Rows with Recent Dates and Specific Games.user.js", encoding="UTF-8") as buy_order_script:
        script = buy_order_script.read()
        current_version = script.split()[17]
        new_version = round(float(current_version) + 0.01, 2)

        script = script.replace(f"// @version      {current_version}",f"// @version      {new_version}")
        script =  script.replace(f''',

    ];''', f''',
        "{game}",\n
    ];''')


    with open(f"Highlight Rows with Recent Dates and Specific Games.user.js", "w", encoding="UTF-8") as new_script:
        new_script.write(script)


with open("data/games.txt", encoding="UTF-8") as games:
    games = games.readlines()
    for game in games:
        if game:
            add_game(game.strip())

