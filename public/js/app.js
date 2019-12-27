console.log('Client side javascript is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'loading...'

    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            console.log(data)
            if(data.error){
               
                messageOne.textContent = data.error
            } else {
             
                messageOne.textContent =  data.location
                messageTwo.textContent =  data.forecast
            }
        })
    })
})