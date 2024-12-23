import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Update the received object to the DOM without rendering again
   * @param {Object | Object[]} data The data to be rendered (e.g bookmark)
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));

    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  /**
   * Clear parent element (e.g list of search results)
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _clear() {
    this._parentElement.innerHTML = '';
  }

  /**
   * Render a spinner (e.g waiting until the search results to be displayed)
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  renderSpinner() {
    const markup = `
           <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
           </div> 
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render a error message (e.g wrong input creating a recipe)
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  renderError(message = this._errorMessage) {
    const markup = `
            <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  /**
   * Render a sucess message (e.g correct input creating a recipe)
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
