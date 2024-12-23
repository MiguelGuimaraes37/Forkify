import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; //

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again!';
  _message = '';

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

export default new ResultsView();
