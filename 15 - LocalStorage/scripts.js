(function () {

    const addItems = document.querySelector('.add-items');
    const itemsList = document.querySelector('.plates');
    let items = JSON.parse(localStorage.getItem("items")) || [];

    const checkAllButton = document.querySelector('.checkAll');
    const uncheckAllButton = document.querySelector('.uncheckAll');
    const clearListButton = document.querySelector('.clearList');


    function addItem(e) {

        e.preventDefault();
        const text = (this.querySelector('[name=item]')).value;
        const item = {
            text,
            done: false
        };

        items.push(item);
        populateList(items, itemsList);
        persistItemstoLocalStorage();
        this.reset();
    }

    /**
     * 
     * @param {PointerEvent} e 
     */
    function toggleDone(e) {
        if (!e.target.matches('input')) return;
        const el = e.target;
        const index = el.dataset.index;
        items[index].done = !items[index].done;

        persistItemstoLocalStorage();
        populateList(items, itemsList);
    }

    function persistItemstoLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function checkAll() {
        items.forEach(item => item.done = true);
        persistItemstoLocalStorage();
        populateList(items, itemsList);
    }

    function uncheckAll() {
        items.forEach(item => item.done = false);
        persistItemstoLocalStorage();
        populateList(items, itemsList);
    }

    function clearList() {
        items = [];
        persistItemstoLocalStorage();
        populateList(items, itemsList);
    }

    function populateList(plates = [], platesList) {
        platesList.innerHTML = plates.map((plate, i) => {
            return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
          `
        }).join("");
    }

    addItems.addEventListener('submit', addItem);
    itemsList.addEventListener('click', toggleDone);

    checkAllButton.addEventListener('click', checkAll);
    uncheckAllButton.addEventListener('click', uncheckAll);
    clearListButton.addEventListener('click', clearList);

    populateList(items, itemsList);


})();