import Task from './Task.js';

export default class Logic {
  constructor(gui) {
    this.gui = gui;
    this.tasks = {
      pinned: [new Task('Pay bill')],
      all: [new Task('Buy fruit'), new Task('Buy rice')],
    };
  }

  init() {
    this.gui.drawUI(this.tasks);
    this.gui.input.addEventListener('keypress', this.checkKey.bind(this));
    this.gui.input.addEventListener('input', this.filterTasks.bind(this));
    this.gui.all.addEventListener('click', this.moveToPinned.bind(this));
    this.gui.pinned.addEventListener('click', this.moveToPinned.bind(this));
  }

  addTask(name) {
    const task = new Task(name);
    this.tasks.all.push(task);
  }

  checkKey(e) {
    if (e.key === 'Enter') {
      if (this.gui.input.value === '') {
        this.gui.showError('Enter at least 1 symbol!');
        return;
      }
      this.addTask(this.gui.input.value);
      this.gui.input.value = '';
      this.gui.drawUI(this.tasks);
    }
  }

  filterTasks(e) {
    this.gui.showError('');

    const searchWord = e.target.value;
    const searchResults = this.tasks.all.filter((elem) => elem.name.includes(searchWord));
    this.gui.drawUI({ pinned: this.tasks.pinned, all: searchResults });
  }

  moveToPinned(e) {
    if (!e.target.attributes.length) return;

    let divsArr;
    let arrToAdd;
    let arrToRemove;

    if (e.target.closest('.all')) {
      divsArr = [...document.getElementsByClassName('all')[0].children];
      arrToAdd = this.tasks.pinned; arrToRemove = this.tasks.all;
    } else {
      divsArr = [...document.getElementsByClassName('pinned')[0].children];
      arrToRemove = this.tasks.pinned; arrToAdd = this.tasks.all;
    }

    const index = divsArr.indexOf(e.target.parentElement);
    arrToAdd.push(arrToRemove[index]);
    arrToRemove.splice(index, 1);
    this.gui.drawUI(this.tasks);
  }
}
