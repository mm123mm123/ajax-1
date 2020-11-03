let index = 0
let page=1

let achieveGetRequest = (path, func) => {
  index = path.indexOf('.')
  let request = new XMLHttpRequest()
  request.open('get', path)
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
      if (path.substring(index + 1) === 'xml') {
        func(request.responseXML)
      } else {
        func(request.response)
      }
    }
  }
  request.send()
}

achieveGetRequest('/style.css', (response) => {
  let style = document.createElement('style')
  style.innerHTML = response
  document.head.appendChild(style)
})


achieveGetRequest('/2.js', (response) => {
  let js = document.createElement('script')
  js.innerHTML = response
  document.body.appendChild(js)
})

achieveGetRequest('/3.html', (response) => {
  $(response).insertAfter($('.xxx'))
  $('.nextPage').click(() => {
    page+=1
    if(page>3){page=2}
    achieveGetRequest('/page'+page, (response) => {
      let json = JSON.parse(response)
      Object.keys(json).forEach((elements) => {
        $('ul').append($(`<li>${json[elements]}</li>`))
      })
    })
  })
})

achieveGetRequest('/4.xml', (response) => {
  $('.xxx').text($(response).text().trim())
})

achieveGetRequest('/5.json', (response) => {
  let json = JSON.parse(response)
  Object.keys(json).forEach((elements) => {
    $('ul').append($(`<li>${json[elements]}</li>`))
  })
})




