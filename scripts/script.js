function showCards(event) {
    const card_select = document.querySelector('.card-list');

    let posX = event.clientX;
    let posY = event.clientY;

    if(card_select.style.display == 'none') {
        card_select.style.left = `${posX}px`;
        card_select.style.top = `${posY}px`;
        card_select.style.display = 'flex';
    } else {
        card_select.style.display = 'none';
    }
}