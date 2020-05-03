const urlMap = {
    sentiment: 'http://localhost:8081/sentiment',
    summarize: 'http://localhost:8081/summarize'
}
let loader;

const submitSentimentQuery = (api,formText) => {
    if (formText[0] != 'h'){
        formText = 'http://'+formText;
    }
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({input:formText})
    }).then(res => res.json())
        .then(function(res) {
            return res;
        }).catch(err => {
            return {error: err}
        })
}

const placeResult = (result) => {
    Client.main.resultPanel.innerHTML = '';
    const dataPanel = document.createDocumentFragment();
    clearTimeout(loader);

    for (let key in result){
        if(key === 'sentences' && result[key].length < 1){
            let announce = document.createElement('h3');
            announce.textContent = 'Not enough content was returned from the given URL to summarize. Try another one.'
            dataPanel.appendChild(announce)
            break;
        }
        let title = document.createElement('h3');
        title.textContent = key;
        let value = document.createElement('p');
        value.textContent = result[key];
        dataPanel.appendChild(title);
        dataPanel.appendChild(value);
    }
    console.log(result)
    Client.main.resultPanel.appendChild(dataPanel);

}


async function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if(!formText){
        Client.main.errorMessage.style.display = 'block';
    } else {
        Client.main.errorMessage.style.display = 'none';
        Client.checkForName(formText)
        let type = document.querySelector('.selected');
        if(urlMap[type.id]){
            loadingPlacer();
            placeResult(await submitSentimentQuery(urlMap[type.id], formText))

        }
    }

}

const loadingPlacer = () => {
    Client.main.resultPanel.innerHTML = '<h3> Loading </h3>';
    loader = setTimeout(()=> {
        Client.main.resultPanel.textContent += '.'
    }, 500)
}

export { handleSubmit, submitSentimentQuery }
