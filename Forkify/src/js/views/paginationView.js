import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  /**
   * Add event listener to the parentElement in other to call the handler either if it was clicked on the button or in the span
   * @param {controlPagination} handler
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goPage = +btn.dataset.goto;

      handler(goPage);
    });
  }

  /**
   * Generate page numbers
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1)
      return this._generateMarkupButton(curPage, 'next');

    // Last page
    if (curPage === numPages && numPages > 1)
      return this._generateMarkupButton(curPage, 'prev');

    // Other page
    if (curPage < numPages) {
      return this._generateMarkupButton(curPage, 'prev', 2);
    }

    // Page 1, and there are NO other pages
    return '';
  }

  /**
   * Generate page numbers, a helper function, if numButtons 1 only generate the first or last page number, otherwise generate all page numbers
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _generateMarkupButton(curPage, position, numButtons = 1) {
    // 1 Button, First Page or Last Page, Add Next Or Previous Button
    let output = ` 
      
  <button data-goto = "${this._getNumberOfPage(
    position,
    curPage
  )}"class="btn--inline pagination__btn--${position}">

    <span>Page ${this._getNumberOfPage(position, curPage)}</span>
    
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-${
      position === 'next' ? 'right' : 'left'
    }"></use>
    </svg>
    
  </button>`;

    // 2 Buttons, Other Pages, Add Next Button
    if (numButtons === 2) {
      output += `

        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
        
        <span>Page ${curPage + 1}</span>
        
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
        </svg>
        
        </button>

        `;
    }

    return output;
  }

  /**
   * Get the number of page by parameters: If its next give the currentPage + 1 otherwise currentPage - 1
   * @param {'next' | 'prev'} position
   * @param {int} curPage
   * @returns curPage + 1 | curPage - 1
   * @this {Object} View instance
   * @author Miguel Guimaraes Aka Deli
   */
  _getNumberOfPage = (position, curPage) =>
    position === 'next' ? curPage + 1 : curPage - 1;
}

export default new PaginationView();
