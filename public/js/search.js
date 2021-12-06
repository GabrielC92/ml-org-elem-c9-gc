const formSearch = document.getElementById('form-search');
const searcher = document.getElementById('searcher');

formSearch.addEventListener('submit', e => {
    e.preventDefault();
    searcher.value !== '' && formSearch.submit();
})