import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  /**
   * Render the bookmarks during the site loading by calling a handler as a input
   * @param {controlBookmarks} handler
   * @author Miguel Guimaraes Aka Deli
   */
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  /**
   * Generate markup by using the previewView as a "child"
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   * @returns markup to be displayed
   */
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
