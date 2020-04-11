export default class State {
    /**
     * Default settings
     * @class
     */
    constructor() {
        /**
         * @property {number} currentPage - The page that is currently viewed
         * @property {number} lastPage - Last available page for search results
         * @property {number} item_id_glob - Global ID for every item for the latest search result
         * @property {number} button_id_glob - Global ID for every button
         * @property {Array<Object>} search_items_list - Array of objects received from iTunes
         * @property {string} last_search - The latest search phrase
         */
        this.currentPage = 0
        this.lastPage
        this.item_id_glob = 0
        this.button_id_glob = 0
        this.search_items_list = []
        this.last_search = ''
    }

    /**
     * @property {Function} resetPageNumber - A function to reset current page count
     * @return void
     */
    resetPageNumber() {
        this.currentPage = 0
    }
}
