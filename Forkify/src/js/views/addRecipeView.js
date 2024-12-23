import View from './View.js';
import icons from 'url:../../img/icons.svg'; //

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was sucessfully uploaded!';

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  /**
   Open or close the popup of creating a recipe
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  /**
   Event handling to open the popup using publisher subscriber pattern
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   Event handling to close the popup either if its clicked on the overlay or in X icon using publisher subscriber pattern
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  /**
   Event handling to submit a recipe using publisher subscriber pattern
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
}

export default new AddRecipeView();
