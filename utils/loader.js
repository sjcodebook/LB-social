export class Loader {
  addLoader(id) {
    $(`#${id}`).removeClass('noDisplay');
  }

  removeLoader(id) {
    $(`#${id}`).addClass('noDisplay');
  }
}

export default Loader;
