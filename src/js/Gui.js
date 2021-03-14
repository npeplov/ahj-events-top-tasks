export default class Gui {
  constructor() {
    [this.all] = document.getElementsByClassName('all');
    [this.pinned] = document.getElementsByClassName('pinned');
    [this.addtask] = document.getElementsByClassName('addtask');
    [this.error] = document.getElementsByClassName('error');
    this.input = document.querySelector('.addtask input');
  }

  drawUI(tasks) {
    this.all.innerHTML = '';
    this.pinned.innerHTML = '';

    if (tasks.pinned.length < 1) this.pinned.innerHTML += 'No pinned tasks';
    else this.drawTasks(tasks.pinned);

    if (tasks.all.length < 1) this.all.innerHTML += 'No regular tasks';
    else this.drawTasks(tasks.all, '');
  }

  drawTasks(tasksList, checked = 'checked') {
    tasksList.forEach((elem) => {
      const div = document.createElement('div');
      div.innerHTML = `${elem.name} <input type="checkbox" ${checked}>`;
      if (checked) this.pinned.appendChild(div);
      else this.all.appendChild(div);
    });
  }

  showError(error) {
    this.error.innerHTML = error;
  }
}
