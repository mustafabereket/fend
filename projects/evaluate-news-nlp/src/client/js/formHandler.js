const urlMap = {
    sentiment: 'http://localhost:8081/sentiment',
    summarize: 'http://localhost:8081/summarize'
}

const submitSentimentQuery = (api,formText) => {
    return fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({input:formText})
    }).then(res => res.json())
        .then(function(res) {
            return res;
        })
}

const placeResult = (result) => {
    Client.main.resultPanel.innerHTML = '';
    const dataPanel = document.createDocumentFragment();
    for (let key in result){
        let title = document.createElement('h3');
        title.textContent = key;
        let value = document.createElement('p');
        value.textContent = result[key];
        dataPanel.appendChild(title);
        dataPanel.appendChild(value);
    }
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
            placeResult(await submitSentimentQuery(urlMap[type.id], formText))
        }
    }


}

export { handleSubmit }
