const infoLabels = {
    summarize: 'Type a URL of an article or some content here to see the 5 sentence summarized version of the URL content',
    sentiment: 'Type here some text or paste a twit to see positiveness or negativeness of the content.'
}


module.exports = (function main() {
    const resultPanel = document.getElementById('results');
    const infoPanel = document.getElementById('infoPanel');
    const input = document.getElementById('name');
    const errorMessage = document.getElementById('errorMessage');
    function toggleNav() {
        console.log('selected:', this)
        Array.from(navItems).forEach(obj => {
            obj.classList.remove('selected');
        })
        this.classList.toggle('selected');
        infoPanel.textContent = infoLabels[this.id];
        resultPanel.innerHTML = '';
        input.value = '';

    }

    console.log('content loaded')
    const navItems = document.getElementsByClassName('nav-item');
    navItems[0].classList.toggle('selected')
    Array.from(navItems).forEach(obj => {
        obj.addEventListener('click', toggleNav);
    })



    console.log(resultPanel)

    return {resultPanel, errorMessage}
})()

