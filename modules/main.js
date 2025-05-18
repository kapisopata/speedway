import Game from "./game.js";

const keyInputs = document.querySelectorAll('#key1, #key2, #key3, #key4');
keyInputs.forEach(input => {
    input.addEventListener("input", () => {
        input.value = input.value.toLowerCase();
    })
})

let btn = document.getElementById("btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();

    let playersConfig = [];
    let keys = [];
    let checked = [];

    for (let i = 1; i <= 4; i++) {
        let player = document.getElementById(`player${i}`);
        const key1 = document.getElementById(`key${i}`);
        checked.push(player.checked);

        if (player.checked) {
            let key = key1.value.trim().toLowerCase();
            if (!key) {
                alert(`gracz ${i} musi mieć przypisany klawisz!`);
                return;
            }
            if (keys.includes(key)) {
                alert(`klawisz ${key} jest już przypisany do innego gracza!`);
                return;
            }
            keys.push(key);

            playersConfig.push({
                id: i,
                key,
            });
        }
    }

    if (playersConfig.length === 0) {
        alert("nie wybrano gracza!");
        return;
    }

    for (let i = 1; i < 4; i++) {
        if (checked[i] && !checked[i - 1]) {
            alert(`jeśli zaznaczasz gracza ${i + 1} to najpierw musisz zaznaczyć gracza ${i}!`);
            return;
        }
    }

    // console.log(players);

    let canvas = document.getElementById("canvas");
    canvas.style.display = "block";

    let form = document.getElementById("gameForm");
    form.style.display = "none";

    const game = new Game(playersConfig);
    game.startGame();
});