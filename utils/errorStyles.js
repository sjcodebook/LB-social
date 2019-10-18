export class ErrorStyles {
  removeStyles(className) {
    $(`.${className}`).removeClass('inputRedOutline');
    $(`.${className}`).removeClass('error');
    $(`.${className}`).removeClass('inputGreenOutline');
    $(`.${className}`).removeClass('success');
  }

  addErrOutline(className) {
    $(`.${className}`).addClass('inputRedOutline');
  }

  addErrClass(className) {
    $(`.${className}`).addClass('error');
  }

  addSuccessOutline(className) {
    $(`.${className}`).addClass('inputGreenOutline');
  }

  addSuccessClass(className) {
    $(`.${className}`).addClass('success');
  }
}

export default ErrorStyles;
