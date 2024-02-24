/* This app will maintain a grocery list for each store we need to visit.  It will keep track of each item within each store,
   including the aisle of the store where it can be found. When you're ready to go to a particular store, you
   can organize your list so that you quickly go to the needed aisles and pick up what you need */

class Store {
    constructor (storeName, street, city, state, zip) {
        this.storeName = storeName;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;

        this.items = [];
    }

    addItem(item) {
        if (item instanceof Item) {
            this.items.push(item);
        } else {
            throw new Error(`You can only add an instance of a grocery item. 
    Argument is not a grocery item: ${item}`);
        }
    }

    describe() {
        return `${this.storeName} has ${this.items.length} items on our list. The store is at:\n
                ${this.street}
                ${this.city}, ${this.state} ${this.zip}`;
    }
}

class Item {
    constructor (itemName, quantity, aisle) {
        this.itemName = itemName;
        this.quantity = quantity;
        this.aisle = aisle;        
    }

    describe() {
        return `We need ${this.quantity} of ${this.itemName}. It can be found in aisle ${this.aisle}.`;
    }
}

class Menu {
    constructor() {
        this.stores = [];
        this.selectedStore = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createStore();
                    break;
                case '2':
                    this.viewStore();
                    break;
                case '3':
                    this.deleteStore();
                    break;
                case '4':
                    this.displayStores();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert('Goodbye!');
    }

    showMainMenuOptions() {
        return prompt(`
    0) Exit
    1) Create a new Store
    2) View a Store
    3) Delete a Store
    4) Display all Stores
    `);
    }
    
    showStoreMenuOptions(storeInfo) {
        return prompt(`
    0) Back
    1) Add a new Item
    2) Delete an Item
    -----------------
    ${storeInfo}
    `);
    }

    displayStores() {
        let storeString = '';
        for (let i = 0; i < this.stores.length; i++) {
            storeString += i + ') ' + this.stores[i].storeName + '\n';
        }
        alert(storeString);
    }

    createStore() {
        let storeName = prompt('Enter the name of the store to add: ');
        let street = prompt('Enter the street address of the store to add: ');
        let city = prompt('Enter the city of the store to add: ');
        let state = prompt('Enter the state of the store to add: ');
        let zip = prompt('Enter the zip code of the store to add: ');
        this.stores.push(new Store(storeName, street, city, state, zip));
    }

    viewStore() {
        let index = prompt("Enter the index of the store to view:");
        if (index > -1 && index < this.stores.length) {
            this.selectedStore = this.stores[index];
            let description = 'Store Name: ' + this.selectedStore.storeName + '\n';
            description += ' ' + this.selectedStore.describe() + '\n ';
            for (let i = 0; i < this.selectedStore.items.length; i++) {
                description += i + ') ' + this.selectedStore.items[i].describe() + '\n';
            }
            let selection1 = this.showStoreMenuOptions(description);
            switch (selection1) {
                case '1':
                    this.createItem();
                    break;
                case '2':
                    this.deleteItem();
            }
        } // validate user input
    }

    deleteStore() {
        let index = prompt('Enter the index of the store to delete: ');
        if (index > -1 && index < this.stores.length) {
            this.stores.splice(index, 1);
        }
    }

    createItem() {
        let name = prompt('Enter the name of the item: ');
        let quantity = prompt('Enter the quantity needed: ');
        let aisle = prompt("Enter the aisle number of item's location: ");
        this.selectedStore.addItem(new Item(name, quantity, aisle));
    }

    deleteItem() {
        let index = prompt('Enter the index of the item to delete: ');
        if (index > -1 && index < this.selectedStore.items.length) {
            this.selectedStore.items.splice(index, 1);
        }
    }
}
let menu = new Menu();
menu.start();
