 const axios = require('axios')

module.exports = {

  post: function(req, res) {

    const data = 'username=test1%40test2.com&password=Aa234567%21&grant_type=password';

    axios({
      method: 'post',
      url: 'http://travellogix.api.test.conceptsol.com/Token',
      withCredentials: true,
      crossdomain: true,
      data: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then(function (response) {

    let request = {
      "Language": "ENG",
      "Currency": "USD",
      "destination": "MCO",
      "DateFrom": "04/26/2019",
      "DateTO": "04/29/2019",
      "Occupancy": {
        "AdultCount": "1",
        "ChildCount": "1",
        "ChildAges": ["10"]
      }
    }

    axios({
      method: 'post',
      url: 'http://travellogix.api.test.conceptsol.com/api/Ticket/Search',
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${response.data.access_token}`
      },
      data: request
    }).then(resp => {
      if(resp && resp.data && resp.data.Result)
        return res.send(JSON.stringify(resp.data.Result))
      else
        return res.send('Nenhum retorno encontrado')
    }).catch(err => {
      return res.send(JSON.stringify(err.message))

      // return res.send('Ocorreu um erro ao consultar a API, Erro: ' + err.message)
    })
  })
  .catch(function (error) {
    return res.send(JSON.stringify(error.message))
  });

  },

};

