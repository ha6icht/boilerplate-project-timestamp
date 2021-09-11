const submitButton = document.getElementById('submit-button');
const inputDate = document.getElementById('input-date');
const codeInsert = document.getElementById('code-insert');
const radioButton = document.getElementsByClassName('radio-button')
const submitButtonMs = document.getElementById('submit-button-ms');

//const dateValue = inputDate.value;
//console.log(dateValue);

const renderError = response => {
  codeInsert.innerHTML = `Your request returned an error from the server: 
<br>Code: ${response.status}<br>
${response.statusText}`;
}
let render = (form, formDate, sform, sformDate) => {
    if(this.hasOwnProperty(sform))codeInsert.innerHTML = `{"${form}": "${formDate}"}`;
    else if(!this.hasOwnProperty(sform))codeInsert.innerHTML = `{"${form}": ${formDate}, "${sform}": "${sformDate}"}`;
    else renderError('{error: "Invalid Date"}');
}
const myHeaders = new Headers();

/*radioButton.addEventListener('click', (e)=>{
  console.log(radioButton.value);
});*/

submitButton.addEventListener('click',(e)=>{
  let radioValue;
  if(radioButton[0].checked) radioValue = radioButton[0].value;
  else if(radioButton[1].checked) radioValue = radioButton[1].value;
  else console.log('No radio button chosen!!!!')
  console.log(radioValue);
  const checked = inputDate.value !== ''? true: false;
  e.preventDefault();
  console.log('submit');
  if(checked){
    const dateValue = inputDate.value+':'+radioValue;
    console.log(dateValue);
    const url = `/api?date=${dateValue}`;
    fetch(url,{
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    }).then(res =>{
      if(res.ok){
        console.log('res.ok')
        return res.json();
      } else{
        console.log('res else: ',res)
        renderError(res);
      }
    }).then(res =>{
      //console.log(res.unix);
      
      if('unix' in res){
        console.log('unix');
        render('unix', res.unix);
      }
      else if('utc' in res){
        console.log('utc');
        render('utc', res.utc);
      }
    });
  } else{
    codeInsert.innerHTML = '{error: "Invalid Date"}';
    console.log('No date chosen!')
  }
});

submitButtonMs.addEventListener('click', (e)=>{
  const url = '/api/1451001600000/';
  e.preventDefault();
  fetch(url,{
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  }).then(res =>{
    if(res.ok){
      console.log(res);
      return res.json();
    } else{
      console.log(res);
      console.log('renderError')
      renderError(res);
    }
  }).then(res =>{
    console.log('last .then');
    render('unix', res.unix, 'utc', res.utc);
  });
});