import icons from 'url:../../img/icons.svg'; //
class SearchView {
  _parentElement = document.querySelector('.search');

  /**
   * Get query of search input by the DOM
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   * @returns the query
   */
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  /**
   * Clear query of search input by the DOM
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  /**
   * Submit the query
   * @param {controlSearchResults} handler
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
